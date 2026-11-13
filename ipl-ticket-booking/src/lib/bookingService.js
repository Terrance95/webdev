import supabase from "./supabase";

const LOCAL_STORAGE_KEY = "iplBookings";
const GUEST_ID_KEY = "ipl_guest_user_id";

// Generate or retrieve persistent guest UUID
export function getGuestUserId() {
  try {
    let id = localStorage.getItem(GUEST_ID_KEY);
    if (!id) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        // Fallback standard UUID v4 format
        id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      localStorage.setItem(GUEST_ID_KEY, id);
    }
    return id;
  } catch {
    return "00000000-0000-4000-8000-000000000001";
  }
}

// Read local bookings safely
export function getLocalBookings() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Could not read local bookings:", err);
    return [];
  }
}

// Save local booking
export function saveLocalBooking(booking) {
  try {
    const list = getLocalBookings();
    list.unshift(booking);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn("Could not save to local storage:", err);
    return [];
  }
}

// Remove local booking
export function removeLocalBooking(id) {
  try {
    const list = getLocalBookings().filter((b) => String(b.id) !== String(id));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch (err) {
    console.warn("Could not remove from local storage:", err);
    return [];
  }
}

/**
 * Creates a new booking in both LocalStorage and Supabase (if configured).
 * Gracefully handles missing columns or foreign key constraints.
 */
export async function createBooking({
  match,
  date,
  venue,
  name,
  email,
  phone,
  tickets,
  stand,
  amount,
}) {
  const guestUserId = getGuestUserId();
  const timestamp = Date.now();
  const bookingRef = "IPL-" + Math.floor(100000 + Math.random() * 900000);

  const localRecord = {
    id: timestamp,
    bookingRef,
    match,
    date,
    venue,
    name,
    email: email || "",
    phone: phone || "",
    tickets: Number(tickets),
    stand,
    amount: Number(amount),
    guestUserId,
    createdAt: new Date().toISOString(),
  };

  // 1. Always store locally so guest never loses their ticket
  saveLocalBooking(localRecord);

  // 2. If Supabase is available, attempt insert with adaptive fallback
  let supabaseResult = { saved: false, error: null };

  if (supabase) {
    try {
      // First attempt: full payload with user_id, email, phone
      const fullPayload = {
        user_id: guestUserId,
        match_name: match,
        match_date: date,
        venue,
        customer_name: name,
        email: email || null,
        phone: phone || null,
        ticket_count: Number(tickets),
        stand,
        amount: Number(amount),
      };

      const { data, error } = await supabase.from("bookings").insert(fullPayload).select();

      if (!error) {
        supabaseResult.saved = true;
        if (data && data[0]?.id) {
          localRecord.supabaseId = data[0].id;
        }
      } else {
        // If error is due to unknown columns (email, phone) or foreign key constraint on user_id:
        console.warn("Supabase initial insert failed, trying minimal payload:", error.message);

        // Attempt 2: Minimal standard columns without email/phone
        const minimalWithUser = {
          user_id: guestUserId,
          match_name: match,
          match_date: date,
          venue,
          customer_name: name,
          ticket_count: Number(tickets),
          stand,
          amount: Number(amount),
        };

        let retry = await supabase.from("bookings").insert(minimalWithUser).select();

        // If user_id violates foreign key (auth.users) or constraint:
        if (retry.error) {
          const minimalNoUser = {
            match_name: match,
            match_date: date,
            venue,
            customer_name: name,
            ticket_count: Number(tickets),
            stand,
            amount: Number(amount),
          };
          retry = await supabase.from("bookings").insert(minimalNoUser).select();
        }

        if (!retry.error) {
          supabaseResult.saved = true;
          if (retry.data && retry.data[0]?.id) {
            localRecord.supabaseId = retry.data[0].id;
          }
        } else {
          supabaseResult.error = retry.error.message;
        }
      }
    } catch (err) {
      console.warn("Supabase network or runtime exception:", err.message);
      supabaseResult.error = err.message;
    }
  }

  return {
    booking: localRecord,
    supabaseResult,
  };
}

/**
 * Fetches all bookings from Supabase & LocalStorage, deduplicating them.
 */
export async function fetchAllBookings() {
  const localList = getLocalBookings();

  if (!supabase) {
    return { bookings: localList, fromSupabase: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase select error:", error.message);
      return { bookings: localList, fromSupabase: false, error: error.message };
    }

    if (data && data.length > 0) {
      // Map supabase rows to consistent booking shape
      const remoteList = data.map((item) => ({
        id: item.id,
        supabaseId: item.id,
        bookingRef: "IPL-SB" + String(item.id).padStart(5, "0"),
        match: item.match_name,
        date: item.match_date,
        venue: item.venue,
        name: item.customer_name,
        email: item.email || item.customer_email || "",
        phone: item.phone || item.mobile || "",
        tickets: item.ticket_count,
        stand: item.stand,
        amount: item.amount,
        createdAt: item.created_at,
        isRemote: true,
      }));

      // Merge remote & local, avoiding duplicates (matching date + match + name)
      const combined = [...remoteList];
      for (const loc of localList) {
        const alreadyExists = remoteList.some(
          (rem) =>
            (loc.supabaseId && String(rem.id) === String(loc.supabaseId)) ||
            (rem.match === loc.match && rem.date === loc.date && rem.name === loc.name)
        );
        if (!alreadyExists) {
          combined.push(loc);
        }
      }

      return { bookings: combined, fromSupabase: true, error: null };
    }

    return { bookings: localList, fromSupabase: false, error: null };
  } catch (err) {
    console.warn("Supabase fetch exception, using local store:", err.message);
    return { bookings: localList, fromSupabase: false, error: err.message };
  }
}
