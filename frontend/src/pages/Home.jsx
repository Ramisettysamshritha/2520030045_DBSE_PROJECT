import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const destinations = [
  {
    image: "/photos/picture1.jpg",
    location: "AGRA, UTTAR PRADESH",
    title: "TAJ MAHAL",
    subtitle: "A Monument to Eternal Love",
    description:
      "Discover the timeless beauty of India's most iconic monument.",
  },
  {
    image: "/photos/picture2.jpg",
    location: "GOA, INDIA",
    title: "GOA",
    subtitle: "Golden Sunsets & Blue Waves",
    description:
      "Escape to beautiful beaches, vibrant evenings and unforgettable moments.",
  },
  {
    image: "/photos/picture3.jpg",
    location: "KERALA, INDIA",
    title: "KERALA",
    subtitle: "God's Own Country",
    description:
      "Experience peaceful backwaters, lush landscapes and authentic Kerala.",
  },
  {
    image: "/photos/picture4.jpg",
    location: "LADAKH, INDIA",
    title: "LADAKH",
    subtitle: "Adventure in the Himalayas",
    description:
      "Journey through breathtaking mountains, valleys and high-altitude landscapes.",
  },
  {
    image: "/photos/picture5.png",
    location: "RAJASTHAN, INDIA",
    title: "JAIPUR",
    subtitle: "The Royal Pink City",
    description:
      "Explore royal palaces, magnificent architecture and Rajasthan's rich heritage.",
  },
  {
    image: "/photos/picture6.png",
    location: "RAJASTHAN, INDIA",
    title: "UDAIPUR",
    subtitle: "The City of Lakes",
    description:
      "Discover serene lakes, elegant palaces and romantic royal charm.",
  },
];

function Home() {
  const [current, setCurrent] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  const destination = destinations[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (previous) => (previous + 1) % destinations.length
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Check login status
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("exploreIndiaLoggedIn") === "true";

    const storedName =
      localStorage.getItem("exploreIndiaName") || "";

    setLoggedIn(isLoggedIn);
    setUserName(storedName);
  }, []);

  const nextSlide = () => {
    setCurrent(
      (previous) => (previous + 1) % destinations.length
    );
  };

  const previousSlide = () => {
    setCurrent(
      (previous) =>
        (previous - 1 + destinations.length) %
        destinations.length
    );
  };

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

  // Get first name only
  const firstName = userName
    ? userName.trim().split(" ")[0]
    : "";

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url("${destination.image}")`,
      }}
    >
      <div className="home-overlay"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <Link to="/" className="logo">
          Explore<span>India</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* ACCOUNT SECTION */}
        <div className="nav-actions">
          {!loggedIn ? (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>

              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="account-wrapper">
              <button
                className="account-button"
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
              >
                Hello, {firstName}
                <span className="account-arrow">
                  {accountOpen ? "▲" : "▼"}
                </span>
              </button>

              {accountOpen && (
                <div className="account-dropdown">
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

      {/* HERO CONTENT */}
      <main className="hero-content">
        <div className="location">
          <span className="location-icon">◆</span>
          {destination.location}
        </div>

        <div className="small-line"></div>

        <h1>{destination.title}</h1>

        <h2>{destination.subtitle}</h2>

        <p className="description">
          {destination.description}
        </p>

        <div className="hero-buttons">
          <Link
            to="/packages"
            className="explore-button"
          >
            Explore Packages
            <span>→</span>
          </Link>

          <Link
            to="/booking"
            className="book-button"
          >
            Book Your Trip
          </Link>
        </div>
      </main>

      {/* LEFT ARROW */}
      <button
        className="slide-arrow left-arrow"
        onClick={previousSlide}
        aria-label="Previous destination"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        className="slide-arrow right-arrow"
        onClick={nextSlide}
        aria-label="Next destination"
      >
        ›
      </button>

      {/* SLIDE INDICATOR */}
      <div className="slide-indicator">
        <span className="current-number">
          {String(current + 1).padStart(2, "0")}
        </span>

        <div className="indicator-line">
          <div
            className="indicator-progress"
            style={{
              width: `${
                ((current + 1) / destinations.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        <span className="total-number">
          {String(destinations.length).padStart(2, "0")}
        </span>
      </div>

      {/* BOTTOM TEXT */}
      <div className="bottom-label">
        <span>DISCOVER</span>
        <span>INCREDIBLE INDIA</span>
      </div>
    </div>
  );
}

export default Home;