import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Reviews.css";

const defaultReviews = [
  {
    id: 1,
    name: "Aarav Mehta",
    rating: 5,
    package: "Royal Rajasthan Escape",
    date: "August 2026",
    text:
      "The itinerary was beautifully planned and the experience felt very smooth from start to finish."
  },
  {
    id: 2,
    name: "Isha Singhania",
    rating: 5,
    package: "Goa Beach Escape",
    date: "July 2026",
    text:
      "The package was exactly what we needed. The destination planning and hotel selection were excellent."
  },
  {
    id: 3,
    name: "Shivay Dhanraj",
    rating: 4,
    package: "Kerala Backwaters",
    date: "June 2026",
    text:
      "Beautiful trip with a relaxed itinerary. The backwater experience was definitely memorable."
  }
];

function Reviews() {
  const navigate = useNavigate();

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const userName =
    localStorage.getItem("exploreIndiaName") || "";

  const [reviews, setReviews] = useState(defaultReviews);
  const [rating, setRating] = useState(5);
  const [packageName, setPackageName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(
        localStorage.getItem("exploreIndiaReviews") || "[]"
      );

    if (stored.length > 0) {
      setReviews([...stored, ...defaultReviews]);
    }
  }, []);

  const submitReview = (e) => {
    e.preventDefault();

    if (!packageName || !reviewText.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: userName || "ExploreIndia Traveller",
      rating,
      package: packageName,
      date: "Just now",
      text: reviewText.trim()
    };

    const stored =
      JSON.parse(
        localStorage.getItem("exploreIndiaReviews") || "[]"
      );

    stored.unshift(newReview);

    localStorage.setItem(
      "exploreIndiaReviews",
      JSON.stringify(stored)
    );

    setReviews([newReview, ...reviews]);
    setPackageName("");
    setReviewText("");
    setRating(5);
    setSuccess("Your review has been submitted.");

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="reviews-page">

      <nav className="reviews-navbar">

        <Link to="/" className="reviews-logo">
          Explore<span>India</span>
        </Link>

        <div className="reviews-nav-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {loggedIn ? (
          <Link
            to="/profile"
            className="reviews-account"
          >
            Hello, {userName.split(" ")[0]}
          </Link>
        ) : (
          <Link
            to="/login"
            className="reviews-account"
          >
            Login
          </Link>
        )}

      </nav>

      <section className="reviews-hero">

        <div className="reviews-hero-overlay"></div>

        <div className="reviews-hero-content">
          <span>TRAVELLER STORIES</span>

          <h1>
            Experiences that
            <br />
            stay with you.
          </h1>

          <p>
            Discover what travellers have shared about their
            ExploreIndia journeys.
          </p>
        </div>

      </section>

      <main className="reviews-main">

        <section className="review-form-area">

          <div className="review-form-intro">
            <span>SHARE YOUR JOURNEY</span>
            <h2>Tell us about your experience.</h2>
            <p>
              Your feedback helps other travellers discover
              meaningful journeys.
            </p>
          </div>

          {loggedIn ? (
            <form
              className="review-form"
              onSubmit={submitReview}
            >

              <label>Package</label>

              <select
                value={packageName}
                onChange={(e) =>
                  setPackageName(e.target.value)
                }
                required
              >
                <option value="">
                  Select your package
                </option>
                <option>
                  Royal Rajasthan Escape
                </option>
                <option>
                  Goa Beach Escape
                </option>
                <option>
                  Kerala Backwaters
                </option>
                <option>
                  Ladakh Adventure
                </option>
                <option>
                  Golden Triangle
                </option>
                <option>
                  Meghalaya Explorer
                </option>
              </select>

              <label>Your rating</label>

              <div className="star-select">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={
                      star <= rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() =>
                      setRating(star)
                    }
                  >
                    ★
                  </button>
                ))}

              </div>

              <label>Your review</label>

              <textarea
                rows="5"
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value)
                }
                required
              />

              {success && (
                <div className="review-success">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="review-submit"
              >
                Publish Review →
              </button>

            </form>
          ) : (
            <div className="review-login">
              <p>
                Log in to share your travel experience.
              </p>

              <button
                onClick={() => navigate("/login")}
              >
                Login →
              </button>
            </div>
          )}

        </section>

        <section className="reviews-list-section">

          <div className="reviews-list-heading">
            <span>TRAVELLER REVIEWS</span>
            <h2>What people are saying</h2>
          </div>

          <div className="reviews-grid">

            {reviews.map((review) => (

              <article
                className="review-card"
                key={review.id}
              >

                <div className="review-top">

                  <div className="review-avatar">
                    {review.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.date}</small>
                  </div>

                </div>

                <div className="review-stars">
                  {"★".repeat(review.rating)}
                  <span>
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>

                <div className="review-package">
                  {review.package}
                </div>

                <p>{review.text}</p>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Reviews;