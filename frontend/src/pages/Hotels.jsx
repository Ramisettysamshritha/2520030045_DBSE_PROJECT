import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hotels.css";

const hotels = [
  {
    id: 1,
    name: "The Oberoi Udaivilas",
    city: "Udaipur",
    state: "Rajasthan",
    price: 18500,
    tier: "Luxury",
    rating: 4.9,
    reviews: 1240,
    type: "Resort",
    image: "/photos/image5.jpg",
    amenities: ["Pool", "Spa", "Breakfast", "Lake View"],
  },
  {
    id: 2,
    name: "Taj Lake Palace",
    city: "Udaipur",
    state: "Rajasthan",
    price: 14500,
    tier: "Luxury",
    rating: 4.8,
    reviews: 980,
    type: "Hotel",
    image: "/photos/picture6.png",
    amenities: ["Lake View", "Pool", "Spa", "Restaurant"],
  },
  {
    id: 3,
    name: "ITC Rajputana",
    city: "Jaipur",
    state: "Rajasthan",
    price: 7200,
    tier: "Premium",
    rating: 4.7,
    reviews: 860,
    type: "Hotel",
    image: "/photos/ITCRajputana.jpg",
    amenities: ["Pool", "Gym", "Breakfast", "Wi-Fi"],
  },
  {
    id: 4,
    name: "Hyatt Regency Goa",
    city: "Goa",
    state: "Goa",
    price: 5800,
    tier: "Premium",
    rating: 4.6,
    reviews: 740,
    type: "Resort",
    image: "/photos/HyattRegencyGoa.jpg",
    amenities: ["Beach Access", "Pool", "Breakfast", "Spa"],
  },
  {
    id: 5,
    name: "Taj Fort Aguada Resort",
    city: "Goa",
    state: "Goa",
    price: 4800,
    tier: "Comfort",
    rating: 4.5,
    reviews: 620,
    type: "Resort",
    image: "/photos/image.jpg",
    amenities: ["Beach Access", "Pool", "Restaurant", "Wi-Fi"],
  },
  {
    id: 6,
    name: "Kumarakom Lake Resort",
    city: "Kumarakom",
    state: "Kerala",
    price: 9200,
    tier: "Premium",
    rating: 4.8,
    reviews: 530,
    type: "Resort",
    image: "/photos/image1.jpg",
    amenities: ["Backwater View", "Pool", "Spa", "Breakfast"],
  },
  {
    id: 7,
    name: "The Leela Kovalam",
    city: "Kovalam",
    state: "Kerala",
    price: 12000,
    tier: "Luxury",
    rating: 4.8,
    reviews: 690,
    type: "Resort",
    image: "/photos/image2.jpg",
    amenities: ["Beach View", "Pool", "Spa", "Restaurant"],
  },
  {
    id: 8,
    name: "Radisson Blu Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    price: 3800,
    tier: "Comfort",
    rating: 4.4,
    reviews: 510,
    type: "Hotel",
    image: "/photos/picture5.png",
    amenities: ["Pool", "Gym", "Breakfast", "Wi-Fi"],
  },
  {
    id: 9,
    name: "Hotel Agra Palace",
    city: "Agra",
    state: "Uttar Pradesh",
    price: 2100,
    tier: "Value",
    rating: 4.2,
    reviews: 390,
    type: "Hotel",
    image: "/photos/image3.jpg",
    amenities: ["Wi-Fi", "Breakfast", "Parking", "Restaurant"],
  },
  {
    id: 10,
    name: "The Lalit Great Eastern",
    city: "Kolkata",
    state: "West Bengal",
    price: 4700,
    tier: "Comfort",
    rating: 4.5,
    reviews: 460,
    type: "Hotel",
    image: "/photos/image4.jpg",
    amenities: ["Gym", "Restaurant", "Breakfast", "Wi-Fi"],
  },
];

