import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  const navigate = useNavigate();

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const name =
    localStorage.getItem("exploreIndiaName") || "Traveller";

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(
        localStorage.getItem("exploreIndiaBookings") || "[]"
      );

    setBookings(stored.reverse());
  }, []);

  const cancelBooking = (id) => {
    const updated = bookings.map((booking) =>
      booking.booking_id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    setBookings(updated);

    localStorage.setItem(
      "exploreIndiaBookings",
      JSON.stringify([...updated].reverse())
    );
  };

  if (!loggedIn) {
    return (
      <div className="my-bookings-login">
        <div>
          <span>EXPLOREINDIA</span>
          <h1>Your journeys await.</h1>
          <p>
            Login to view and manage your bookings.
          </p>
          <Link to="/login">Login →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">

      <nav className="my-bookings-navbar">

        <Link to="/" className="my-bookings-logo">
          Explore<span>India</span>
        </Link>

        <div className="my-bookings-nav">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Link
          to="/profile"
          className="my-bookings-user"
        >
          Hello, {name.split(" ")[0]}
        </Link>

      </nav>

      <main className="my-bookings-main">

        <div className="my-bookings-heading">
          <span>YOUR JOURNEYS</span>
          <h1>My Bookings</h1>
          <p>
            Everything you've planned with ExploreIndia,
            in one place.
          </p>
        </div>

        {bookings.length === 0 ? (

          <div className="no-bookings">

            <div className="no-bookings-icon">
              ◌
            </div>

            <h2>No bookings yet</h2>

            <p>
              Your next adventure could be just a click away.
            </p>

            <Link to="/packages">
              Explore Packages →
            </Link>

          </div>

        ) : (

          <div className="booking-list">

            {bookings.map((booking) => (

              <article
                className="booking-item"
                key={booking.booking_id}
              >

                <div className="booking-item-image">
                  <img
                    src={
                      booking.image ||
                      "/photos/picture6.png"
                    }
                    alt={booking.package_name}
                  />
                </div>

                <div className="booking-item-content">

                  <div className="booking-item-top">

                    <span>
                      BOOKING #{booking.booking_id}
                    </span>

                    <strong
                      className={
                        booking.status === "Cancelled"
                          ? "cancelled"
                          : "confirmed"
                      }
                    >
                      {booking.status}
                    </strong>

                  </div>

                  <h2>
                    {booking.package_name}
                  </h2>

                  <p className="booking-destination">
                    {booking.destination}
                  </p>

                  <div className="booking-details">

                    <div>
                      <small>Travel Date</small>
                      <strong>
                        {booking.travel_date}
                      </strong>
                    </div>

                    <div>
                      <small>Travellers</small>
                      <strong>
                        {booking.no_of_people}
                      </strong>
                    </div>

                    <div>
                      <small>Total</small>
                      <strong>
                        ₹
                        {Number(
                          booking.total_amount
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>

                  </div>

                  {booking.status !== "Cancelled" && (
                    <button
                      className="cancel-booking"
                      onClick={() =>
                        cancelBooking(
                          booking.booking_id
                        )
                      }
                    >
                      Cancel Booking
                    </button>
                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyBookings;