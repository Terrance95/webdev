import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../lib/bookingService";
import { STAND_PRICES } from "../data/matchesData";

const STAND_DETAILS = [
  {
    name: "General Stand",
    price: 1200,
    perks: "Vibrant boundary crowd • Wide pitch view • Direct concourse access",
    badge: "Popular",
    gate: "Gate 4 & 5",
  },
  {
    name: "VIP Stand",
    price: 5000,
    perks: "Exclusive Pavilion seating • Complimentary snack box & drinks • Fast-track entry",
    badge: "Premium VIP",
    gate: "Gate 1 (VIP Entrance)",
  },
];

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.state?.match;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState(1);
  const [stand, setStand] = useState("General Stand");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const selectedStandInfo = STAND_DETAILS.find((s) => s.name === stand) || STAND_DETAILS[0];
  const unitPrice = STAND_PRICES[stand] || 1200;
  const totalAmount = unitPrice * Number(tickets);

  // If no match selected, guide user to pick one
  if (!match) {
    return (
      <main className="page-shell">
        <div className="empty-state-card center-card">
          <div className="empty-icon">🏏</div>
          <span className="section-badge">MATCH SELECTION REQUIRED</span>
          <h2>Select an IPL Match First</h2>
          <p>Please choose a match from the fixtures list to view stand options and complete your ticket reservation.</p>
          <Link className="primary-glow-btn" to="/matches">
            <span>Browse Upcoming Matches</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </main>
    );
  }

  function handleTicketChange(delta) {
    const nextVal = Number(tickets) + delta;
    if (nextVal >= 1 && nextVal <= 10) {
      setTickets(nextVal);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    // Validate inputs
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address for your digital pass.");
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!tickets || Number(tickets) < 1 || Number(tickets) > 10) {
      setErrorMessage("Ticket quantity must be between 1 and 10.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createBooking({
        match: match.teams,
        date: match.date,
        venue: match.venue,
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        tickets: Number(tickets),
        stand,
        amount: totalAmount,
      });

      // Dispatch event to inform Navbar badge
      window.dispatchEvent(new Event("ipl-booking-created"));

      setBookingSuccess(result.booking);
    } catch (err) {
      setErrorMessage(`Failed to complete booking: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell booking-page">
      {/* Booking Success Modal Overlay */}
      {bookingSuccess && (
        <div className="modal-overlay">
          <div className="success-modal-card">
            <div className="success-animation-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="success-pill">BOOKING CONFIRMED</span>
            <h2>You&apos;re Going to the Game!</h2>
            <p className="success-sub">
              Your matchday ticket pass has been issued and saved to your portal.
            </p>

            <div className="confirmed-pass-box">
              <div className="pass-ref-badge">PASS REF: {bookingSuccess.bookingRef}</div>
              <h3>{bookingSuccess.match}</h3>
              <p className="pass-meta">{bookingSuccess.date} • {bookingSuccess.venue}</p>
              <div className="pass-details-row">
                <div>
                  <span className="sub-label">Ticket Holder</span>
                  <strong>{bookingSuccess.name}</strong>
                </div>
                <div>
                  <span className="sub-label">Seats</span>
                  <strong>{bookingSuccess.tickets}x {bookingSuccess.stand}</strong>
                </div>
                <div>
                  <span className="sub-label">Total Paid</span>
                  <strong className="text-gold">₹{bookingSuccess.amount.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button
                className="primary-glow-btn"
                onClick={() => navigate("/history")}
              >
                <span>View in My Bookings</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button
                className="secondary-glass-btn"
                onClick={() => {
                  setBookingSuccess(null);
                  setName("");
                  setPhone("");
                  setEmail("");
                  setTickets(1);
                }}
              >
                Book More Tickets
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Heading */}
      <div className="booking-page-header">
        <Link className="back-link" to="/matches">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span>Back to Matches</span>
        </Link>
        <div className="section-badge">SEAT RESERVATION</div>
        <h1 className="main-title">Book Matchday Pass</h1>
        <p className="subtitle">Instant booking with digital QR ticket. Zero sign-in needed.</p>
      </div>

      <div className="booking-layout-grid">
        {/* Left Column: Form */}
        <div className="booking-form-card">
          <div className="form-card-header">
            <h2>Passenger &amp; Stand Details</h2>
            <span className="secure-badge">🔒 100% Verified Pass</span>
          </div>

          {errorMessage && (
            <div className="alert-error-box" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form-fields">
            {/* Full Name */}
            <div className="field-group">
              <label htmlFor="customer-name">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Enter passenger / ticket holder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={70}
                required
              />
            </div>

            {/* Email Address */}
            <div className="field-group">
              <label htmlFor="customer-email">
                Email Address <span className="req">*</span>
              </label>
              <input
                id="customer-email"
                type="email"
                placeholder="e.g. virat@cricket.in (for e-ticket pass delivery)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="field-group">
              <label htmlFor="customer-phone">
                Mobile Number <span className="req">*</span>
              </label>
              <div className="phone-input-wrap">
                <span className="prefix">+91</span>
                <input
                  id="customer-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Stand Selection Cards */}
            <div className="field-group">
              <label>Select Stadium Stand &amp; Tier <span className="req">*</span></label>
              <div className="stand-selection-cards">
                {STAND_DETAILS.map((s) => {
                  const isSelected = stand === s.name;
                  return (
                    <div
                      key={s.name}
                      className={`stand-card-option ${isSelected ? "selected" : ""}`}
                      onClick={() => setStand(s.name)}
                    >
                      <div className="stand-card-top">
                        <div className="stand-title-wrap">
                          <span className="radio-custom">{isSelected ? "●" : "○"}</span>
                          <h4>{s.name}</h4>
                        </div>
                        <span className="stand-price-chip">₹{s.price.toLocaleString("en-IN")}</span>
                      </div>
                      <p className="stand-perks">{s.perks}</p>
                      <div className="stand-meta-pill">{s.gate}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ticket Quantity Stepper */}
            <div className="field-group">
              <label htmlFor="ticket-quantity">Number of Tickets</label>
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => handleTicketChange(-1)}
                  disabled={tickets <= 1}
                  aria-label="Decrease tickets"
                >
                  −
                </button>
                <div className="stepper-value-display">
                  <span className="count-number">{tickets}</span>
                  <span className="count-unit">{tickets === 1 ? "Ticket" : "Tickets"}</span>
                </div>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => handleTicketChange(1)}
                  disabled={tickets >= 10}
                  aria-label="Increase tickets"
                >
                  +
                </button>
              </div>
              <span className="field-hint">Max 10 passes per reservation.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="confirm-booking-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-dot"></span>
                  <span>Generating Match Pass...</span>
                </>
              ) : (
                <>
                  <span>Confirm &amp; Issue Pass • ₹{totalAmount.toLocaleString("en-IN")}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Dynamic Digital Stadium Pass */}
        <div className="pass-preview-column">
          <div className="pass-sticky-wrap">
            <div className="preview-label">LIVE MATCHDAY PASS PREVIEW</div>
            <div className="digital-ticket-card">
              <div className="ticket-header-strip">
                <span className="ticket-league-tag">TATA IPL 2027</span>
                <span className="ticket-type-badge">{selectedStandInfo.badge}</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-match-title">
                  <h2>{match.teams}</h2>
                </div>

                <div className="ticket-meta-grid">
                  <div className="ticket-meta-cell">
                    <span className="cell-label">DATE &amp; TIME</span>
                    <span className="cell-val">{match.date}</span>
                  </div>
                  <div className="ticket-meta-cell">
                    <span className="cell-label">STADIUM VENUE</span>
                    <span className="cell-val">{match.venue}</span>
                  </div>
                </div>

                <div className="ticket-divider-tear">
                  <span className="tear-circle tear-left"></span>
                  <span className="tear-line"></span>
                  <span className="tear-circle tear-right"></span>
                </div>

                <div className="ticket-passenger-section">
                  <div className="passenger-row">
                    <div>
                      <span className="cell-label">PASSENGER NAME</span>
                      <span className="cell-val highlight">{name || "— (Enter Name)"}</span>
                    </div>
                    <div>
                      <span className="cell-label">MOBILE</span>
                      <span className="cell-val">{phone ? `+91 ${phone}` : "—"}</span>
                    </div>
                  </div>

                  <div className="passenger-row">
                    <div>
                      <span className="cell-label">STAND / SECT</span>
                      <span className="cell-val stand-gold">{stand}</span>
                    </div>
                    <div>
                      <span className="cell-label">ENTRY GATE</span>
                      <span className="cell-val">{selectedStandInfo.gate}</span>
                    </div>
                    <div>
                      <span className="cell-label">TICKETS</span>
                      <span className="cell-val">{tickets}</span>
                    </div>
                  </div>
                </div>

                <div className="ticket-total-banner">
                  <span>TOTAL AMOUNT PAYABLE</span>
                  <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                </div>

                <div className="ticket-barcode-mock">
                  <div className="barcode-bars" aria-hidden="true"></div>
                  <span className="barcode-text">AUTHENTIC MATCH PASS • TATA IPL OFFICIAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Booking;
