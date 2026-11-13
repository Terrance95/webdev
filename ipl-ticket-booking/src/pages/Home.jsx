import { Link } from "react-router-dom";
import { IPL_MATCHES } from "../data/matchesData";

const TEAMS = [
  { code: "CSK", name: "Chennai Super Kings", bg: "#f9cd05", text: "#111" },
  { code: "MI", name: "Mumbai Indians", bg: "#004ba0", text: "#fff" },
  { code: "RCB", name: "Royal Challengers Bengaluru", bg: "#d71920", text: "#fff" },
  { code: "KKR", name: "Kolkata Knight Riders", bg: "#3a225d", text: "#fff" },
  { code: "RR", name: "Rajasthan Royals", bg: "#ea1a85", text: "#fff" },
  { code: "GT", name: "Gujarat Titans", bg: "#1c2c52", text: "#fff" },
  { code: "SRH", name: "Sunrisers Hyderabad", bg: "#f26522", text: "#fff" },
  { code: "DC", name: "Delhi Capitals", bg: "#0078bc", text: "#fff" },
  { code: "LSG", name: "Lucknow Super Giants", bg: "#0057b8", text: "#fff" },
  { code: "PBKS", name: "Punjab Kings", bg: "#dd1f2d", text: "#fff" },
];

function Home() {
  const featuredMatch = IPL_MATCHES[0]; // CSK vs MI

  return (
    <main className="page-shell home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-pulse"></span>
            TATA IPL 2027 OFFICIAL PASS RESERVATIONS
          </div>
          <h1 className="hero-title">
            FEEL THE ROAR. <br />
            <span className="hero-highlight">LIVE THE MATCHDAY.</span>
          </h1>
          <p className="hero-description">
            Experience the thunder of the crowds, towering maximums, and nail-biting finishes.
            Secure genuine stadium stands and VIP suites with <strong>instant QR passes — no login required</strong>.
          </p>

          <div className="hero-actions">
            <Link className="primary-glow-btn" to="/matches">
              <span>Explore Fixtures &amp; Book</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link className="secondary-glass-btn" to="/history">
              <span>My Match Passes</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="hero-stats-bar">
            <div className="stat-item">
              <span className="stat-number">10</span>
              <span className="stat-label">Powerhouse Teams</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">74</span>
              <span className="stat-label">Electric Matches</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Verified Gate Passes</span>
            </div>
          </div>
        </div>

        {/* Featured Match Card in Hero */}
        <div className="hero-featured-card">
          <div className="featured-card-glass">
            <div className="featured-tag">🔥 NEXT BLOCKBUSTER FIXTURE</div>
            <div className="featured-teams-clash">
              <div className="team-pill csk">
                <span className="team-symbol" style={{ backgroundColor: featuredMatch.team1.color, color: featuredMatch.team1.textDark ? "#111" : "#fff" }}>
                  {featuredMatch.team1.short}
                </span>
                <span className="team-fullname">{featuredMatch.team1.name}</span>
              </div>
              <div className="clash-vs">VS</div>
              <div className="team-pill mi">
                <span className="team-symbol" style={{ backgroundColor: featuredMatch.team2.color, color: featuredMatch.team2.textDark ? "#111" : "#fff" }}>
                  {featuredMatch.team2.short}
                </span>
                <span className="team-fullname">{featuredMatch.team2.name}</span>
              </div>
            </div>

            <div className="featured-meta">
              <div className="meta-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span>{featuredMatch.date} • {featuredMatch.time}</span>
              </div>
              <div className="meta-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{featuredMatch.venue}, {featuredMatch.city}</span>
              </div>
            </div>

            <div className="featured-footer">
              <div>
                <span className="price-tag-label">Stands from</span>
                <span className="price-tag-value">₹1,200</span>
              </div>
              <Link
                className="book-featured-btn"
                to="/booking"
                state={{ match: { ...featuredMatch, date: `${featuredMatch.date}, ${featuredMatch.time}` } }}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Showcase Strip */}
      <section className="teams-strip-section">
        <p className="eyebrow-center">COMPETING FOR CRICKET GLORY</p>
        <h2 className="section-title-center">All 10 IPL Franchises</h2>
        <div className="teams-carousel">
          {TEAMS.map((team) => (
            <div key={team.code} className="team-chip" style={{ borderBottomColor: team.bg }}>
              <span className="team-chip-badge" style={{ backgroundColor: team.bg, color: team.text }}>
                {team.code}
              </span>
              <span className="team-chip-name">{team.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works / Matchday features */}
      <section className="features-section">
        <div className="section-header-center">
          <p className="eyebrow-center">SEAMLESS MATCHDAY ACCESS</p>
          <h2 className="section-title-center">Why Fans Choose IPL Matchday</h2>
          <p className="section-sub-center">Everything designed for lightning-fast pass booking and pure cricket enjoyment.</p>
        </div>

        <div className="features-grid">
          <article className="feature-card-rich">
            <div className="feature-icon-wrapper gold-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <span className="feature-step">01 • INSTANT CHECKOUT</span>
            <h3>No Login Barrier</h3>
            <p>Book directly without remembering passwords or waiting for OTP emails. Just enter your details and go.</p>
          </article>

          <article className="feature-card-rich">
            <div className="feature-icon-wrapper blue-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" /></svg>
            </div>
            <span className="feature-step">02 • DIGITAL PASS</span>
            <h3>Instant E-Ticket &amp; QR</h3>
            <p>Your digital match pass is generated immediately with live reference codes and direct stadium gate entry.</p>
          </article>

          <article className="feature-card-rich">
            <div className="feature-icon-wrapper orange-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <span className="feature-step">03 • PREMIUM SEATS</span>
            <h3>Official Stands &amp; VIP</h3>
            <p>Choose from General grandstands right along boundary ropes up to ultra-luxurious VIP pavilion lounges.</p>
          </article>
        </div>
      </section>

      {/* Stadium Experience Banner */}
      <section className="stadium-experience-banner">
        <div className="stadium-experience-content">
          <span className="live-pill">IMMERSIVE ATMOSPHERE</span>
          <h2>Where 80,000 Voices Become One Roar.</h2>
          <p>
            From MS Dhoni&apos;s helicopter shot in Chepauk to Rohit Sharma&apos;s pull in Wankhede and Virat Kohli&apos;s cover drive in Bengaluru — matchday is waiting.
          </p>
          <div className="stadium-actions">
            <Link className="primary-glow-btn" to="/matches">Pick Your Match Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
