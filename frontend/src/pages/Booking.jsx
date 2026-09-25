import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [people, setPeople] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const userName =
    localStorage.getItem("exploreIndiaName") || "";

  const userEmail =
    localStorage.getItem("exploreIndiaUser") || "";

  useEffect(() => {
    const stored =
      localStorage.getItem("selectedPackage");

    if (stored) {
      setSelectedPackage(JSON.parse(stored));
    }
  }, []);

  if (!loggedIn) {
    return (
      <div className="booking-login-page">
        <div className="booking-login-box">
          <span>EXPLOREINDIA</span>
          <h1>Sign in to continue</h1>
          <p>
            Please log in before booking your journey.
          </p>

          <Link to="/login">
            Login to ExploreIndia →
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="booking-empty">
        <h1>No journey selected</h1>
        <p>Choose a package before starting your booking.</p>

        <Link to="/packages">
          Explore Packages →
        </Link>
      </div>
    );
  }

  const totalPrice =
    selectedPackage.price * people;

  const submitBooking = async (e) => {
    e.preventDefault();

    if (!travelDate) {
      setMessage("Please select your travel date.");
      return;
    }

    setLoading(true);
    setMessage("");

    const booking = {
      booking_id: Date.now(),
      package_id: selectedPackage.id,
      package_name: selectedPackage.title,
      destination: selectedPackage.location,
      travel_date: travelDate,
      no_of_people: people,
      total_amount: totalPrice,
      payment_method: paymentMethod,
      status: "Confirmed",
      booked_at: new Date().toISOString()
    };

    try {
      const existing =
        JSON.parse(
          localStorage.getItem("exploreIndiaBookings") || "[]"
        );

      existing.push(booking);

      localStorage.setItem(
        "exploreIndiaBookings",
        JSON.stringify(existing)
      );

      setMessage(
        "Booking confirmed successfully!"
      );

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1000);
    } catch (error) {
      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">

      <nav className="booking-navbar">

        <Link to="/" className="booking-logo">
          Explore<span>India</span>
        </Link>

        <div className="booking-nav-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Link
          to="/my-bookings"
          className="booking-account-link"
        >
          My Bookings
        </Link>

      </nav>

      <main className="booking-main">

        <div className="booking-header">
          <span>RESERVE YOUR JOURNEY</span>
          <h1>Complete your booking</h1>
          <p>
            A few details and your next Indian adventure is ready.
          </p>
        </div>

        <div className="booking-layout">

          <section className="booking-form-section">

            <form onSubmit={submitBooking}>

              <div className="booking-section-title">
                <span>01</span>
                <div>
                  <h2>Traveller details</h2>
                  <p>Your account information</p>
                </div>
              </div>

              <div className="booking-input-grid">

                <div className="booking-input">
                  <label>Full Name</label>
                  <input
                    value={userName}
                    readOnly
                  />
                </div>

                <div className="booking-input">
                  <label>Email</label>
                  <input
                    value={userEmail}
                    readOnly
                  />
                </div>

              </div>

              <div className="booking-section-title">
                <span>02</span>
                <div>
                  <h2>Trip details</h2>
                  <p>Choose your travel date and group size</p>
                </div>
              </div>

              <div className="booking-input-grid">

                <div className="booking-input">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setTravelDate(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="booking-input">
                  <label>Number of People</label>

                  <div className="people-control">

                    <button
                      type="button"
                      onClick={() =>
                        setPeople(
                          Math.max(1, people - 1)
                        )
                      }
                    >
                      −
                    </button>

                    <strong>{people}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        setPeople(
                          Math.min(10, people + 1)
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              <div className="booking-section-title">
                <span>03</span>
                <div>
                  <h2>Payment</h2>
                  <p>Select your preferred payment method</p>
                </div>
              </div>

              <div className="payment-options">

                {["UPI", "Card", "Net Banking"].map(
                  (method) => (
                    <label
                      key={method}
                      className={
                        paymentMethod === method
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >

                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={
                          paymentMethod === method
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>{method}</span>

                    </label>
                  )
                )}

              </div>

              {message && (
                <div
                  className={
                    message.includes("successfully")
                      ? "booking-success"
                      : "booking-error"
                  }
                >
                  {message}
                </div>
              )}

              <button
                className="confirm-booking"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Confirm & Pay →"}
              </button>

            </form>

          </section>

          <aside className="booking-summary">

            <div className="summary-image">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.title}
              />
            </div>

            <div className="summary-content">

              <span className="summary-label">
                YOUR JOURNEY
              </span>

              <h2>{selectedPackage.title}</h2>

              <p className="summary-location">
                {selectedPackage.location}
              </p>

              <div className="summary-row">
                <span>Duration</span>
                <strong>
                  {selectedPackage.duration}
                </strong>
              </div>

              <div className="summary-row">
                <span>Travellers</span>
                <strong>{people}</strong>
              </div>

              <div className="summary-row">
                <span>Price / person</span>
                <strong>
                  ₹
                  {selectedPackage.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Booking;