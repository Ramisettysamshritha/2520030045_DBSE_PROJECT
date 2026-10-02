import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all the fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Connect to Auth Microservice
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to create account.");
        setLoading(false);
        return;
      }

      /*
        Account successfully created in MySQL.
        Now save the same information locally
        so the existing ExploreIndia frontend
        continues to work.
      */

      localStorage.setItem("exploreIndiaName", form.name);
      localStorage.setItem("exploreIndiaUser", form.email);
      localStorage.setItem("exploreIndiaPhone", form.phone);

      /*
        If the Auth Service returns a token after signup,
        save it so the user is immediately authenticated.
      */

      if (data.token) {
        localStorage.setItem("exploreIndiaToken", data.token);
        localStorage.setItem("exploreIndiaLoggedIn", "true");
      } else {
        /*
          If signup only creates the account,
          send the user to Login.
        */
        localStorage.setItem("exploreIndiaLoggedIn", "false");
      }

      alert("Account created successfully!");

      /*
        If token was returned, go directly home.
        Otherwise go to login.
      */

      if (data.token) {
        navigate("/");
        window.location.reload();
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "Unable to connect to the signup server. Please make sure the Auth Service is running on port 5001."
      );

      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT IMAGE SECTION ================= */}

      <div className="auth-image signup-image">

        <div className="auth-image-overlay"></div>

        <Link to="/" className="auth-brand">
          ExploreIndia
        </Link>

        <div className="auth-image-content">

          <span>
            YOUR INDIA. YOUR STORY.
          </span>

          <h1>
            Make every<br />
            journey<br />
            unforgettable.
          </h1>

          <p>
            Create your ExploreIndia account and start planning
            experiences worth remembering.
          </p>

        </div>

      </div>

      {/* ================= RIGHT FORM SECTION ================= */}

      <div className="auth-form-section">

        <div className="auth-form-box signup-box">

          {/* Mobile Brand */}

          <Link to="/" className="mobile-brand">
            ExploreIndia
          </Link>

          {/* Heading */}

          <div className="auth-heading">

            <span>
              JOIN EXPLOREINDIA
            </span>

            <h2>
              Create account
            </h2>

            <p>
              Start planning your next Indian adventure.
            </p>

          </div>

          {/* ================= SIGNUP FORM ================= */}

          <form onSubmit={handleSignup}>

            {/* Full Name */}

            <div className="auth-input">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Email + Phone */}

            <div className="auth-row">

              <div className="auth-input">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="auth-input">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Password + Confirm Password */}

            <div className="auth-row">

              <div className="auth-input">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="auth-input">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Terms */}

            <label className="terms-check">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>

            </label>

            {/* Create Account Button */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}

          <p className="auth-switch">

            Already have an account?

            <Link to="/login">
              {" "}Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;