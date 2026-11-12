function BookingHistory() {
  const bookings = JSON.parse(localStorage.getItem("iplBookings") || "[]");

  return (
    <main className="simple-page">
      <h1>Booking History</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Name</th>
              <th>Stand</th>
              <th>Tickets</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.match}</td>
                <td>{booking.name}</td>
                <td>{booking.stand}</td>
                <td>{booking.tickets}</td>
                <td>₹{Number(booking.amount).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default BookingHistory;
