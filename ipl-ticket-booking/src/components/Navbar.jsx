import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLocalBookings } from "../lib/bookingService";

function Navbar() {
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      const list = getLocalBookings();
      setBookingCount(list.length);
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("ipl-booking-created", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("ipl-booking-created", updateCount);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="top-banner">
        <span className="live-pulse" aria-hidden="true"></span>
        <span>IPL 2027 TATA MATCHDAY PASSES LIVE • CHOOSE YOUR STADIUM STAND</span>
      </div>
      <nav className="navbar" aria-label="Main navigation">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
            </svg>
          </span>
          <div className="brand-text">
            <span className="brand-title">IPL MATCHDAY</span>
            <span className="brand-subtitle">Official Stadium Passes</span>
          </div>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
          <NavLink to="/matches" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>Matches</NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>My Bookings{bookingCount > 0 && <span className="nav-badge">{bookingCount}</span>}</NavLink>
        </div>

        {/* Contact badge aligned to the far right */}
        {(() => {
          const bookings = getLocalBookings();
          const latest = bookings[bookings.length - 1];
          const contact = latest?.phone ? `+91 ${latest.phone}` : null;
          return contact ? <span className="nav-contact">{contact}</span> : null;
        })()}
      </nav>
    </header>
  );
}

export default Navbar;
