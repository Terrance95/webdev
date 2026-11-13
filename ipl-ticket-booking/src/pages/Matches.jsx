import { useState } from "react";
import { Link } from "react-router-dom";
import { IPL_MATCHES } from "../data/matchesData";

function Matches() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredMatches = IPL_MATCHES.filter((match) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      match.teams.toLowerCase().includes(searchLower) ||
      match.team1.name.toLowerCase().includes(searchLower) ||
      match.team2.name.toLowerCase().includes(searchLower) ||
      match.venue.toLowerCase().includes(searchLower) ||
      match.city.toLowerCase().includes(searchLower);

    const matchesCity = selectedCity === "all" || match.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  const cities = ["all", ...new Set(IPL_MATCHES.map((m) => m.city))];

  return (
    <main className="page-shell matches-page">
      <div className="page-heading-center">
        <div className="section-badge">OFFICIAL FIXTURE SCHEDULE</div>
        <h1 className="main-title">Upcoming IPL Fixtures</h1>
        <p className="subtitle">
          Select a high-octane encounter, explore stadium stands, and book genuine passes in seconds.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="match-controls-bar">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search teams (CSK, MI, RCB...), venue, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <div className="city-filter-group">
          <label htmlFor="city-filter">Venue City:</label>
          <select
            id="city-filter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">All Cities ({IPL_MATCHES.length})</option>
            {cities.filter(c => c !== "all").map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">🏏</div>
          <h3>No matches found</h3>
          <p>No fixtures match your search query &quot;{searchTerm}&quot;. Try clearing filters.</p>
          <button
            className="secondary-glass-btn"
            onClick={() => {
              setSearchTerm("");
              setSelectedCity("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="matches-grid">
          {filteredMatches.map((match) => (
            <article key={match.id} className="match-card-rich">
              <div className="match-card-header">
                <span className="match-status-pill">{match.status}</span>
                <span className="match-type-tag">{match.matchType}</span>
              </div>

              <div className="match-clash-container">
                <div className="match-team team-left">
                  <div
                    className="team-avatar"
                    style={{ backgroundColor: match.team1.color, color: match.team1.textDark ? "#111" : "#fff" }}
                  >
                    {match.team1.short}
                  </div>
                  <span className="team-name-strong">{match.team1.name}</span>
                </div>

                <div className="vs-badge-circle">
                  <span>VS</span>
                </div>

                <div className="match-team team-right">
                  <div
                    className="team-avatar"
                    style={{ backgroundColor: match.team2.color, color: match.team2.textDark ? "#111" : "#fff" }}
                  >
                    {match.team2.short}
                  </div>
                  <span className="team-name-strong">{match.team2.name}</span>
                </div>
              </div>

              <div className="match-info-box">
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  <span>{match.date} • {match.time}</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>{match.venue}, <strong>{match.city}</strong></span>
                </div>
              </div>

              <div className="match-card-footer">
                <div className="price-info">
                  <span className="price-label">Tickets from</span>
                  <span className="price-amount">₹1,200</span>
                </div>
                <Link
                  className="book-match-btn"
                  to="/booking"
                  state={{
                    match: {
                      id: match.id,
                      teams: match.teams,
                      date: `${match.date}, ${match.time}`,
                      venue: `${match.venue}, ${match.city}`,
                    },
                  }}
                >
                  <span>Book Tickets</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Matches;
