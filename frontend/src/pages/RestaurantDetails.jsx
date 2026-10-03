import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "./RestaurantDetails.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Route",
    location: "Jaipur, Rajasthan",
    cuisine: "North Indian",
    image: "/photos/image9.jpg",
    rating: 4.5,
    menu: [
      { name: "Paneer Tikka", description: "Grilled cottage cheese with Indian spices", price: 280 },
      { name: "Butter Chicken", description: "Creamy tomato-based chicken curry", price: 360 },
      { name: "Dal Makhani", description: "Slow-cooked black lentils with butter", price: 220 },
      { name: "Garlic Naan", description: "Soft naan topped with garlic and butter", price: 90 },
      { name: "Jeera Rice", description: "Fragrant basmati rice with cumin", price: 160 },
      { name: "Gulab Jamun", description: "Soft Indian milk dumplings in sugar syrup", price: 120 }
    ]
  },

  {
    id: 2,
    name: "The Royal Thali",
    location: "Udaipur, Rajasthan",
    cuisine: "Rajasthani",
    image: "/photos/image12.jpg",
    rating: 4.8,
    menu: [
      { name: "Rajasthani Thali", description: "Traditional royal platter with multiple dishes", price: 650 },
      { name: "Dal Baati Churma", description: "Classic Rajasthani specialty", price: 320 },
      { name: "Gatte Ki Sabzi", description: "Gram flour dumplings in spicy gravy", price: 240 },
      { name: "Ker Sangri", description: "Traditional desert beans and berries", price: 260 },
      { name: "Bajra Roti", description: "Traditional millet flatbread", price: 80 },
      { name: "Malpua", description: "Traditional sweet pancake with rabri", price: 180 }
    ]
  },

  {
    id: 3,
    name: "Beachside Kitchen",
    location: "Goa",
    cuisine: "Seafood",
    image: "/photos/image7.jpg",
    rating: 4.7,
    menu: [
      { name: "Goan Fish Curry", description: "Fresh fish cooked in coconut-based Goan curry", price: 420 },
      { name: "Prawn Balchao", description: "Spicy Goan prawns with tangy sauce", price: 480 },
      { name: "Grilled Fish", description: "Fresh fish grilled with herbs and spices", price: 520 },
      { name: "Chicken Cafreal", description: "Goan-style green herb chicken", price: 390 },
      { name: "Garlic Prawns", description: "Juicy prawns tossed with garlic butter", price: 450 },
      { name: "Bebinca", description: "Traditional layered Goan dessert", price: 180 }
    ]
  },

  {
    id: 4,
    name: "Kerala Spice House",
    location: "Kochi, Kerala",
    cuisine: "South Indian",
    image: "/photos/image11.jpg",
    rating: 4.6,
    menu: [
      { name: "Kerala Sadya", description: "Traditional vegetarian feast served on banana leaf", price: 420 },
      { name: "Appam & Stew", description: "Soft appam served with creamy vegetable stew", price: 280 },
      { name: "Kerala Parotta", description: "Layered flaky Kerala-style flatbread", price: 90 },
      { name: "Fish Moilee", description: "Fish cooked in creamy coconut milk", price: 380 },
      { name: "Puttu & Kadala Curry", description: "Steamed rice cake with black chickpea curry", price: 220 },
      { name: "Payasam", description: "Traditional Kerala rice pudding", price: 140 }
    ]
  },

  {
    id: 5,
    name: "The Grand Palace Dining",
    location: "Jaipur, Rajasthan",
    cuisine: "Multi-Cuisine",
    image: "/photos/image13.jpg",
    rating: 4.9,
    menu: [
      { name: "Royal Paneer Platter", description: "Selection of premium paneer preparations", price: 520 },
      { name: "Mughlai Chicken", description: "Rich Mughlai chicken with aromatic spices", price: 580 },
      { name: "Lamb Rogan Josh", description: "Slow-cooked lamb in Kashmiri spices", price: 650 },
      { name: "Royal Biryani", description: "Aromatic basmati rice with premium spices", price: 480 },
      { name: "Tandoori Platter", description: "Assorted grilled items from the tandoor", price: 620 },
      { name: "Royal Dessert Platter", description: "Selection of traditional Indian desserts", price: 280 }
    ]
  },

  {
    id: 6,
    name: "Goan Sunset Terrace",
    location: "Panaji, Goa",
    cuisine: "Continental",
    image: "/photos/image8.jpg",
    rating: 4.6,
    menu: [
      { name: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella and basil", price: 420 },
      { name: "Pasta Alfredo", description: "Creamy pasta with parmesan and herbs", price: 380 },
      { name: "Grilled Chicken", description: "Herb-marinated chicken with seasonal vegetables", price: 480 },
      { name: "Fish & Chips", description: "Crispy fish served with golden fries", price: 450 },
      { name: "Garden Salad", description: "Fresh seasonal vegetables with house dressing", price: 260 },
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten centre", price: 220 }
    ]
  },

  {
    id: 7,
    name: "Backwater Bistro",
    location: "Alleppey, Kerala",
    cuisine: "Kerala Cuisine",
    image: "/photos/image14.jpg",
    rating: 4.8,
    menu: [
      { name: "Karimeen Pollichathu", description: "Pearl spot fish wrapped in banana leaf", price: 550 },
      { name: "Kerala Fish Curry", description: "Traditional fish curry with coconut and spices", price: 390 },
      { name: "Prawn Curry", description: "Fresh prawns cooked in Kerala-style gravy", price: 460 },
      { name: "Appam", description: "Soft fermented rice pancake", price: 70 },
      { name: "Chicken Roast", description: "Kerala-style spicy roasted chicken", price: 420 },
      { name: "Tender Coconut Pudding", description: "Refreshing dessert made with tender coconut", price: 160 }
    ]
  },

  {
    id: 8,
    name: "Mountain Feast",
    location: "Leh, Ladakh",
    cuisine: "Tibetan",
    image: "/photos/image15.jpg",
    rating: 4.5,
    menu: [
      { name: "Chicken Momos", description: "Steamed dumplings filled with seasoned chicken", price: 220 },
      { name: "Veg Momos", description: "Steamed dumplings filled with fresh vegetables", price: 180 },
      { name: "Thukpa", description: "Traditional Tibetan noodle soup", price: 240 },
      { name: "Tingmo", description: "Soft steamed Tibetan bread", price: 120 },
      { name: "Skyu", description: "Traditional Ladakhi noodle stew", price: 280 },
      { name: "Butter Tea", description: "Traditional Himalayan salted tea", price: 100 }
    ]
  },

  {
    id: 9,
    name: "Heritage Kitchen",
    location: "Agra, Uttar Pradesh",
    cuisine: "Mughlai",
    image: "/photos/image16.jpg",
    rating: 4.7,
    menu: [
      { name: "Mughlai Biryani", description: "Fragrant basmati rice cooked with rich Mughlai spices", price: 420 },
      { name: "Chicken Korma", description: "Creamy chicken curry with nuts and spices", price: 450 },
      { name: "Mutton Nihari", description: "Slow-cooked mutton in aromatic gravy", price: 520 },
      { name: "Seekh Kebab", description: "Grilled minced meat skewers with spices", price: 380 },
      { name: "Butter Naan", description: "Soft tandoori naan brushed with butter", price: 80 },
      { name: "Shahi Tukda", description: "Royal bread pudding with saffron and nuts", price: 180 }
    ]
  },

  {
    id: 10,
    name: "Pink City Café",
    location: "Jaipur, Rajasthan",
    cuisine: "Café",
    image: "/photos/image17.jpg",
    rating: 4.3,
    menu: [
      { name: "Cappuccino", description: "Freshly brewed espresso with steamed milk foam", price: 180 },
      { name: "Cold Coffee", description: "Chilled creamy coffee", price: 220 },
      { name: "Paneer Sandwich", description: "Grilled sandwich filled with spiced paneer", price: 240 },
      { name: "Veg Club Sandwich", description: "Triple-layer sandwich with fresh vegetables", price: 260 },
      { name: "Chocolate Brownie", description: "Rich chocolate brownie served warm", price: 180 },
      { name: "Cheesecake", description: "Creamy cheesecake with a biscuit base", price: 280 }
    ]
  }
];

