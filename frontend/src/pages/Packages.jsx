import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Packages.css";

const packages = [
  {
    id: 1,
    title: "Royal Rajasthan Escape",
    location: "Jaipur • Udaipur • Jodhpur",
    image: "/photos/picture6.png",
    duration: "6 Days / 5 Nights",
    price: 18999,
    category: "Comfort",
    rating: 4.8,
    description:
      "Explore royal palaces, beautiful lakes, historic forts and the timeless charm of Rajasthan."
  },
  {
    id: 2,
    title: "Goa Beach Escape",
    location: "North Goa • South Goa",
    image: "/photos/picture2.jpg",
    duration: "4 Days / 3 Nights",
    price: 12999,
    category: "Value",
    rating: 4.7,
    description:
      "Relax on golden beaches and experience Goa's vibrant coastal culture."
  },
  {
    id: 3,
    title: "Kerala Backwaters",
    location: "Kochi • Munnar • Alleppey",
    image: "/photos/picture3.jpg",
    duration: "5 Days / 4 Nights",
    price: 22999,
    category: "Comfort",
    rating: 4.9,
    description:
      "Discover peaceful backwaters, misty hills, tea gardens and unforgettable Kerala landscapes."
  },
  {
    id: 4,
    title: "Ladakh Adventure",
    location: "Leh • Nubra • Pangong",
    image: "/photos/picture4.jpg",
    duration: "7 Days / 6 Nights",
    price: 34999,
    category: "Premium",
    rating: 4.9,
    description:
      "Travel through dramatic Himalayan landscapes and experience an unforgettable mountain adventure."
  },
  {
    id: 5,
    title: "Golden Triangle",
    location: "Delhi • Agra • Jaipur",
    image: "/photos/picture1.jpg",
    duration: "5 Days / 4 Nights",
    price: 15999,
    category: "Comfort",
    rating: 4.6,
    description:
      "Experience India's historic capital, the Taj Mahal and magnificent Jaipur."
  },
  {
    id: 6,
    title: "Meghalaya Explorer",
    location: "Shillong • Cherrapunji • Dawki",
    image: "/photos/picture4.jpg",
    duration: "6 Days / 5 Nights",
    price: 29999,
    category: "Premium",
    rating: 4.8,
    description:
      "Discover waterfalls, living root bridges, mountains and crystal-clear rivers."
  },
  {
    id: 7,
    title: "Udaipur Luxury Retreat",
    location: "Udaipur, Rajasthan",
    image: "/photos/picture6.png",
    duration: "4 Days / 3 Nights",
    price: 64999,
    category: "Luxury",
    rating: 4.9,
    description:
      "A refined getaway through lakes, palaces, heritage stays and royal experiences."
  },
  {
    id: 8,
    title: "Himalayan Escape",
    location: "Himachal Pradesh",
    image: "/photos/picture4.jpg",
    duration: "7 Days / 6 Nights",
    price: 45999,
    category: "Luxury",
    rating: 4.8,
    description:
      "A premium mountain escape surrounded by scenic valleys and Himalayan views."
  }
];

function Packages() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");

  const loggedIn =
    localStorage.getItem("exploreIndiaLoggedIn") === "true";

  const fullName =
    localStorage.getItem("exploreIndiaName") || "Laxmi";

  const firstName = fullName.split(" ")[0];

  const filteredPackages = useMemo(() => {
    let result = packages.filter((item) => {
      const text = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(text) ||
        item.location.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const logout = () => {
    localStorage.removeItem("exploreIndiaLoggedIn");
    localStorage.removeItem("exploreIndiaName");
    localStorage.removeItem("exploreIndiaUser");
    localStorage.removeItem("exploreIndiaPhone");

    navigate("/");
    window.location.reload();
  };

  const bookPackage = (pkg) => {
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    navigate("/booking");
  };

  return (
    <div className="packages-page">

      <nav className="packages-navbar">

        <Link to="/" className="packages-logo">
          Explore<span>India</span>
        </Link>

        <div className="packages-nav-links">
          <Link to="/">Home</Link>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours" className="active">Tours</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="packages-account">

          {loggedIn ? (
            <details className="account-details">
              <summary>
                Hello, {firstName}
                <span className="account-arrow">⌄</span>
              </summary>

              <div className="account-dropdown">

                <div className="account-user">
                  <strong>{fullName}</strong>
                  <small>
                    {localStorage.getItem("exploreIndiaUser") || ""}
                  </small>
                </div>

                <Link to="/my-bookings">
                  My Bookings
                </Link>

                <Link to="/reviews">
                  My Reviews
                </Link>

                <Link to="/profile">
                  Account Settings
                </Link>

                <button onClick={logout}>
                  Sign Out
                </button>

              </div>
            </details>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-button">
                Sign Up
              </Link>
            </>
          )}

        </div>
      </nav>

      <section className="packages-hero">

        <div className="packages-hero-overlay"></div>

        <div className="packages-hero-content">

          <span>CURATED INDIA</span>

          <h1>Journeys Worth Taking</h1>

          <p>
            Discover carefully designed experiences across India's most
            beautiful destinations.
          </p>

        </div>

      </section>

      <section className="packages-search-wrapper">

        <div className="packages-search">

          <div className="search-field">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search destination or experience"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Packages</option>
            <option value="Value">Value</option>
            <option value="Comfort">Comfort</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

        </div>

      </section>

      <main className="packages-main">

        <div className="packages-heading">

          <div>
            <span>EXPLORE INDIA</span>
            <h2>Find your next journey</h2>
          </div>

          <p>
            {filteredPackages.length} experiences
          </p>

        </div>

        <div className="packages-grid">

          {filteredPackages.map((pkg) => (

            <article
              className="package-card"
              key={pkg.id}
            >

              <div className="package-card-image">

                <img
                  src={pkg.image}
                  alt={pkg.title}
                />

                <div className="package-badge">
                  {pkg.category}
                </div>

                <div className="package-rating">
                  ★ {pkg.rating}
                </div>

              </div>

              <div className="package-card-content">

                <div className="package-location">
                  {pkg.location}
                </div>

                <h3>{pkg.title}</h3>

                <p>
                  {pkg.description}
                </p>

                <div className="package-meta">

                  <span>
                    ◷ {pkg.duration}
                  </span>

                  <span>
                    ✓ Curated
                  </span>

                </div>

                <div className="package-footer">

                  <div className="package-price">

                    <small>
                      Starting from
                    </small>

                    <strong>
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </strong>

                    <span>
                      per person
                    </span>

                  </div>

                  <button
                    onClick={() => bookPackage(pkg)}
                  >
                    Book Now
                    <span>→</span>
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

        {filteredPackages.length === 0 && (
          <div className="no-results">
            <h3>No journeys found</h3>
            <p>Try another destination or package type.</p>
          </div>
        )}

      </main>

      <footer className="packages-footer">

        <div>
          <h3>ExploreIndia</h3>
          <p>
            Thoughtfully designed journeys across India.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/buses">Buses</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/restaurants">Restaurants</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </footer>

    </div>
  );
}

export default Packages;