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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
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

    // Save user information
    localStorage.setItem("exploreIndiaName", form.name);
    localStorage.setItem("exploreIndiaUser", form.email);
    localStorage.setItem("exploreIndiaPhone", form.phone);
    localStorage.setItem("exploreIndiaLoggedIn", "true");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="auth-page">

      <div className="auth-image signup-image">
        <div className="auth-image-overlay"></div>

        <Link to="/" className="auth-brand">
          ExploreIndia
        </Link>

        <div className="auth-image-content">
          <span>YOUR INDIA. YOUR STORY.</span>

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

      <div className="auth-form-section">

        <div className="auth-form-box signup-box">

          <Link to="/" className="mobile-brand">
            ExploreIndia
          </Link>

          <div className="auth-heading">
            <span>JOIN EXPLOREINDIA</span>
            <h2>Create account</h2>
            <p>Start planning your next Indian adventure.</p>
          </div>

          <form onSubmit={handleSignup}>

            <div className="auth-input">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="auth-row">

              <div className="auth-input">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-input">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="auth-row">

              <div className="auth-input">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-input">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

            </div>

            <label className="terms-check">
              <input type="checkbox" required />

              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            <button type="submit" className="auth-submit">
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;