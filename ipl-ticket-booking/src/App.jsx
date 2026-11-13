import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import "./App.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-mark" aria-hidden="true">IPL</span>
            <span className="brand-name">IPL MATCHDAY</span>
          </div>
          <p className="footer-desc">
            Your official destination for Indian Premier League stadium passes, instant e-tickets, and live matchday experience.
          </p>
        </div>
        <div className="footer-links-group">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/matches">Upcoming Fixtures</Link>
          <Link to="/history">My Bookings</Link>
        </div>
        <div className="footer-links-group">
          <h4>Match Venues</h4>
          <span>M. A. Chidambaram, Chennai</span>
          <span>Wankhede Stadium, Mumbai</span>
          <span>M. Chinnaswamy, Bengaluru</span>
          <span>Narendra Modi Stadium, Ahmedabad</span>
        </div>
        <div className="footer-links-group">
          <h4>Matchday Guarantee</h4>
          <span>✓ Instant QR Pass</span>
          <span>✓ 100% Genuine Box Office</span>
          <span>✓ Direct Stadium Gate Entry</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2027 IPL Matchday Pass Portal. All rights reserved. Built for cricket fans worldwide.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
