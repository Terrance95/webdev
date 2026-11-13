import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBookings, removeLocalBooking } from "../lib/bookingService";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const { bookings: list } = await fetchAllBookings();
        if (isMounted) {
          setBookings(list || []);
        }
      } catch (err) {
        console.warn("Could not load bookings:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [refreshCount]);

  function handleCancelBooking(id, matchName) {
    if (window.confirm(`Are you sure you want to cancel your pass for ${matchName}?`)) {
      removeLocalBooking(id);
      setBookings((prev) => prev.filter((b) => String(b.id) !== String(id)));
      setFeedbackMessage("Booking cancelled successfully.");
      window.dispatchEvent(new Event("ipl-booking-created"));
      setTimeout(() => setFeedbackMessage(""), 4000);
    }
  }

  function handlePrintTicket() {
    window.print();
  }

  return (
    <main className="page-shell history-page">
      <div className="history-header-bar">
        <div>
          <div className="section-badge">YOUR DIGITAL WALLET</div>
          <h1 className="main-title">My Match Passes</h1>
          <p className="subtitle">All your confirmed IPL matchday tickets and stadium entry passes.</p>
        </div>
        <div className="history-header-actions">
          <button
            className="secondary-glass-btn"
            onClick={() => setRefreshCount((c) => c + 1)}
            disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={isLoading ? "spin" : ""}>
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>{isLoading ? "Refreshing..." : "Refresh Passes"}</span>
          </button>
          <Link to="/matches" className="primary-glow-btn">
            <span>Book Another Match</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {feedbackMessage && (
        <div className="alert-success-box" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
          <span>{feedbackMessage}</span>
        </div>
      )}

      {isLoading ? (
        <div className="empty-state-card">
          <div className="spinner-orbit"></div>
          <h3>Loading matchday passes...</h3>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state-card center-card">
          <div className="empty-icon">🎟️</div>
          <span className="section-badge">NO PASSES ISSUED YET</span>
          <h2>Your Stadium Wallet is Empty</h2>
          <p>You haven&apos;t booked any match passes yet. Select a fixture to cheer for your team live in the stadium!</p>
          <Link className="primary-glow-btn" to="/matches">
            <span>Explore IPL Fixtures</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      ) : (
        <div className="history-passes-grid">
          {bookings.map((booking) => (
            <article key={booking.id} className="history-ticket-card">
              <div className="ticket-top-banner">
                <span className="status-confirmed-tag">✓ CONFIRMED STADIUM PASS</span>
                <span className="ref-number">{booking.bookingRef || `IPL-${booking.id}`}</span>
              </div>

              <div className="ticket-main-area">
                <div className="ticket-teams-header">
                  <h3>{booking.match}</h3>
                  <span className="ticket-stand-badge">{booking.stand}</span>
                </div>

                <div className="ticket-grid-info">
                  <div className="info-cell">
                    <span className="cell-title">DATE &amp; TIME</span>
                    <span className="cell-data">{booking.date}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-title">STADIUM VENUE</span>
                    <span className="cell-data">{booking.venue}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-title">TICKET HOLDER</span>
                    <span className="cell-data bold">{booking.name}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-title">CONTACT</span>
                    <span className="cell-data">{booking.phone ? `+91 ${booking.phone}` : booking.email || "—"}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-title">PASS QUANTITY</span>
                    <span className="cell-data">{booking.tickets} {booking.tickets === 1 ? "Seat" : "Seats"}</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-title">AMOUNT PAID</span>
                    <span className="cell-data text-gold">₹{Number(booking.amount).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="ticket-bottom-bar">
                  <div className="qr-box-mock">
                    <div className="qr-pattern" aria-hidden="true"></div>
                    <span>SCAN AT GATE</span>
                  </div>
                  <div className="ticket-card-actions">
                    <button
                      type="button"
                      className="print-pass-btn"
                      onClick={() => handlePrintTicket()}
                      title="Print or Save Pass"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                      <span>Print Pass</span>
                    </button>
                    <button
                      type="button"
                      className="cancel-pass-btn"
                      onClick={() => handleCancelBooking(booking.id, booking.match)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default BookingHistory;
