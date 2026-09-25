import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const name =
    localStorage.getItem("exploreIndiaName") || "Traveler";

  const email =
    localStorage.getItem("exploreIndiaUser") || "";

  const firstName = name.split(" ")[0];

  const logout = () => {
    localStorage.removeItem("exploreIndiaLoggedIn");
    localStorage.removeItem("exploreIndiaUser");
    localStorage.removeItem("exploreIndiaName");
    localStorage.removeItem("exploreIndiaPhone");

    setMenuOpen(false);

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="main-navbar">

      {/* LOGO */}
      <Link to="/" className="main-logo">
        ExploreIndia
      </Link>

      {/* NAVIGATION */}
      <div className="main-nav-links">
        <Link to="/">Home</Link>
        <Link to="/buses">Buses</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* ACCOUNT */}
      <div className="navbar-account">

        {!isLoggedIn ? (
          <Link to="/login" className="signin-link">
            Sign In
          </Link>
        ) : (
          <div className="account-wrapper">

            <button
              className="hello-user"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="user-circle">
                {firstName.charAt(0).toUpperCase()}
              </span>

              <span>Hello, {firstName}</span>

              <span className="dropdown-arrow">
                {menuOpen ? "⌃" : "⌄"}
              </span>
            </button>

            {menuOpen && (
              <div className="account-dropdown">

                {/* PROFILE */}
                <div className="account-profile">

                  <div className="profile-circle">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div className="profile-details">
                    <strong>{name}</strong>
                    <span>{email}</span>
                  </div>

                </div>

                <div className="dropdown-line"></div>

                {/* ACCOUNT LINKS */}

                <Link
                  to="/bookings"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>▣</span>
                  My Bookings
                </Link>

                <Link
                  to="/reviews"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>☆</span>
                  My Reviews
                </Link>

                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>⚙</span>
                  Account Settings
                </Link>

                <div className="dropdown-line"></div>

                {/* LOGOUT */}

                <button
                  className="logout-button"
                  onClick={logout}
                >
                  <span>↪</span>
                  Sign Out
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;