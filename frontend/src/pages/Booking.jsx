import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [people, setPeople] = useState(1);
  const [travelDate, setTravelDate] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // UPI
  const [upiOption, setUpiOption] = useState("generate_qr");
  const [upiId, setUpiId] = useState("");

  // Card
  const [cardType, setCardType] = useState("Debit Card");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardLastFour, setCardLastFour] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const userName =
    localStorage.getItem("exploreIndiaName") || "";

  const userEmail =
    localStorage.getItem("exploreIndiaUser") || "";

  // ======================================================
  // GET JWT TOKEN
  // ======================================================
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("exploreIndiaToken") ||
      ""
    );
  };

  // ======================================================
  // LOAD SELECTED PACKAGE
  // ======================================================
  useEffect(() => {
    const stored = localStorage.getItem("selectedPackage");

    if (stored) {
      try {
        setSelectedPackage(JSON.parse(stored));
      } catch (error) {
        console.error("Invalid selected package:", error);
      }
    }
  }, []);

  // ======================================================
  // LOGIN CHECK
  // ======================================================
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

  // ======================================================
  // PACKAGE CHECK
  // ======================================================
  if (!selectedPackage) {
    return (
      <div className="booking-empty">
        <h1>No journey selected</h1>

        <p>
          Choose a package before starting your booking.
        </p>

        <Link to="/packages">
          Explore Packages →
        </Link>
      </div>
    );
  }

  // ======================================================
  // PACKAGE VALUES
  // ======================================================

  // Existing frontend package structure uses id.
  // Backend expects package_id.
  const packageId =
    selectedPackage.package_id ||
    selectedPackage.id;

  // Existing frontend uses price.
  const packagePrice =
    Number(
      selectedPackage.price ||
      selectedPackage.base_price ||
      0
    );

  const totalPrice =
    packagePrice * people;

  // ======================================================
  // CARD NUMBER HANDLING
  // ======================================================
  const handleCardNumberChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    setCardNumber(value);

    // Only last four digits are sent to backend.
    setCardLastFour(
      value.length >= 4
        ? value.slice(-4)
        : ""
    );
  };

  // ======================================================
  // SUBMIT BOOKING
  // ======================================================
  const submitBooking = async (e) => {
    e.preventDefault();

    setMessage("");

    // ----------------------------------------------------
    // Basic validation
    // ----------------------------------------------------
    if (!travelDate) {
      setMessage(
        "Please select your travel date."
      );
      return;
    }

    if (!packageId) {
      setMessage(
        "Package information is missing."
      );
      return;
    }

    // ----------------------------------------------------
    // JWT
    // ----------------------------------------------------
    const token = getToken();

    if (!token) {
      setMessage(
        "Your login session has expired. Please login again."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    // ----------------------------------------------------
    // UPI validation
    // ----------------------------------------------------
    if (paymentMethod === "UPI") {
      if (
        upiOption === "upi_id" &&
        !upiId.trim()
      ) {
        setMessage(
          "Please enter your UPI ID."
        );
        return;
      }
    }

    // ----------------------------------------------------
    // CARD validation
    // ----------------------------------------------------
    if (paymentMethod === "Card") {
      if (!cardHolderName.trim()) {
        setMessage(
          "Please enter the card holder name."
        );
        return;
      }

      if (cardNumber.length !== 16) {
        setMessage(
          "Please enter a valid 16-digit card number."
        );
        return;
      }
    }

    setLoading(true);

    try {
      // ==================================================
      // STEP 1 — CREATE BOOKING
      // ==================================================
      const bookingResponse =
        await fetch(
          "http://localhost:5000/api/bookings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              package_id: Number(packageId),
              travel_date: travelDate,
              no_of_people: Number(people)
            })
          }
        );

      const bookingData =
        await bookingResponse.json();

      if (!bookingResponse.ok ||
          !bookingData.success) {

        throw new Error(
          bookingData.message ||
          "Unable to create booking."
        );
      }

      const createdBooking =
        bookingData.data;

      // ==================================================
      // STEP 2 — CREATE PAYMENT
      // ==================================================

      const paymentBody = {
        booking_id:
          createdBooking.booking_id,

        payment_method:
          paymentMethod
      };

      // --------------------------------------------------
      // UPI
      // --------------------------------------------------
      if (paymentMethod === "UPI") {

        paymentBody.upi_option =
          upiOption;

        if (upiOption === "upi_id") {
          paymentBody.upi_id =
            upiId.trim();
        }
      }

      // --------------------------------------------------
      // CARD
      // --------------------------------------------------
      if (paymentMethod === "Card") {

        paymentBody.card_type =
          cardType;

        paymentBody.card_holder_name =
          cardHolderName.trim();

        // IMPORTANT:
        // We only send last four digits.
        // Full card number is never sent/stored.
        paymentBody.card_last_four =
          cardLastFour;
      }

      const paymentResponse =
        await fetch(
          "http://localhost:5000/api/payments",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify(
              paymentBody
            )
          }
        );

      const paymentData =
        await paymentResponse.json();

      if (
        !paymentResponse.ok ||
        !paymentData.success
      ) {
        throw new Error(
          paymentData.message ||
          "Unable to initiate payment."
        );
      }

      const createdPayment =
        paymentData.data;

      // ==================================================
      // STEP 3 — COMPLETE PAYMENT
      // ==================================================

      const completeResponse =
        await fetch(
          `http://localhost:5000/api/payments/${createdPayment.payment_id}/complete`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const completeData =
        await completeResponse.json();

      if (
        !completeResponse.ok ||
        !completeData.success
      ) {
        throw new Error(
          completeData.message ||
          "Payment could not be completed."
        );
      }

      // ==================================================
      // SAVE FRONTEND BOOKING CACHE
      // ==================================================
      const frontendBooking = {
        booking_id:
          createdBooking.booking_id,

        booking_code:
          createdBooking.booking_code,

        package_id:
          createdBooking.package_id,

        package_name:
          createdBooking.package_name ||
          selectedPackage.title,

        destination:
          selectedPackage.location,

        travel_date:
          createdBooking.travel_date,

        no_of_people:
          createdBooking.no_of_people,

        total_amount:
          createdBooking.total_amount,

        payment_method:
          paymentMethod,

        payment_id:
          createdPayment.payment_id,

        transaction_id:
          createdPayment.transaction_id,

        status:
          "Confirmed",

        booked_at:
          new Date().toISOString()
      };

      const existing =
        JSON.parse(
          localStorage.getItem(
            "exploreIndiaBookings"
          ) || "[]"
        );

      existing.push(frontendBooking);

      localStorage.setItem(
        "exploreIndiaBookings",
        JSON.stringify(existing)
      );

      // ==================================================
      // SUCCESS
      // ==================================================

      setMessage(
        "Booking confirmed successfully!"
      );

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1200);

    } catch (error) {

      console.error(
        "Booking error:",
        error
      );

      setMessage(
        error.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="booking-page">

      {/* ================= NAVBAR ================= */}

      <nav className="booking-navbar">

        <Link
          to="/"
          className="booking-logo"
        >
          Explore<span>India</span>
        </Link>

        <div className="booking-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/packages">
            Packages
          </Link>

          <Link to="/hotels">
            Hotels
          </Link>

          <Link to="/buses">
            Buses
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

        <Link
          to="/my-bookings"
          className="booking-account-link"
        >
          My Bookings
        </Link>

      </nav>

      {/* ================= MAIN ================= */}

      <main className="booking-main">

        <div className="booking-header">

          <span>
            RESERVE YOUR JOURNEY
          </span>

          <h1>
            Complete your booking
          </h1>

          <p>
            A few details and your next
            Indian adventure is ready.
          </p>

        </div>

        <div className="booking-layout">

          {/* ================= FORM ================= */}

          <section className="booking-form-section">

            <form onSubmit={submitBooking}>

              {/* ================= TRAVELLER ================= */}

              <div className="booking-section-title">

                <span>01</span>

                <div>
                  <h2>
                    Traveller details
                  </h2>

                  <p>
                    Your account information
                  </p>
                </div>

              </div>

              <div className="booking-input-grid">

                <div className="booking-input">

                  <label>
                    Full Name
                  </label>

                  <input
                    value={userName}
                    readOnly
                  />

                </div>

                <div className="booking-input">

                  <label>
                    Email
                  </label>

                  <input
                    value={userEmail}
                    readOnly
                  />

                </div>

              </div>

              {/* ================= TRIP ================= */}

              <div className="booking-section-title">

                <span>02</span>

                <div>

                  <h2>
                    Trip details
                  </h2>

                  <p>
                    Choose your travel date
                    and group size
                  </p>

                </div>

              </div>

              <div className="booking-input-grid">

                <div className="booking-input">

                  <label>
                    Travel Date
                  </label>

                  <input
                    type="date"
                    value={travelDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setTravelDate(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="booking-input">

                  <label>
                    Number of People
                  </label>

                  <div className="people-control">

                    <button
                      type="button"
                      onClick={() =>
                        setPeople(
                          Math.max(
                            1,
                            people - 1
                          )
                        )
                      }
                    >
                      −
                    </button>

                    <strong>
                      {people}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        setPeople(
                          Math.min(
                            10,
                            people + 1
                          )
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              {/* ================= PAYMENT ================= */}

              <div className="booking-section-title">

                <span>03</span>

                <div>

                  <h2>
                    Payment
                  </h2>

                  <p>
                    Select your preferred
                    payment method
                  </p>

                </div>

              </div>

              <div className="payment-options">

                {[
                  "UPI",
                  "Card",
                  "Net Banking"
                ].map((method) => (

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

                    <span>
                      {method}
                    </span>

                  </label>

                ))}

              </div>

              {/* ================= UPI ================= */}

              {paymentMethod === "UPI" && (

                <div className="payment-extra">

                  <label>
                    UPI Payment Option
                  </label>

                  <select
                    value={upiOption}
                    onChange={(e) =>
                      setUpiOption(
                        e.target.value
                      )
                    }
                  >

                    <option value="generate_qr">
                      Generate QR
                    </option>

                    <option value="upi_id">
                      Enter UPI ID
                    </option>

                  </select>

                  {upiOption === "upi_id" && (

                    <input
                      type="text"
                      placeholder="example@upi"
                      value={upiId}
                      onChange={(e) =>
                        setUpiId(
                          e.target.value
                        )
                      }
                    />

                  )}

                </div>

              )}

              {/* ================= CARD ================= */}

              {paymentMethod === "Card" && (

                <div className="payment-extra">

                  <label>
                    Card Type
                  </label>

                  <select
                    value={cardType}
                    onChange={(e) =>
                      setCardType(
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Debit Card
                    </option>

                    <option>
                      Credit Card
                    </option>

                  </select>

                  <label>
                    Card Holder Name
                  </label>

                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardHolderName}
                    onChange={(e) =>
                      setCardHolderName(
                        e.target.value
                      )
                    }
                  />

                  <label>
                    Card Number
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={
                      handleCardNumberChange
                    }
                    maxLength={16}
                  />

                  <small>
                    Only the last four digits
                    are sent to the server.
                  </small>

                </div>

              )}

              {/* ================= MESSAGE ================= */}

              {message && (

                <div
                  className={
                    message.includes(
                      "successfully"
                    )
                      ? "booking-success"
                      : "booking-error"
                  }
                >
                  {message}
                </div>

              )}

              {/* ================= BUTTON ================= */}

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

          {/* ================= SUMMARY ================= */}

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

              <h2>
                {selectedPackage.title}
              </h2>

              <p className="summary-location">
                {selectedPackage.location}
              </p>

              <div className="summary-row">

                <span>
                  Duration
                </span>

                <strong>
                  {selectedPackage.duration}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Travellers
                </span>

                <strong>
                  {people}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  Price / person
                </span>

                <strong>
                  ₹
                  {packagePrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="summary-total">

                <span>
                  Total
                </span>

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