const destinations = [
  { name: "Goa", image: "/photos/picture2.jpg" },
  { name: "Kerala", image: "/photos/picture3.jpg" },
  { name: "Jaipur", image: "/photos/picture5.png" },
  { name: "Udaipur", image: "/photos/picture6.png" },
];

function Hotels() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");
  const [hotelType, setHotelType] = useState("All");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("Recommended");

  // ACCOUNT
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  // CHECK LOGIN
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("exploreIndiaLoggedIn") === "true";

    const storedName =
      localStorage.getItem("exploreIndiaName") || "";

    setLoggedIn(isLoggedIn);
    setUserName(storedName);
  }, []);

  // LOGOUT
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

  const firstName = userName
    ? userName.trim().split(" ")[0]
    : "";

  const filteredHotels = useMemo(() => {
    let result = hotels.filter((hotel) => {
      const searchMatch =
        !search ||
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase()) ||
        hotel.state.toLowerCase().includes(search.toLowerCase());

      const destinationMatch =
        !destination ||
        hotel.city
          .toLowerCase()
          .includes(destination.toLowerCase()) ||
        hotel.state
          .toLowerCase()
          .includes(destination.toLowerCase());

      const tierMatch =
        tier === "All" || hotel.tier === tier;

      const typeMatch =
        hotelType === "All" ||
        hotel.type === hotelType;

      const ratingMatch =
        rating === "All" ||
        hotel.rating >= Number(rating);

      return (
        searchMatch &&
        destinationMatch &&
        tierMatch &&
        typeMatch &&
        ratingMatch
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
    hotelType,
    rating,
    sort,
  ]);

  const handleSearch = () => {
    setSearch(destination);

    document
      .getElementById("hotel-results")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="hotels-page">

      {/* NAVBAR */}
      <nav className="hotel-navbar">

        <Link to="/" className="hotel-logo">
          ExploreIndia
        </Link>

        <div className="hotel-nav-links">
          <Link to="/">Home</Link>

          <Link to="/buses">
            Buses
          </Link>

          <Link
            to="/hotels"
            className="active"
          >
            Hotels
          </Link>

          <Link to="/tours">
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
        <div className="hotel-account-wrapper">

          {!loggedIn ? (
            <Link
              to="/login"
              className="hotel-account"
            >
              <span>♙</span> Sign In
            </Link>
          ) : (
            <div className="hotel-account-container">

              <button
                className="hotel-account logged-account"
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
              >
                <span className="account-person">
                  ♙
                </span>

                Hello, {firstName}

                <span className="account-arrow">
                  {accountOpen ? "▲" : "▼"}
                </span>
              </button>

              {accountOpen && (
                <div className="hotel-account-dropdown">

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
                        ) ||
                          "Explore India User"}
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
      <section className="hotel-hero">

        <div className="hotel-hero-overlay"></div>

        <div className="hotel-hero-content">

          <p className="hotel-eyebrow">
            STAY SOMEWHERE BEAUTIFUL
          </p>

          <h1>
            Find Your Perfect Stay
          </h1>

          <p>
            Discover handpicked hotels, resorts and unforgettable stays
            across India.
          </p>

          {/* SEARCH BOX */}
          <div className="hotel-search-box">

            <div className="hotel-search-field destination-field">
              <span className="field-icon">
                ⌖
              </span>

              <div>
                <label>
                  DESTINATION
                </label>

                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="hotel-search-field">

              <span className="field-icon">
                ▣
              </span>

              <div>
                <label>
                  CHECK-IN
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) =>
                    setCheckIn(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="hotel-search-field">

              <span className="field-icon">
                ▣
              </span>

              <div>
                <label>
                  CHECK-OUT
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) =>
                    setCheckOut(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="hotel-search-field">

              <span className="field-icon">
                ♙
              </span>

              <div>
                <label>
                  GUESTS & ROOMS
                </label>

                <select
                  value={guests}
                  onChange={(e) =>
                    setGuests(e.target.value)
                  }
                >
                  <option>
                    2 Guests, 1 Room
                  </option>

                  <option>
                    1 Guest, 1 Room
                  </option>

                  <option>
                    3 Guests, 1 Room
                  </option>

                  <option>
                    4 Guests, 2 Rooms
                  </option>

                  <option>
                    5 Guests, 2 Rooms
                  </option>

                  <option>
                    6 Guests, 3 Rooms
                  </option>
                </select>
              </div>

            </div>

            <button
              className="hotel-search-button"
              onClick={handleSearch}
            >
              Search Hotels
            </button>

          </div>

        </div>

      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="hotel-destinations">

        <div className="section-heading">

          <div>
            <span>
              EXPLORE INDIA
            </span>

            <h2>
              Popular Destinations
            </h2>
          </div>

          <p>
            Beautiful stays in India's most loved destinations.
          </p>

        </div>

        <div className="destination-cards">

          {destinations.map((item) => (

            <button
              key={item.name}
              className="destination-card"
              onClick={() => {
                setDestination(item.name);
                setSearch(item.name);
              }}
              style={{
                backgroundImage:
                  `url(${item.image})`,
              }}
            >

              <div className="destination-card-overlay"></div>

              <div className="destination-card-text">

                <small>
                  STAYS IN
                </small>

                <strong>
                  {item.name}
                </strong>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* RESULTS */}
      <section
        className="hotel-results-section"
        id="hotel-results"
      >

        <div className="results-top">

          <div>

            <span>
              EXPLORE YOUR STAY
            </span>

            <h2>
              {destination
                ? `Hotels in ${destination}`
                : "Recommended Hotels"}
            </h2>

            <p>
              {filteredHotels.length} properties available
            </p>

          </div>

          <div className="hotel-sort">

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

        <div className="hotel-content">

          {/* FILTERS */}
          <aside className="hotel-filters">

            <div className="filter-heading">

              <h3>
                Filters
              </h3>

              <button
                onClick={() => {
                  setTier("All");
                  setHotelType("All");
                  setRating("All");
                  setDestination("");
                  setSearch("");
                }}
              >
                Clear all
              </button>

            </div>

            <div className="filter-group">

              <h4>
                Stay Category
              </h4>

              {[
                "All",
                "Value",
                "Comfort",
                "Premium",
                "Luxury",
              ].map((item) => (

                <label
                  className="filter-option"
                  key={item}
                >

                  <input
                    type="radio"
                    name="tier"
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
                        "₹1k–₹2.5k"}

                      {item === "Comfort" &&
                        "₹2.5k–₹5k"}

                      {item === "Premium" &&
                        "₹5k–₹10k"}

                      {item === "Luxury" &&
                        "₹10k+"}
                    </small>
                  )}

                </label>

              ))}

            </div>

            <div className="filter-group">

              <h4>
                Property Type
              </h4>

              {[
                "All",
                "Hotel",
                "Resort",
              ].map((item) => (

                <label
                  className="filter-option"
                  key={item}
                >

                  <input
                    type="radio"
                    name="type"
                    checked={
                      hotelType === item
                    }
                    onChange={() =>
                      setHotelType(item)
                    }
                  />

                  <span>
                    {item}
                  </span>

                </label>

              ))}

            </div>

            <div className="filter-group">

              <h4>
                Guest Rating
              </h4>

              {[
                "All",
                "4.5",
                "4.0",
              ].map((item) => (

                <label
                  className="filter-option"
                  key={item}
                >

                  <input
                    type="radio"
                    name="rating"
                    checked={
                      rating === item
                    }
                    onChange={() =>
                      setRating(item)
                    }
                  />

                  <span>
                    {item === "All"
                      ? "Any rating"
                      : `${item}+ rating`}
                  </span>

                </label>

              ))}

            </div>

            <div className="filter-note">

              <strong>
                ✦ ExploreIndia Pick
              </strong>

              <p>
                Handpicked properties are selected for location,
                comfort and guest experience.
              </p>

            </div>

          </aside>

          {/* HOTEL LIST */}
          <main className="hotel-list">

            {filteredHotels.length === 0 ? (

              <div className="no-hotels">

                <div>
                  ⌂
                </div>

                <h3>
                  No hotels found
                </h3>

                <p>
                  Try changing your destination or filters.
                </p>

                <button
                  onClick={() => {
                    setDestination("");
                    setSearch("");
                    setTier("All");
                    setHotelType("All");
                    setRating("All");
                  }}
                >
                  Show all hotels
                </button>

              </div>

            ) : (

              filteredHotels.map((hotel) => (

                <article
                  className="hotel-card"
                  key={hotel.id}
                >

                  <div
                    className="hotel-image"
                    style={{
                      backgroundImage:
                        `url(${hotel.image})`,
                    }}
                  >

                    <span
                      className={`tier-badge ${hotel.tier.toLowerCase()}`}
                    >
                      {hotel.tier}
                    </span>

                    <button className="heart-button">
                      ♡
                    </button>

                  </div>

                  <div className="hotel-info">

                    <div className="hotel-main">

                      <div className="hotel-title-row">

                        <div>

                          <span className="hotel-type">
                            {hotel.type}
                          </span>

                          <h3>
                            {hotel.name}
                          </h3>

                          <p className="hotel-location">
                            ⌖ {hotel.city}, {hotel.state}
                          </p>

                        </div>

                        <div className="hotel-rating">

                          <strong>
                            {hotel.rating}
                          </strong>

                          <span>
                            ★
                          </span>

                          <small>
                            {hotel.reviews} reviews
                          </small>

                        </div>

                      </div>

                      <div className="amenities">

                        {hotel.amenities.map(
                          (amenity) => (

                            <span key={amenity}>
                              ✓ {amenity}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                    <div className="hotel-price">

                      <small>
                        Starting from
                      </small>

                      <div>

                        <strong>
                          ₹
                          {hotel.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <span>
                          /night
                        </span>

                      </div>

                      <p>
                        + taxes & fees
                      </p>

                      <Link
                        to={`/booking?hotel=${hotel.id}`}
                        className="hotel-book-button"
                      >
                        View Rooms
                        <span>
                          →
                        </span>
                      </Link>

                    </div>

                  </div>

                </article>

              ))

            )}

          </main>

        </div>

      </section>

      {/* WHY EXPLORE INDIA */}
      <section className="hotel-benefits">

        <div className="benefits-heading">

          <span>
            WHY BOOK WITH US
          </span>

          <h2>
            More Than Just a Hotel
          </h2>

        </div>

        <div className="benefits-grid">

          <div className="benefit">

            <div>
              ✦
            </div>

            <h3>
              Curated Stays
            </h3>

            <p>
              Carefully selected hotels and resorts across
              India's most beautiful destinations.
            </p>

          </div>

          <div className="benefit">

            <div>
              ₹
            </div>

            <h3>
              Transparent Pricing
            </h3>

            <p>
              See your room price clearly with no hidden
              surprises during your booking.
            </p>

          </div>

          <div className="benefit">

            <div>
              ♙
            </div>

            <h3>
              Easy Booking
            </h3>

            <p>
              Choose your room, enter traveller details and
              complete your booking in a few simple steps.
            </p>

          </div>

          <div className="benefit">

            <div>
              ★
            </div>

            <h3>
              Trusted Reviews
            </h3>

            <p>
              Make better decisions using ratings and reviews
              from fellow travellers.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="hotel-footer">

        <div className="footer-logo">
          ExploreIndia
        </div>

        <p>
          Discover India. Stay beautifully.
        </p>

        <div className="footer-links">

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

export default Hotels;