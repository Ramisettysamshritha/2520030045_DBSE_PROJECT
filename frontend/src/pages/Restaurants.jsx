import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Restaurants.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Route",
    city: "Jaipur",
    state: "Rajasthan",
    cuisine: "North Indian",
    price: 550,
    tier: "Value",
    rating: 4.5,
    reviews: 624,
    image: "/photos/image9.jpg",
    features: ["Outdoor Seating", "Family Dining", "Veg Options"],
  },
  {
    id: 2,
    name: "The Royal Thali",
    city: "Udaipur",
    state: "Rajasthan",
    cuisine: "Rajasthani",
    price: 950,
    tier: "Comfort",
    rating: 4.8,
    reviews: 810,
    image: "/photos/image12.jpg",
    features: ["Traditional", "Lake View", "Live Music"],
  },
  {
    id: 3,
    name: "Beachside Kitchen",
    city: "Goa",
    state: "Goa",
    cuisine: "Seafood",
    price: 1450,
    tier: "Premium",
    rating: 4.7,
    reviews: 920,
    image: "/photos/image7.jpg",
    features: ["Beach View", "Seafood", "Outdoor Seating"],
  },
  {
    id: 4,
    name: "Kerala Spice House",
    city: "Kochi",
    state: "Kerala",
    cuisine: "South Indian",
    price: 700,
    tier: "Comfort",
    rating: 4.6,
    reviews: 560,
    image: "/photos/image11.jpg",
    features: ["Authentic Kerala", "Veg Options", "Family Dining"],
  },
  {
    id: 5,
    name: "The Grand Palace Dining",
    city: "Jaipur",
    state: "Rajasthan",
    cuisine: "Multi-Cuisine",
    price: 2800,
    tier: "Luxury",
    rating: 4.9,
    reviews: 430,
    image: "/photos/image13.jpg",
    features: ["Fine Dining", "Live Music", "Private Dining"],
  },
  {
    id: 6,
    name: "Goan Sunset Terrace",
    city: "Panaji",
    state: "Goa",
    cuisine: "Continental",
    price: 1150,
    tier: "Comfort",
    rating: 4.6,
    reviews: 715,
    image: "/photos/image8.jpg",
    features: ["Sunset View", "Cocktails", "Outdoor Seating"],
  },
  {
    id: 7,
    name: "Backwater Bistro",
    city: "Alleppey",
    state: "Kerala",
    cuisine: "Kerala Cuisine",
    price: 1750,
    tier: "Premium",
    rating: 4.8,
    reviews: 380,
    image: "/photos/image14.jpg",
    features: ["Backwater View", "Local Cuisine", "Romantic"],
  },
  {
    id: 8,
    name: "Mountain Feast",
    city: "Leh",
    state: "Ladakh",
    cuisine: "Tibetan",
    price: 500,
    tier: "Value",
    rating: 4.5,
    reviews: 295,
    image: "/photos/image15.jpg",
    features: ["Local Food", "Mountain View", "Vegetarian"],
  },
  {
    id: 9,
    name: "Heritage Kitchen",
    city: "Agra",
    state: "Uttar Pradesh",
    cuisine: "Mughlai",
    price: 1350,
    tier: "Premium",
    rating: 4.7,
    reviews: 510,
    image: "/photos/image16.jpg",
    features: ["Mughlai", "Family Dining", "Heritage Ambience"],
  },
  {
    id: 10,
    name: "Pink City Café",
    city: "Jaipur",
    state: "Rajasthan",
    cuisine: "Café",
    price: 350,
    tier: "Value",
    rating: 4.3,
    reviews: 440,
    image: "/photos/image17.jpg",
    features: ["Coffee", "Desserts", "Wi-Fi"],
  },
];

const popularPlaces = [
  { name: "Goa", image: "/photos/picture2.jpg" },
  { name: "Kerala", image: "/photos/picture3.jpg" },
  { name: "Jaipur", image: "/photos/picture5.png" },
  { name: "Udaipur", image: "/photos/picture6.png" },
];

