import { Link } from "react-router-dom";
const matches = [{ teams: "CSK vs MI", venue: "Chennai", date: "29 January 2027, 6:30 PM" }, { teams: "RR vs RCB", venue: "Mohali", date: "31 January 2027, 6:30 PM" }];
function Matches() { return <main className="simple-page"><h1>Upcoming IPL Matches</h1><table><thead><tr><th>Teams</th><th>Date & Time</th><th>Venue</th><th>Action</th></tr></thead><tbody>{matches.map((match) => <tr key={match.teams}><td>{match.teams}</td><td>{match.date}</td><td>{match.venue}</td><td><Link className="small-button" to="/booking" state={{ match }}>Book</Link></td></tr>)}</tbody></table></main>; }
export default Matches;
