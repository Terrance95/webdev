import { Link } from "react-router-dom";
function Home() { return <main className="simple-page"><h1>Welcome to IPL Ticket Booking</h1><p>Book tickets for your favourite IPL matches.</p><Link className="button-link" to="/matches">View Matches</Link></main>; }
export default Home;
