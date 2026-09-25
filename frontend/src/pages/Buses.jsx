import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Buses.css";

const places = {
  Meghalaya: "/photos/meghalaya.jpg",
  Goa: "/photos/picture2.jpg",
  Kerala: "/photos/picture3.jpg",
  Rajasthan: "/photos/picture5.png",
  Ladakh: "/photos/picture4.jpg",
  Bengaluru: "/photos/picture8888.jpg",
};

const busData = [
  {
    operator: "VRL Travels",
    type: "AC Sleeper",
    departure: "06:30 PM",
    arrival: "08:45 AM",
    duration: "14h 15m",
    price: 1699,
    rating: 4.6,
    seats: 8,
    tier: "Premium",
  },
  {
    operator: "Orange Travels",
    type: "AC Seater",
    departure: "08:00 PM",
    arrival: "10:30 AM",
    duration: "14h 30m",
    price: 1199,
    rating: 4.4,
    seats: 12,
    tier: "Comfort",
  },
  {
    operator: "IntrCity SmartBus",
    type: "AC Sleeper",
    departure: "09:30 PM",
    arrival: "11:00 AM",
    duration: "13h 30m",
    price: 2899,
    rating: 4.8,
    seats: 5,
    tier: "Luxury",
  },
  {
    operator: "SRS Travels",
    type: "AC Seater",
    departure: "07:15 PM",
    arrival: "09:40 AM",
    duration: "14h 25m",
    price: 899,
    rating: 4.2,
    seats: 16,
    tier: "Value",
  },
  {
    operator: "Kaveri Travels",
    type: "AC Sleeper",
    departure: "10:00 PM",
    arrival: "11:30 AM",
    duration: "13h 30m",
    price: 1499,
    rating: 4.5,
    seats: 10,
    tier: "Comfort",
  },
  {
    operator: "Morning Star",
    type: "AC Sleeper",
    departure: "05:45 PM",
    arrival: "07:30 AM",
    duration: "13h 45m",
    price: 2199,
    rating: 4.7,
    seats: 6,
    tier: "Premium",
  },
  {
    operator: "Go Tour Travels",
    type: "AC Seater",
    departure: "09:00 PM",
    arrival: "11:20 AM",
    duration: "14h 20m",
    price: 799,
    rating: 4.1,
    seats: 20,
    tier: "Value",
  },
  {
    operator: "National Express",
    type: "AC Sleeper",
    departure: "11:00 PM",
    arrival: "12:30 PM",
    duration: "13h 30m",
    price: 3199,
    rating: 4.9,
    seats: 4,
    tier: "Luxury",
  },
];

