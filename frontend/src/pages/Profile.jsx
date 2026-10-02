import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const [name, setName] = useState(
    localStorage.getItem("exploreIndiaName") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("exploreIndiaUser") || ""
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("exploreIndiaPhone") || ""
  );

  const [message, setMessage] = useState("");

  if (!loggedIn) {
    return (
      <div className="profile-login">
        <div>
          <span>EXPLOREINDIA</span>
          <h1>Your profile is waiting.</h1>
          <p>Login to access your account.</p>
          <Link to="/login">Login →</Link>
        </div>
      </div>
    );
  }

  const saveProfile = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "exploreIndiaName",
      name
    );

    localStorage.setItem(
      "exploreIndiaUser",
      email
    );

    localStorage.setItem(
      "exploreIndiaPhone",
      phone
    );

    setMessage("Profile updated successfully.");
  };

  const logout = () => {
    localStorage.removeItem(
      "exploreIndiaLoggedIn"
    );

    localStorage.removeItem(
      "exploreIndiaName"
    );

    localStorage.removeItem(
      "exploreIndiaUser"
    );

    localStorage.removeItem(
      "exploreIndiaPhone"
    );

    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="profile-page">

      <nav className="profile-navbar">

        <Link to="/" className="profile-logo">
          Explore<span>India</span>
        </Link>

        <div className="profile-nav-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Link
          to="/my-bookings"
          className="profile-bookings"
        >
          My Bookings
        </Link>

      </nav>

      <main className="profile-main">

        <div className="profile-heading">
          <span>YOUR ACCOUNT</span>
          <h1>Account settings</h1>
          <p>
            Manage your personal details and ExploreIndia
            account.
          </p>
        </div>

        <div className="profile-layout">

          <aside className="profile-sidebar">

            <div className="profile-avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <h2>{name}</h2>

            <p>{email}</p>

            <div className="profile-side-links">
              <Link
                to="/profile"
                className="selected"
              >
                Personal Details
              </Link>

              <Link to="/my-bookings">
                My Bookings
              </Link>

              <Link to="/reviews">
                My Reviews
              </Link>
            </div>

            <button
              className="profile-logout"
              onClick={logout}
            >
              Sign Out
            </button>

          </aside>

          <section className="profile-form-card">

            <div className="profile-form-header">
              <span>PERSONAL DETAILS</span>
              <h2>Your information</h2>
            </div>

            <form onSubmit={saveProfile}>

              <div className="profile-input">
                <label>Full Name</label>
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="profile-input">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="profile-input">
                <label>Phone Number</label>
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />
              </div>

              {message && (
                <div className="profile-success">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="profile-save"
              >
                Save Changes →
              </button>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Profile;