function Restaurants() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("Recommended");

  /* ================================
     ACCOUNT STATE
  ================================= */

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

  /* ================================
     FILTERING
  ================================= */

  const filteredRestaurants = useMemo(() => {
    let result = restaurants.filter((restaurant) => {
      const text = `
        ${restaurant.name}
        ${restaurant.city}
        ${restaurant.state}
        ${restaurant.cuisine}
      `.toLowerCase();

      const searchMatch =
        !search || text.includes(search.toLowerCase());

      const destinationMatch =
        !destination ||
        restaurant.city
          .toLowerCase()
          .includes(destination.toLowerCase()) ||
        restaurant.state
          .toLowerCase()
          .includes(destination.toLowerCase());

      const tierMatch =
        tier === "All" || restaurant.tier === tier;

      const cuisineMatch =
        cuisine === "All" || restaurant.cuisine === cuisine;

      const ratingMatch =
        rating === "All" ||
        restaurant.rating >= Number(rating);

      return (
        searchMatch &&
        destinationMatch &&
        tierMatch &&
        cuisineMatch &&
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
    cuisine,
    rating,
    sort,
  ]);

  const handleSearch = () => {
    setSearch(destination);

    document
      .getElementById("restaurant-results")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="restaurants-page">

      {/* NAVBAR */}
      <nav className="restaurant-navbar">

        <Link to="/" className="restaurant-logo">
          ExploreIndia
        </Link>

        <div className="restaurant-nav-links">
          <Link to="/">Home</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>

          <Link
            to="/restaurants"
            className="active"
          >
            Restaurants
          </Link>

          <Link to="/contact">Contact</Link>
        </div>

        {/* ACCOUNT */}
        <div className="restaurant-account-wrapper">

          {!loggedIn ? (

            <Link
              to="/login"
              className="restaurant-account"
            >
              ♙ &nbsp; Sign In
            </Link>

          ) : (

            <div className="restaurant-account-container">

              <button
                className="restaurant-account logged-account"
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
              >
                ♙ &nbsp; Hello, {firstName}
                <span className="restaurant-account-arrow">
                  {accountOpen ? "▲" : "▼"}
                </span>
              </button>

              {accountOpen && (

                <div className="restaurant-account-dropdown">

                  <div className="account-header">

                    <div className="account-avatar">
                      {firstName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{userName}</strong>

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
      <section className="restaurant-hero">

        <div className="restaurant-hero-overlay"></div>

        <div className="restaurant-hero-content">

          <span className="restaurant-eyebrow">
            TASTE THE JOURNEY
          </span>

          <h1>
            Discover India's Finest Tables
          </h1>

          <p>
            From local favourites to unforgettable fine dining,
            find a table worth travelling for.
          </p>

          {/* SEARCH */}
          <div className="restaurant-search">

            <div className="restaurant-field">
              <span>⌖</span>

              <div>
                <label>DESTINATION</label>

                <input
                  placeholder="Where are you dining?"
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="restaurant-field">

              <span>▣</span>

              <div>
                <label>DATE</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="restaurant-field">

              <span>♙</span>

              <div>
                <label>GUESTS</label>

                <select
                  value={guests}
                  onChange={(e) =>
                    setGuests(e.target.value)
                  }
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5 Guests</option>
                  <option>6+ Guests</option>
                </select>
              </div>

            </div>

            <button onClick={handleSearch}>
              Find Restaurants
            </button>

          </div>

        </div>

      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="restaurant-destinations">

        <div className="restaurant-section-heading">

          <div>
            <span>EXPLORE BY DESTINATION</span>
            <h2>Where Will You Eat?</h2>
          </div>

          <p>
            Discover the flavours that make every destination special.
          </p>

        </div>

        <div className="restaurant-destination-grid">

          {popularPlaces.map((place) => (

            <button
              key={place.name}
              className="restaurant-destination-card"
              style={{
                backgroundImage: `url(${place.image})`,
              }}
              onClick={() => {
                setDestination(place.name);
                setSearch(place.name);
              }}
            >

              <div className="restaurant-destination-overlay"></div>

              <div className="restaurant-destination-text">

                <small>DINING IN</small>

                <strong>{place.name}</strong>

                <span>
                  Explore restaurants →
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* RESULTS */}
      <section
        className="restaurant-results"
        id="restaurant-results"
      >

        <div className="restaurant-results-heading">

          <div>

            <span>CURATED DINING</span>

            <h2>
              {destination
                ? `Restaurants in ${destination}`
                : "Recommended Restaurants"}
            </h2>

            <p>
              {filteredRestaurants.length} restaurants available
            </p>

          </div>

          <div className="restaurant-sort">

            <label>Sort by</label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option>Recommended</option>
              <option>Price Low</option>
              <option>Price High</option>
              <option>Rating</option>
            </select>

          </div>

        </div>

        <div className="restaurant-layout">

          {/* FILTERS */}
          <aside className="restaurant-filters">

            <div className="restaurant-filter-top">

              <h3>Filters</h3>

              <button
                onClick={() => {
                  setDestination("");
                  setSearch("");
                  setTier("All");
                  setCuisine("All");
                  setRating("All");
                }}
              >
                Clear all
              </button>

            </div>

            <div className="restaurant-filter-group">

              <h4>Dining Category</h4>

              {[
                "All",
                "Value",
                "Comfort",
                "Premium",
                "Luxury",
              ].map((item) => (

                <label
                  className="restaurant-filter-option"
                  key={item}
                >

                  <input
                    type="radio"
                    name="restaurant-tier"
                    checked={tier === item}
                    onChange={() =>
                      setTier(item)
                    }
                  />

                  <span>{item}</span>

                  {item !== "All" && (
                    <small>
                      {item === "Value" &&
                        "₹300–₹600"}

                      {item === "Comfort" &&
                        "₹600–₹1.2k"}

                      {item === "Premium" &&
                        "₹1.2k–₹2.5k"}

                      {item === "Luxury" &&
                        "₹2.5k+"}
                    </small>
                  )}

                </label>

              ))}

            </div>

            <div className="restaurant-filter-group">

              <h4>Cuisine</h4>

              <select
                className="cuisine-select"
                value={cuisine}
                onChange={(e) =>
                  setCuisine(e.target.value)
                }
              >
                <option>All</option>
                <option>North Indian</option>
                <option>Rajasthani</option>
                <option>Seafood</option>
                <option>South Indian</option>
                <option>Multi-Cuisine</option>
                <option>Continental</option>
                <option>Kerala Cuisine</option>
                <option>Tibetan</option>
                <option>Mughlai</option>
                <option>Café</option>
              </select>

            </div>

            <div className="restaurant-filter-group">

              <h4>Guest Rating</h4>

              {["All", "4.5", "4.0"].map((item) => (

                <label
                  className="restaurant-filter-option"
                  key={item}
                >

                  <input
                    type="radio"
                    name="restaurant-rating"
                    checked={rating === item}
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

            <div className="restaurant-note">

              <strong>
                ✦ ExploreIndia Dining
              </strong>

              <p>
                Discover restaurants selected for food,
                ambience, location and traveller experience.
              </p>

            </div>

          </aside>

          {/* RESTAURANT LIST */}
          <main className="restaurant-list">

            {filteredRestaurants.length === 0 ? (

              <div className="restaurant-empty">

                <div>⌂</div>

                <h3>No restaurants found</h3>

                <p>
                  Try another destination or change your filters.
                </p>

                <button
                  onClick={() => {
                    setDestination("");
                    setSearch("");
                    setTier("All");
                    setCuisine("All");
                    setRating("All");
                  }}
                >
                  Show all restaurants
                </button>

              </div>

            ) : (

              filteredRestaurants.map((restaurant) => (

                <article
                  className="restaurant-card"
                  key={restaurant.id}
                >

                  <div
                    className="restaurant-image"
                    style={{
                      backgroundImage:
                        `url(${restaurant.image})`,
                    }}
                  >

                    <span
                      className={`restaurant-tier ${restaurant.tier.toLowerCase()}`}
                    >
                      {restaurant.tier}
                    </span>

                    <button className="restaurant-heart">
                      ♡
                    </button>

                  </div>

                  <div className="restaurant-info">

                    <div className="restaurant-main">

                      <div className="restaurant-title-row">

                        <div>

                          <span className="restaurant-cuisine">
                            {restaurant.cuisine}
                          </span>

                          <h3>
                            {restaurant.name}
                          </h3>

                          <p className="restaurant-location">
                            ⌖ {restaurant.city},{" "}
                            {restaurant.state}
                          </p>

                        </div>

                        <div className="restaurant-rating">

                          <strong>
                            {restaurant.rating}
                          </strong>

                          <span>★</span>

                          <small>
                            {restaurant.reviews} reviews
                          </small>

                        </div>

                      </div>

                      <div className="restaurant-features">

                        {restaurant.features.map(
                          (feature) => (
                            <span key={feature}>
                              ✓ {feature}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                    <div className="restaurant-price">

                      <small>
                        Average for two
                      </small>

                      <strong>
                        ₹{restaurant.price.toLocaleString("en-IN")}
                      </strong>

                      <span>
                        approx. for 2 people
                      </span>

                      <p>
                        Taxes may apply
                      </p>

                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="restaurant-book-button"
                      >
                        View Menu
                        <span>→</span>
                      </Link>

                    </div>

                  </div>

                </article>

              ))

            )}

          </main>

        </div>

      </section>

      {/* WHY SECTION */}
      <section className="restaurant-benefits">

        <div className="restaurant-benefits-heading">

          <span>
            THE EXPLOREINDIA DIFFERENCE
          </span>

          <h2>
            Make Every Meal Part of the Journey
          </h2>

        </div>

        <div className="restaurant-benefits-grid">

          <div>
            <span>✦</span>

            <h3>Curated Tables</h3>

            <p>
              Discover memorable restaurants selected for
              food, atmosphere and experience.
            </p>
          </div>

          <div>
            <span>₹</span>

            <h3>Clear Pricing</h3>

            <p>
              Know the approximate dining cost before
              choosing where to eat.
            </p>
          </div>

          <div>
            <span>★</span>

            <h3>Real Experiences</h3>

            <p>
              Use ratings and traveller reviews to make
              confident dining choices.
            </p>
          </div>

          <div>
            <span>♙</span>

            <h3>Easy Reservations</h3>

            <p>
              Find your table, choose your time and
              reserve your dining experience.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="restaurant-footer">

        <div className="restaurant-footer-logo">
          ExploreIndia
        </div>

        <p>
          Discover India. Taste every moment.
        </p>

        <div className="restaurant-footer-links">

          <Link to="/">Home</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
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

export default Restaurants;