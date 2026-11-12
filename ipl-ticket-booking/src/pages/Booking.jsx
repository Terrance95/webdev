import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const standPrices = {
  "General Stand": 1200,
  "VIP Stand": 5000,
};

function Booking() {
  const match = useLocation().state?.match || { teams: "Select a match", venue: "-", date: "-" };
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState("");
  const [stand, setStand] = useState("");
  const [message, setMessage] = useState("");

  const amount = (standPrices[stand] || 0) * (Number(tickets) || 0);

  function handleBooking(event) {
    event.preventDefault();

    if (!name || !tickets || !stand) {
      setMessage("Please fill all the details.");
      return;
    }

    const booking = {
      id: Date.now(),
      match: match.teams,
      date: match.date,
      venue: match.venue,
      name,
      tickets,
      stand,
      amount,
    };

    const oldBookings = JSON.parse(localStorage.getItem("iplBookings") || "[]");
    oldBookings.push(booking);
    localStorage.setItem("iplBookings", JSON.stringify(oldBookings));
    navigate("/history");
  }

  return (
    <main className="simple-page">
      <h1>Book Your Ticket</h1>
      <div className="booking-grid">
        <form className="card" onSubmit={handleBooking}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />

          <label>Number of Tickets</label>
          <input type="number" min="1" value={tickets} onChange={(e) => setTickets(e.target.value)} placeholder="Enter number of tickets" />

          <label>Select Stand</label>
          <select value={stand} onChange={(e) => setStand(e.target.value)}>
            <option value="">-- Select Stand --</option>
            <option>General Stand</option>
            <option>VIP Stand</option>
          </select>

          <button>Book Ticket</button>
          {message && <p className="message">{message}</p>}
        </form>

        <section className="card">
          <h2>Booking Details</h2>
          <p><b>Match:</b> {match.teams}</p>
          <p><b>Date:</b> {match.date}</p>
          <p><b>Venue:</b> {match.venue}</p>
          <p><b>Name:</b> {name || "-"}</p>
          <p><b>Tickets:</b> {tickets || "-"}</p>
          <p><b>Stand:</b> {stand || "-"}</p>
          <p><b>Total Amount:</b> ₹{amount.toLocaleString("en-IN")}</p>
        </section>
      </div>
    </main>
  );
}

export default Booking;