const RestaurantDetails = () => {
  const { id } = useParams();

  const restaurant = useMemo(
    () => restaurants.find((item) => item.id === Number(id)),
    [id]
  );

  if (!restaurant) {
    return (
      <div className="restaurant-details-page">
        <div className="restaurant-not-found">
          <h1>Restaurant Not Found</h1>
          <p>We couldn't find the restaurant you're looking for.</p>

          <Link to="/restaurants" className="back-button">
            ← Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-details-page">

      {/* HERO */}
      <section
        className="restaurant-details-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.45),
            rgba(0,0,0,0.7)
          ), url(${restaurant.image})`
        }}
      >
        <div className="restaurant-details-overlay">

          <Link to="/restaurants" className="back-link">
            ← Back to Restaurants
          </Link>

          <div className="restaurant-hero-content">
            <span className="restaurant-cuisine">
              {restaurant.cuisine}
            </span>

            <h1>{restaurant.name}</h1>

            <p className="restaurant-location">
              📍 {restaurant.location}
            </p>

            <div className="restaurant-rating">
              ★ {restaurant.rating}
            </div>
          </div>

        </div>
      </section>

      {/* MENU */}
      <section className="restaurant-menu-section">

        <div className="menu-heading">
          <span>EXPLORE THE MENU</span>
          <h2>{restaurant.name}</h2>
          <p>
            Discover the specially selected dishes available at this restaurant.
          </p>
        </div>

        <div className="menu-grid">
          {restaurant.menu.map((item, index) => (
            <div className="menu-item" key={index}>

              <div className="menu-item-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <div className="menu-price">
                ₹{item.price}
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* BOOKING CTA */}
      <section className="restaurant-booking-section">

        <div>
          <span>READY TO DINE?</span>
          <h2>Experience {restaurant.name}</h2>
          <p>
            Reserve your table and enjoy an unforgettable dining experience.
          </p>
        </div>

        <Link to="/restaurants" className="restaurant-booking-btn">
          Back to Restaurants →
        </Link>

      </section>

    </div>
  );
};

export default RestaurantDetails;