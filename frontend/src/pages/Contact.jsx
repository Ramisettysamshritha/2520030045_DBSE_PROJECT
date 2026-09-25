import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* ================= NAVBAR ================= */}
      <nav className="contact-navbar">

        <Link to="/" className="contact-logo">
          <span className="logo-main">TRAVEL</span>
          <span className="logo-sub">INDIA</span>
        </Link>

        <div className="contact-nav-links">
          <Link to="/">Home</Link>

          <Link to="/tours">Tours</Link>

          <Link to="/hotels">Hotels</Link>

          <Link to="/buses">Buses</Link>

          <Link to="/restaurants">Restaurants</Link>

          <Link to="/contact" className="active">
            Contact
          </Link>
        </div>

        <div className="contact-nav-actions">

          <Link
            to="/login"
            className="contact-login"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="contact-signup"
          >
            Sign Up
          </Link>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="contact-hero">

        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">

          <span className="hero-label">
            LET'S CONNECT
          </span>

          <h1>
            LET'S TALK ABOUT
            <br />
            YOUR JOURNEY
          </h1>

          <p>
            Have a question, need some travel inspiration,
            <br />
            or simply want to say hello? We're here for you.
          </p>

          <div className="hero-line"></div>

          <span className="hero-scroll">
            SCROLL TO EXPLORE
          </span>

        </div>

      </section>


      {/* ================= INTRO ================= */}
      <section className="contact-intro">

        <div className="intro-heading">

          <span className="section-label">
            WE'RE HERE FOR YOU
          </span>

          <h2>
            WE'RE HERE WHEN
            <br />
            YOU NEED US
          </h2>

        </div>

        <div className="intro-text">

          <p>
            Every great journey starts with a conversation.
            Whether you're planning your next adventure,
            looking for the perfect stay, or need help with
            an existing booking, our team is ready to help.
          </p>

          <p>
            Tell us what you need and we'll make sure your
            travel experience is smooth from beginning to end.
          </p>

        </div>

      </section>


      {/* ================= CONTACT CARDS ================= */}
      <section className="contact-cards-section">

        {/* EMAIL */}
        <div className="contact-card">

          <div className="contact-card-top">

            <div className="contact-card-icon">
              ✉
            </div>

            <span className="card-label">
              EMAIL US
            </span>

          </div>

          <h3>
            hello@travelindia.com
          </h3>

          <p>
            Send us your questions, suggestions,
            or travel requirements.
          </p>

          <span className="card-note">
            We usually reply within 24 hours.
          </span>

        </div>


        {/* PHONE */}
        <div className="contact-card">

          <div className="contact-card-top">

            <div className="contact-card-icon">
              ☎
            </div>

            <span className="card-label">
              CALL US
            </span>

          </div>

          <h3>
            +91 98765 43210
          </h3>

          <p>
            Speak directly with our travel support
            team for quick assistance.
          </p>

          <span className="card-note">
            Monday – Saturday · 9 AM – 7 PM
          </span>

        </div>


        {/* LOCATION */}
        <div className="contact-card">

          <div className="contact-card-top">

            <div className="contact-card-icon">
              ◎
            </div>

            <span className="card-label">
              VISIT US
            </span>

          </div>

          <h3>
            Hyderabad, India
          </h3>

          <p>
            Our team is based in Hyderabad and
            connected to destinations across India.
          </p>

          <span className="card-note">
            India · Your journey starts here.
          </span>

        </div>

      </section>


      {/* ================= MESSAGE SECTION ================= */}
      <section className="message-section">

        <div className="message-left">

          <span className="section-label light">
            SEND A MESSAGE
          </span>

          <h2>
            HAVE SOMETHING
            <br />
            TO SAY?
          </h2>

          <p>
            Fill in the details and our team will
            get back to you as soon as possible.
          </p>

        </div>


        <div className="message-form-container">

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Your message has been received.");
            }}
          >

            <div className="form-row">

              <div className="form-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                placeholder="What can we help you with?"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Your Message
              </label>

              <textarea
                rows="6"
                placeholder="Tell us a little about what you need..."
                required
              ></textarea>

            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              SEND MESSAGE
              <span>→</span>
            </button>

          </form>

        </div>

      </section>


      {/* ================= SUPPORT ================= */}
      <section className="support-section">

        <div className="support-title">

          <span className="section-label">
            QUICK HELP
          </span>

          <h2>
            LOOKING FOR
            <br />
            SOMETHING ELSE?
          </h2>

        </div>


        <div className="support-list">

          {/* SUPPORT 01 */}
          <div className="support-item">

            <span>
              01
            </span>

            <div>

              <h3>
                Booking Support
              </h3>

              <p>
                Need help with a booking or reservation?
              </p>

            </div>

            <span className="support-arrow">
              →
            </span>

          </div>


          {/* SUPPORT 02 */}
          <div className="support-item">

            <span>
              02
            </span>

            <div>

              <h3>
                Travel Information
              </h3>

              <p>
                Find information about destinations,
                hotels and travel packages.
              </p>

            </div>

            <span className="support-arrow">
              →
            </span>

          </div>


          {/* SUPPORT 03 */}
          <div className="support-item">

            <span>
              03
            </span>

            <div>

              <h3>
                General Enquiries
              </h3>

              <p>
                Have a different question? We're happy
                to help.
              </p>

            </div>

            <span className="support-arrow">
              →
            </span>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="contact-cta">

        <div className="contact-cta-content">

          <span className="section-label light">
            YOUR NEXT ADVENTURE
          </span>

          <h2>
            INDIA IS WAITING
          </h2>

          <p>
            From the mountains of Ladakh to the beaches
            of Goa, your next story is waiting to be written.
          </p>

          <Link
            to="/tours"
            className="cta-button"
          >
            EXPLORE TOURS
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="contact-footer">

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">

            <Link
              to="/"
              className="contact-logo footer-logo"
            >
              <span className="logo-main">
                TRAVEL
              </span>

              <span className="logo-sub">
                INDIA
              </span>
            </Link>

            <p>
              Discover India differently.
              <br />
              Travel with meaning.
            </p>

          </div>


          {/* EXPLORE */}
          <div className="footer-column">

            <span>
              EXPLORE
            </span>

            <Link to="/tours">
              Tours
            </Link>

            <Link to="/hotels">
              Hotels
            </Link>

            <Link to="/buses">
              Buses
            </Link>

            <Link to="/restaurants">
              Restaurants
            </Link>

          </div>


          {/* COMPANY */}
          <div className="footer-column">

            <span>
              COMPANY
            </span>

            <Link to="/">
              Home
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Sign Up
            </Link>

          </div>


          {/* CONTACT */}
          <div className="footer-column">

            <span>
              CONTACT
            </span>

            <p>
              Hyderabad, India
            </p>

            <p>
              +91 98765 43210
            </p>

            <p>
              hello@travelindia.com
            </p>

          </div>

        </div>


        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">

          <span>
            © 2026 Travel India. All rights reserved.
          </span>

          <span>
            Made for travellers across India.
          </span>

        </div>

      </footer>

    </div>
  );
};

export default Contact;