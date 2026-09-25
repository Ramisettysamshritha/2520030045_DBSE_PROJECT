import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // Get name from signup, or create a name from email
    const savedName = localStorage.getItem("exploreIndiaName");

    let name = savedName;

    if (!name) {
      name = email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    localStorage.setItem("exploreIndiaUser", email);
    localStorage.setItem("exploreIndiaName", name);
    localStorage.setItem("exploreIndiaLoggedIn", "true");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="auth-page">

      <div className="auth-image">
        <div className="auth-image-overlay"></div>

        <Link to="/" className="auth-brand">
          ExploreIndia
        </Link>

        <div className="auth-image-content">
          <span>TRAVEL. DISCOVER. REMEMBER.</span>

          <h1>
            Your next<br />
            beautiful journey<br />
            starts here.
          </h1>

          <p>
            Discover unforgettable destinations, stays and experiences
            across India.
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-box">

          <Link to="/" className="mobile-brand">
            ExploreIndia
          </Link>

          <div className="auth-heading">
            <span>WELCOME BACK</span>
            <h2>Sign in</h2>
            <p>Continue your journey with ExploreIndia.</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="auth-input">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-input">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="forgot-btn">
                Forgot password?
              </button>

            </div>

            <button type="submit" className="auth-submit">
              Sign In
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            className="guest-btn"
            onClick={() => navigate("/")}
          >
            Continue as Guest
          </button>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/signup"> Create one</Link>
          </p>

          <p className="auth-terms">
            By continuing, you agree to our Terms of Service and Privacy
            Policy.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;