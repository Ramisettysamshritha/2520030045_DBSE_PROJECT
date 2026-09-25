import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Tours.css";

const packages = [
  {
    id: 1,
    title: "Royal Rajasthan Escape",
    location: "Jaipur • Udaipur • Jodhpur",
    destination: "Rajasthan",
    duration: "6 Days / 5 Nights",
    price: 42000,
    tier: "Premium",
    rating: 4.9,
    reviews: 842,
    image: "/photos/picture5.png",
    highlights: ["Hotels", "Breakfast", "Sightseeing", "Transfers"],
  },
  {
    id: 2,
    title: "Romantic Udaipur Retreat",
    location: "Udaipur, Rajasthan",
    destination: "Rajasthan",
    duration: "4 Days / 3 Nights",
    price: 18500,
    tier: "Comfort",
    rating: 4.8,
    reviews: 615,
    image: "/photos/picture6.png",
    highlights: ["Hotel", "Breakfast", "Lake Tour", "Transfers"],
  },
  {
    id: 3,
    title: "Goa Beach Getaway",
    location: "North Goa • South Goa",
    destination: "Goa",
    duration: "5 Days / 4 Nights",
    price: 28500,
    tier: "Comfort",
    rating: 4.7,
    reviews: 921,
    image: "/photos/picture2.jpg",
    highlights: ["Beach Resort", "Breakfast", "Transfers", "Activities"],
  },
  {
    id: 4,
    title: "Kerala Backwater Journey",
    location: "Kochi • Alleppey • Munnar",
    destination: "Kerala",
    duration: "6 Days / 5 Nights",
    price: 36500,
    tier: "Premium",
    rating: 4.9,
    reviews: 738,
    image: "/photos/picture3.jpg",
    highlights: ["Houseboat", "Hotels", "Meals", "Sightseeing"],
  },
  {
    id: 5,
    title: "Ladakh Himalayan Adventure",
    location: "Leh • Nubra • Pangong",
    destination: "Ladakh",
    duration: "7 Days / 6 Nights",
    price: 62000,
    tier: "Luxury",
    rating: 4.8,
    reviews: 486,
    image: "/photos/picture4.jpg",
    highlights: ["Hotels", "Transfers", "Permits", "Sightseeing"],
  },
  {
    id: 6,
    title: "Golden Triangle India",
    location: "Delhi • Agra • Jaipur",
    destination: "Agra",
    duration: "5 Days / 4 Nights",
    price: 14500,
    tier: "Value",
    rating: 4.6,
    reviews: 1105,
    image: "/photos/picture1.jpg",
    highlights: ["Hotels", "Breakfast", "Transfers", "Guided Tours"],
  },
  {
    id: 7,
    title: "Luxury Kerala Experience",
    location: "Munnar • Thekkady • Alleppey",
    destination: "Kerala",
    duration: "8 Days / 7 Nights",
    price: 78000,
    tier: "Luxury",
    rating: 5.0,
    reviews: 329,
    image: "/photos/picture3.jpg",
    highlights: ["Luxury Hotels", "Houseboat", "Meals", "Private Car"],
  },
  {
    id: 8,
    title: "Goa Weekend Escape",
    location: "Panaji • Calangute",
    destination: "Goa",
    duration: "3 Days / 2 Nights",
    price: 11000,
    tier: "Value",
    rating: 4.5,
    reviews: 570,
    image: "/photos/picture2.jpg",
    highlights: ["Hotel", "Breakfast", "Transfers", "Beach Visit"],
  },
];

const destinations = [
  { name: "Rajasthan", image: "/photos/picture5.png" },
  { name: "Goa", image: "/photos/picture2.jpg" },
  { name: "Kerala", image: "/photos/picture3.jpg" },
  { name: "Ladakh", image: "/photos/picture4.jpg" },
];

