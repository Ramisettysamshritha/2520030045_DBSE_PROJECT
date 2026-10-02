import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Connect to Auth Microservice
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // Check login response
      if (!response.ok || !data.success) {
        alert(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Get JWT token from Auth Service
      const token = data.token;

      if (!token) {
        alert(
          "Login successful, but authentication token was not received."
        );
        setLoading(false);
        return;
      }

      // Get user information from backend response
      const loggedInUser =
        data.user ||
        data.data?.user ||
        data.data ||
        {};

      // Get user's name
      let name =
        loggedInUser.full_name ||
        loggedInUser.name ||
        localStorage.getItem("exploreIndiaName");

      // If name is not available, create one from email
      if (!name) {
        name = email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase());
      }

      // Save user information
      localStorage.setItem("exploreIndiaUser", email);
      localStorage.setItem("exploreIndiaName", name);
      localStorage.setItem("exploreIndiaLoggedIn", "true");

      // Save JWT token
      localStorage.setItem("exploreIndiaToken", token);

      // Go to home page
      navigate("/");

      // Refresh so navbar updates immediately
      window.location.reload();

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to the login server. Please make sure the Auth Service is running on port 5001."
      );

      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT IMAGE SECTION ================= */}

      <div className="auth-image">

        <div className="auth-image-overlay"></div>

        <Link to="/" className="auth-brand">
          ExploreIndia
        </Link>

        <div className="auth-image-content">

          <span>
            TRAVEL. DISCOVER. REMEMBER.
          </span>

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

      {/* ================= RIGHT FORM SECTION ================= */}

      <div className="auth-form-section">

        <div className="auth-form-box">

          {/* Mobile Brand */}

          <Link to="/" className="mobile-brand">
            ExploreIndia
          </Link>

          {/* Heading */}

          <div className="auth-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Sign in
            </h2>

            <p>
              Continue your journey with ExploreIndia.
            </p>

          </div>

          {/* ================= LOGIN FORM ================= */}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="auth-input">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            {/* Password */}

            <div className="auth-input">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            {/* Login Options */}

            <div className="auth-options">

              <label>

                <input
                  type="checkbox"
                />

                Remember me

              </label>

              <button
                type="button"
                className="forgot-btn"
              >
                Forgot password?
              </button>

            </div>

            {/* Sign In Button */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* ================= DIVIDER ================= */}

          <div className="auth-divider">

            <span>
              OR
            </span>

          </div>

          {/* ================= GUEST LOGIN ================= */}

          <button
            className="guest-btn"
            onClick={() => navigate("/")}
          >
            Continue as Guest
          </button>

          {/* ================= SIGNUP LINK ================= */}

          <p className="auth-switch">

            Don't have an account?

            <Link to="/signup">
              {" "}Create one
            </Link>

          </p>

          {/* ================= TERMS ================= */}

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