function Buses() {
  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Meghalaya");
  const [date, setDate] = useState("");
  const [tier, setTier] = useState("All");
  const [sort, setSort] = useState("Recommended");

  const [busType, setBusType] = useState("All");
  const [departureTime, setDepartureTime] = useState("All");

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("exploreIndiaLoggedIn") === "true";

    const storedName =
      localStorage.getItem("exploreIndiaName") || "";

    setLoggedIn(isLoggedIn);
    setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("exploreIndiaLoggedIn");
    localStorage.removeItem("exploreIndiaName");
    localStorage.removeItem("exploreIndiaUser");
    localStorage.removeItem("exploreIndiaPhone");

    setLoggedIn(false);
    setUserName("");
    setAccountOpen(false);

    navigate("/");
    window.location.reload();
  };

  const firstName = userName
    ? userName.trim().split(" ")[0]
    : "";

  const handleSwap = () => {
    setFrom((previousFrom) => {
      const previousTo = to;
      setTo(previousFrom);
      return previousTo;
    });
  };

  let results =
    tier === "All"
      ? [...busData]
      : busData.filter((bus) => bus.tier === tier);

  if (busType !== "All") {
    results = results.filter((bus) => bus.type === busType);
  }

  if (departureTime !== "All") {
    results = results.filter((bus) => {
      const hour = Number(
        bus.departure.split(":")[0]
      );

      const isPM = bus.departure.includes("PM");
      const hour24 =
        isPM && hour !== 12
          ? hour + 12
          : !isPM && hour === 12
          ? 0
          : hour;

      if (departureTime === "Morning") {
        return hour24 >= 5 && hour24 < 12;
      }

      if (departureTime === "Afternoon") {
        return hour24 >= 12 && hour24 < 17;
      }

      if (departureTime === "Evening") {
        return hour24 >= 17 && hour24 < 21;
      }

      if (departureTime === "Night") {
        return hour24 >= 21 || hour24 < 5;
      }

      return true;
    });
  }

  if (sort === "Price: Low to High") {
    results.sort((a, b) => a.price - b.price);
  }

  if (sort === "Price: High to Low") {
    results.sort((a, b) => b.price - a.price);
  }

  if (sort === "Rating") {
    results.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div
      className="buses-page"
      style={{
        "--bus-background": `url("${places[to] || places.Meghalaya}")`,
      }}
    >
      <div className="bus-hero-bg"></div>

      {/* NAVBAR */}
      <header className="bus-navbar">
        <Link to="/" className="bus-logo">
          Explore<span>India</span>
        </Link>

        <nav className="bus-nav">
          <Link to="/">Home</Link>
          <Link className="active" to="/buses">
            Buses
          </Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="bus-account-wrapper">
          {!loggedIn ? (
            <div className="bus-account-actions">
              <Link to="/login" className="bus-login-link">
                Login
              </Link>

              <Link to="/signup" className="bus-signup-link">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="bus-account-container">
              <button
                className="account-btn"
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
              >
                <span className="account-avatar-small">
                  {firstName.charAt(0).toUpperCase()}
                </span>

                <span>Hello, {firstName}</span>

                <span className="account-arrow">
                  {accountOpen ? "▲" : "▼"}
                </span>
              </button>

              {accountOpen && (
                <div className="bus-account-dropdown">
                  <div className="account-header">
                    <div className="account-avatar">
                      {firstName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{userName}</strong>

                      <small>
                        {localStorage.getItem(
                          "exploreIndiaUser"
                        ) || "Explore India User"}
                      </small>
                    </div>
                  </div>

                  <div className="account-divider"></div>

                  <Link
                    to="/profile"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Bookings
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Reviews
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setAccountOpen(false)}
                  >
                    Account Settings
                  </Link>

                  <div className="account-divider"></div>

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="bus-hero">
        <div className="hero-inner">
          <p className="hero-small">EXPLORE INDIA</p>

          <h1>Journeys Begin Here</h1>

          <p className="hero-description">
            Comfortable bus journeys connecting you to
            India's most beautiful destinations.
          </p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-area">
        <div className="search-box">
          <div className="search-item">
            <span>FROM</span>

            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option>Hyderabad</option>
              <option>Bengaluru</option>
              <option>Chennai</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>

          <button
            className="swap-btn"
            onClick={handleSwap}
            type="button"
            aria-label="Swap locations"
          >
            ⇄
          </button>

          <div className="search-item">
            <span>TO</span>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {Object.keys(places).map((place) => (
                <option key={place}>{place}</option>
              ))}
            </select>
          </div>

          <div className="search-item">
            <span>TRAVEL DATE</span>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="search-main-btn" type="button">
            Search Buses
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="content">

        {/* POPULAR ROUTES */}
      <section className="popular">
  <div className="popular-content">
    <span className="popular-eyebrow">DISCOVER MORE</span>

    <h2>Popular Bus Routes</h2>

    <p>
      Choose a route and find comfortable ways to
      continue your journey.
    </p>
  </div>
</section>

        {/* FILTER + RESULTS */}
        <div className="booking-layout">

          {/* SIDE FILTER */}
          <aside className="filters">
            <div className="filter-title">
              <span>REFINE YOUR JOURNEY</span>
              <h3>Filters</h3>
              <p>
                Narrow down buses by comfort,
                timing and travel preference.
              </p>
            </div>

            <div className="filter-section">
              <label>TRAVEL TIER</label>

              {[
                "All",
                "Value",
                "Comfort",
                "Premium",
                "Luxury",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    tier === item
                      ? "filter-choice selected"
                      : "filter-choice"
                  }
                  onClick={() => setTier(item)}
                >
                  <span>{item}</span>

                  {item !== "All" && (
                    <small>
                      {item === "Value" && "₹500–900"}
                      {item === "Comfort" && "₹900–1500"}
                      {item === "Premium" && "₹1500–2500"}
                      {item === "Luxury" && "₹2500+"}
                    </small>
                  )}
                </button>
              ))}
            </div>

            <div className="filter-section">
              <label>BUS TYPE</label>

              {[
                ["All", "All bus types"],
                ["AC Sleeper", "Sleeper coach"],
                ["AC Seater", "Seater coach"],
              ].map(([value, label]) => (
                <label
                  className="check"
                  key={value}
                >
                  <input
                    type="radio"
                    name="busType"
                    checked={busType === value}
                    onChange={() => setBusType(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <label>DEPARTURE</label>

              {[
                "All",
                "Morning",
                "Afternoon",
                "Evening",
                "Night",
              ].map((time) => (
                <label
                  className="check"
                  key={time}
                >
                  <input
                    type="radio"
                    name="departureTime"
                    checked={departureTime === time}
                    onChange={() =>
                      setDepartureTime(time)
                    }
                  />

                  <span>{time}</span>
                </label>
              ))}
            </div>

            <button
              className="clear-filters"
              onClick={() => {
                setTier("All");
                setBusType("All");
                setDepartureTime("All");
                setSort("Recommended");
              }}
            >
              Clear all filters
            </button>
          </aside>

          {/* RESULTS */}
          <section className="results">
            <div className="results-header">
              <div>
                <span>AVAILABLE BUSES</span>

                <h2>
                  {from} <em>→</em> {to}
                </h2>

                <p>
                  {results.length} buses available for
                  your journey
                </p>
              </div>

              <div className="sort-box">
                <label htmlFor="bus-sort">
                  SORT BY
                </label>

                <select
                  id="bus-sort"
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="bus-list">
              {results.length > 0 ? (
                results.map((bus, index) => (
                  <article
                    className="bus-card"
                    key={`${bus.operator}-${index}`}
                  >
                    <div className="bus-top">

                      <div className="operator">
                        <div className="operator-icon">
                          <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="18"
                              height="13"
                              rx="2"
                            />
                            <path d="M3 12h18" />
                            <path d="M7 18v2M17 18v2" />
                            <circle
                              cx="7"
                              cy="15"
                              r="1"
                            />
                            <circle
                              cx="17"
                              cy="15"
                              r="1"
                            />
                          </svg>
                        </div>

                        <div>
                          <h3>{bus.operator}</h3>
                          <p>{bus.type}</p>
                        </div>
                      </div>

                      <div className="times">
                        <div>
                          <strong>
                            {bus.departure}
                          </strong>
                          <span>{from}</span>
                        </div>

                        <div className="duration">
                          <span>{bus.duration}</span>
                          <div className="time-line"></div>
                        </div>

                        <div>
                          <strong>
                            {bus.arrival}
                          </strong>
                          <span>{to}</span>
                        </div>
                      </div>

                      <div className="bus-cost">
                        <span>{bus.tier}</span>

                        <strong>
                          ₹{bus.price.toLocaleString()}
                        </strong>

                        <small>per passenger</small>
                      </div>
                    </div>

                    <div className="bus-bottom">
                      <div className="bus-info">
                        <span>★ {bus.rating}</span>
                        <span>
                          {bus.seats} seats left
                        </span>
                        <span>AC</span>
                        <span>Live Tracking</span>
                      </div>

                      <button
                        className="select-btn"
                        type="button"
                      >
                        Select Bus
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">
                    —
                  </div>

                  <h3>
                    No buses match your filters
                  </h3>

                  <p>
                    Try changing your travel preferences
                    or clearing the filters.
                  </p>

                  <button
                    onClick={() => {
                      setTier("All");
                      setBusType("All");
                      setDepartureTime("All");
                      setSort("Recommended");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* WHY EXPLORE INDIA */}
        <section className="why-section">
          <div className="why-heading">
            <span>TRAVEL WITH CONFIDENCE</span>

            <h2>
              Why book with ExploreIndia?
            </h2>

            <p>
              Thoughtfully designed journeys with
              comfortable travel and transparent choices.
            </p>
          </div>

          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">✓</div>

              <h3>Verified Operators</h3>

              <p>
                Travel with trusted and reliable
                bus operators.
              </p>
            </div>

            <div className="benefit">
              <div className="benefit-icon">₹</div>

              <h3>Transparent Pricing</h3>

              <p>
                Clear prices with no unnecessary
                surprises.
              </p>
            </div>

            <div className="benefit">
              <div className="benefit-icon">24</div>

              <h3>Easy Booking</h3>

              <p>
                Search, select and manage your
                journey with ease.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Buses;