function Tours() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travellers, setTravellers] = useState("2 Travellers");

  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");
  const [duration, setDuration] = useState("All");
  const [sort, setSort] = useState("Recommended");

  /* =========================================
     ACCOUNT
  ========================================= */

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("exploreIndiaLoggedIn") === "true";

    const storedName =
      localStorage.getItem("exploreIndiaName") || "";

    setLoggedIn(isLoggedIn);
    setUserName(storedName);
  }, []);

  const firstName =
    userName.trim().split(" ")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("exploreIndiaLoggedIn");
    localStorage.removeItem("exploreIndiaName");
    localStorage.removeItem("exploreIndiaUser");
    localStorage.removeItem("exploreIndiaPhone");

    setLoggedIn(false);
    setUserName("");
    setAccountOpen(false);

    navigate("/");
    window.location.reload();
  };

  /* =========================================
     FILTERING
  ========================================= */

  const filteredPackages = useMemo(() => {
    let result = packages.filter((item) => {
      const text =
        `${item.title} ${item.location} ${item.destination}`.toLowerCase();

      const searchMatch =
        !search ||
        text.includes(search.toLowerCase());

      const destinationMatch =
        !destination ||
        item.destination
          .toLowerCase()
          .includes(destination.toLowerCase()) ||
        item.location
          .toLowerCase()
          .includes(destination.toLowerCase());

      const tierMatch =
        tier === "All" || item.tier === tier;

      let durationMatch = true;

      if (duration === "Short") {
        durationMatch = parseInt(item.duration) <= 4;
      }

      if (duration === "Medium") {
        durationMatch =
          parseInt(item.duration) >= 5 &&
          parseInt(item.duration) <= 6;
      }

      if (duration === "Long") {
        durationMatch =
          parseInt(item.duration) >= 7;
      }

      return (
        searchMatch &&
        destinationMatch &&
        tierMatch &&
        durationMatch
      );
    });

    if (sort === "Price Low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price High") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    search,
    destination,
    tier,
    duration,
    sort,
  ]);

  const searchPackages = () => {
    setSearch(destination);

    document
      .getElementById("package-results")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="tours-page">

      {/* NAVBAR */}
      <nav className="tours-navbar">

        <Link
          to="/"
          className="tours-logo"
        >
          ExploreIndia
        </Link>

        <div className="tours-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/buses">
            Buses
          </Link>

          <Link to="/hotels">
            Hotels
          </Link>

          <Link
            to="/tours"
            className="active"
          >
            Tours
          </Link>

          <Link to="/restaurants">
            Restaurants
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

        {/* ACCOUNT */}
        <div className="tours-account-wrapper">

          {!loggedIn ? (

            <Link
              to="/login"
              className="tours-account"
            >
              ♙ &nbsp; Sign In
            </Link>

          ) : (

            <div className="tours-account-container">

              <button
                className="tours-account logged-account"
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
              >
                ♙ &nbsp; Hello, {firstName}

                <span className="tours-account-arrow">
                  {accountOpen ? "▲" : "▼"}
                </span>

              </button>

              {accountOpen && (

                <div className="tours-account-dropdown">

                  <div className="account-header">

                    <div className="account-avatar">
                      {firstName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <strong>
                        {userName}
                      </strong>

                      <small>
                        {localStorage.getItem(
                          "exploreIndiaUser"
                        ) || "ExploreIndia account"}
                      </small>

                    </div>

                  </div>

                  <div className="account-divider"></div>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                  >
                    My Bookings
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                  >
                    My Reviews
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                  >
                    Account Settings
                  </Link>

                  <div className="account-divider"></div>

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="tours-hero">

        <div className="tours-overlay"></div>

        <div className="tours-hero-content">

          <span className="tours-eyebrow">
            CURATED JOURNEYS • INCREDIBLE INDIA
          </span>

          <h1>
            Travel More. Discover More.
          </h1>

          <p>
            Beautifully planned journeys, unforgettable experiences
            and everything you need in one trip.
          </p>

          <div className="tour-search">

            <div className="tour-field">

              <span>⌖</span>

              <div>

                <label>
                  DESTINATION
                </label>

                <input
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="tour-field">

              <span>▣</span>

              <div>

                <label>
                  TRAVEL DATES
                </label>

                <input
                  type="date"
                  value={dates}
                  onChange={(e) =>
                    setDates(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="tour-field">

              <span>♙</span>

              <div>

                <label>
                  TRAVELLERS
                </label>

                <select
                  value={travellers}
                  onChange={(e) =>
                    setTravellers(e.target.value)
                  }
                >
                  <option>
                    1 Traveller
                  </option>

                  <option>
                    2 Travellers
                  </option>

                  <option>
                    3 Travellers
                  </option>

                  <option>
                    4 Travellers
                  </option>

                  <option>
                    5 Travellers
                  </option>

                  <option>
                    6+ Travellers
                  </option>

                </select>

              </div>

            </div>

            <button onClick={searchPackages}>
              Search Trips
            </button>

          </div>

        </div>

      </section>

      {/* DESTINATIONS */}
      <section className="tour-destinations">

        <div className="tour-section-heading">

          <div>

            <span>
              WHERE WILL YOU GO?
            </span>

            <h2>
              Explore India's Best
            </h2>

          </div>

          <p>
            From royal palaces to tropical beaches and Himalayan adventures.
          </p>

        </div>

        <div className="tour-destination-grid">

          {destinations.map((item) => (

            <button
              key={item.name}
              className="tour-destination-card"
              style={{
                backgroundImage:
                  `url(${item.image})`,
              }}
              onClick={() => {
                setDestination(item.name);
                setSearch(item.name);
              }}
            >

              <div className="tour-destination-overlay"></div>

              <div className="tour-destination-text">

                <small>
                  TRAVEL TO
                </small>

                <strong>
                  {item.name}
                </strong>

                <span>
                  Explore packages →
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* PACKAGES */}
      <section
        className="package-section"
        id="package-results"
      >

        <div className="package-heading">

          <div>

            <span>
              HANDPICKED FOR YOU
            </span>

            <h2>
              {destination
                ? `Trips to ${destination}`
                : "Popular Travel Packages"}
            </h2>

            <p>
              {filteredPackages.length} curated journeys available
            </p>

          </div>

          <div className="package-sort">

            <label>
              Sort by
            </label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option>
                Recommended
              </option>

              <option>
                Price Low
              </option>

              <option>
                Price High
              </option>

              <option>
                Rating
              </option>

            </select>

          </div>

        </div>

        <div className="package-layout">

          {/* FILTERS */}
          <aside className="package-filters">

            <div className="filter-top">

              <h3>
                Filters
              </h3>

              <button
                onClick={() => {
                  setDestination("");
                  setSearch("");
                  setTier("All");
                  setDuration("All");
                }}
              >
                Clear all
              </button>

            </div>

            <div className="package-filter-group">

              <h4>
                Package Category
              </h4>

              {[
                "All",
                "Value",
                "Comfort",
                "Premium",
                "Luxury",
              ].map((item) => (

                <label
                  key={item}
                  className="package-filter-option"
                >

                  <input
                    type="radio"
                    name="package-tier"
                    checked={tier === item}
                    onChange={() =>
                      setTier(item)
                    }
                  />

                  <span>
                    {item}
                  </span>

                  {item !== "All" && (

                    <small>

                      {item === "Value" &&
                        "₹8k–₹15k"}

                      {item === "Comfort" &&
                        "₹15k–₹30k"}

                      {item === "Premium" &&
                        "₹30k–₹60k"}

                      {item === "Luxury" &&
                        "₹60k+"}

                    </small>

                  )}

                </label>

              ))}

            </div>

            <div className="package-filter-group">

              <h4>
                Trip Duration
              </h4>

              {[
                ["All", "Any duration"],
                ["Short", "1–4 days"],
                ["Medium", "5–6 days"],
                ["Long", "7+ days"],
              ].map(([value, label]) => (

                <label
                  key={value}
                  className="package-filter-option"
                >

                  <input
                    type="radio"
                    name="duration"
                    checked={duration === value}
                    onChange={() =>
                      setDuration(value)
                    }
                  />

                  <span>
                    {label}
                  </span>

                </label>

              ))}

            </div>

            <div className="package-filter-note">

              <strong>
                ✦ ExploreIndia Curated
              </strong>

              <p>
                Every package combines stays, experiences and
                transportation for a smoother journey.
              </p>

            </div>

          </aside>

          {/* PACKAGE CARDS */}
          <main className="package-list">

            {filteredPackages.length === 0 ? (

              <div className="no-packages">

                <div>
                  ⌂
                </div>

                <h3>
                  No trips found
                </h3>

                <p>
                  Try another destination or change your filters.
                </p>

                <button
                  onClick={() => {
                    setDestination("");
                    setSearch("");
                    setTier("All");
                    setDuration("All");
                  }}
                >
                  View all packages
                </button>

              </div>

            ) : (

              filteredPackages.map((item) => (

                <article
                  className="package-card"
                  key={item.id}
                >

                  <div
                    className="package-image"
                    style={{
                      backgroundImage:
                        `url(${item.image})`,
                    }}
                  >

                    <span
                      className={`package-tier ${item.tier.toLowerCase()}`}
                    >
                      {item.tier}
                    </span>

                    <button className="package-heart">
                      ♡
                    </button>

                  </div>

                  <div className="package-details">

                    <div className="package-main">

                      <div className="package-title-row">

                        <div>

                          <span className="package-label">
                            {item.duration}
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                          <p className="package-location">
                            ⌖ {item.location}
                          </p>

                        </div>

                        <div className="package-rating">

                          <strong>
                            {item.rating}
                          </strong>

                          <span>
                            ★
                          </span>

                          <small>
                            {item.reviews} reviews
                          </small>

                        </div>

                      </div>

                      <div className="package-highlights">

                        {item.highlights.map(
                          (highlight) => (

                            <span key={highlight}>
                              ✓ {highlight}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    <div className="package-price">

                      <small>
                        Starting from
                      </small>

                      <strong>
                        ₹{item.price.toLocaleString("en-IN")}
                      </strong>

                      <span>
                        per person
                      </span>

                      <p>
                        Taxes included
                      </p>

                      <button
  type="button"
  className="itinerary-button"
  onClick={() => {
    setDestination(item.destination);
    setSearch(item.destination);

    setTimeout(() => {
      document
        .getElementById("package-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }}
>
  View Itinerary
  <span>→</span>
</button>

                    </div>

                  </div>

                </article>

              ))

            )}

          </main>

        </div>

      </section>

      {/* EXPERIENCE */}
      <section className="tour-experience">

        <div className="experience-heading">

          <span>
            PLAN WITHOUT THE STRESS
          </span>

          <h2>
            Your Journey, Thoughtfully Planned
          </h2>

        </div>

        <div className="experience-grid">

          <div>

            <span>
              01
            </span>

            <h3>
              Curated Itineraries
            </h3>

            <p>
              Carefully planned routes help you experience more
              without worrying about every little detail.
            </p>

          </div>

          <div>

            <span>
              02
            </span>

            <h3>
              Flexible Choices
            </h3>

            <p>
              Choose packages across Value, Comfort, Premium and
              Luxury categories.
            </p>

          </div>

          <div>

            <span>
              03
            </span>

            <h3>
              One Seamless Booking
            </h3>

            <p>
              Manage accommodation, transport and experiences
              together through one travel platform.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="tour-footer">

        <div className="tour-footer-logo">
          ExploreIndia
        </div>

        <p>
          Discover India. Your journey starts here.
        </p>

        <div className="tour-footer-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/buses">
            Buses
          </Link>

          <Link to="/hotels">
            Hotels
          </Link>

          <Link to="/tours">
            Tours
          </Link>

          <Link to="/restaurants">
            Restaurants
          </Link>

        </div>

        <small>
          © 2026 ExploreIndia. All rights reserved.
        </small>

      </footer>

    </div>
  );
}

export default Tours;