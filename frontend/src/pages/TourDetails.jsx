import { Link, useParams } from "react-router-dom";
import "./TourDetails.css";

const tourItineraries = [
  {
    id: 1,
    title: "Royal Rajasthan Escape",
    location: "Jaipur • Udaipur • Jodhpur",
    destination: "Rajasthan",
    duration: "6 Days / 5 Nights",
    price: 42000,
    tier: "Premium",
    rating: 4.9,
    image: "/photos/picture5.png",

    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Jaipur",
        description:
          "Arrive in Jaipur, meet your travel representative and check in to your hotel.",
        activities: [
          "Airport / railway station pickup",
          "Hotel check-in",
          "Evening leisure time"
        ]
      },
      {
        day: "Day 02",
        title: "Explore the Pink City",
        description:
          "Discover Jaipur's royal heritage through its magnificent forts and palaces.",
        activities: [
          "Amber Fort",
          "City Palace",
          "Hawa Mahal",
          "Local market visit"
        ]
      },
      {
        day: "Day 03",
        title: "Jaipur to Jodhpur",
        description:
          "Travel to Jodhpur and explore the historic Blue City.",
        activities: [
          "Scenic road transfer",
          "Hotel check-in",
          "Mehrangarh Fort",
          "Jaswant Thada"
        ]
      },
      {
        day: "Day 04",
        title: "Jodhpur to Udaipur",
        description:
          "Continue towards Udaipur, known for its lakes and royal architecture.",
        activities: [
          "Transfer to Udaipur",
          "Hotel check-in",
          "Lake Pichola boat ride",
          "Evening at leisure"
        ]
      },
      {
        day: "Day 05",
        title: "Discover Udaipur",
        description:
          "Spend the day exploring Udaipur's palaces, gardens and lakes.",
        activities: [
          "City Palace",
          "Saheliyon Ki Bari",
          "Jagdish Temple",
          "Local shopping"
        ]
      },
      {
        day: "Day 06",
        title: "Departure",
        description:
          "Enjoy breakfast before your scheduled transfer and departure.",
        activities: [
          "Breakfast",
          "Hotel checkout",
          "Departure transfer"
        ]
      }
    ]
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
    image: "/photos/picture6.png",

    itinerary: [
      {
        day: "Day 01",
        title: "Welcome to Udaipur",
        description:
          "Arrive in Udaipur and settle into your comfortable hotel.",
        activities: [
          "Arrival transfer",
          "Hotel check-in",
          "Lake Pichola sunset"
        ]
      },
      {
        day: "Day 02",
        title: "Royal Udaipur",
        description:
          "Explore the magnificent royal landmarks of Udaipur.",
        activities: [
          "City Palace",
          "Jagdish Temple",
          "Saheliyon Ki Bari",
          "Local market"
        ]
      },
      {
        day: "Day 03",
        title: "Lake & Leisure",
        description:
          "Enjoy a relaxed day with a beautiful lake experience.",
        activities: [
          "Lake boat tour",
          "Garden visit",
          "Café experience",
          "Evening leisure"
        ]
      },
      {
        day: "Day 04",
        title: "Departure",
        description:
          "Breakfast followed by departure transfer.",
        activities: [
          "Breakfast",
          "Hotel checkout",
          "Departure transfer"
        ]
      }
    ]
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
    image: "/photos/picture2.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Goa",
        description:
          "Arrive in Goa and begin your beach holiday.",
        activities: [
          "Airport transfer",
          "Resort check-in",
          "Beach visit",
          "Sunset leisure"
        ]
      },
      {
        day: "Day 02",
        title: "North Goa Beaches",
        description:
          "Explore the lively beaches and attractions of North Goa.",
        activities: [
          "Calangute Beach",
          "Baga Beach",
          "Anjuna Beach",
          "Local market"
        ]
      },
      {
        day: "Day 03",
        title: "South Goa",
        description:
          "Experience the quieter and scenic side of Goa.",
        activities: [
          "Colva Beach",
          "Benaulim Beach",
          "Portuguese heritage areas",
          "Sunset"
        ]
      },
      {
        day: "Day 04",
        title: "Goa Experiences",
        description:
          "Enjoy a flexible day for activities and relaxation.",
        activities: [
          "Water activities",
          "Beach leisure",
          "Café hopping",
          "Evening at leisure"
        ]
      },
      {
        day: "Day 05",
        title: "Departure",
        description:
          "Enjoy breakfast before your departure transfer.",
        activities: [
          "Breakfast",
          "Resort checkout",
          "Airport transfer"
        ]
      }
    ]
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
    image: "/photos/picture3.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Welcome to Kochi",
        description:
          "Arrive in Kochi and discover the city's coastal charm.",
        activities: [
          "Arrival transfer",
          "Hotel check-in",
          "Fort Kochi",
          "Chinese fishing nets"
        ]
      },
      {
        day: "Day 02",
        title: "Kochi to Munnar",
        description:
          "Travel through beautiful landscapes towards the hills of Munnar.",
        activities: [
          "Scenic drive",
          "Tea plantations",
          "Waterfalls",
          "Hotel check-in"
        ]
      },
      {
        day: "Day 03",
        title: "Munnar Exploration",
        description:
          "Explore Munnar's tea gardens and mountain landscapes.",
        activities: [
          "Tea garden visit",
          "Tea museum",
          "Viewpoints",
          "Local sightseeing"
        ]
      },
      {
        day: "Day 04",
        title: "Munnar to Alleppey",
        description:
          "Travel towards Alleppey and begin your backwater experience.",
        activities: [
          "Scenic transfer",
          "Houseboat check-in",
          "Backwater cruise",
          "Traditional Kerala dinner"
        ]
      },
      {
        day: "Day 05",
        title: "Alleppey Backwaters",
        description:
          "Enjoy the peaceful landscapes and villages surrounding the backwaters.",
        activities: [
          "Morning cruise",
          "Village views",
          "Local cuisine",
          "Sunset cruise"
        ]
      },
      {
        day: "Day 06",
        title: "Departure",
        description:
          "Breakfast followed by your departure transfer.",
        activities: [
          "Breakfast",
          "Houseboat checkout",
          "Departure transfer"
        ]
      }
    ]
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
    image: "/photos/picture4.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Leh",
        description:
          "Arrive in Leh and spend the day acclimatizing to the high altitude.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Rest and acclimatization",
          "Evening walk"
        ]
      },
      {
        day: "Day 02",
        title: "Leh Local Sightseeing",
        description:
          "Explore some of Leh's famous monasteries and viewpoints.",
        activities: [
          "Shanti Stupa",
          "Leh Palace",
          "Thiksey Monastery",
          "Local market"
        ]
      },
      {
        day: "Day 03",
        title: "Leh to Nubra Valley",
        description:
          "Cross the dramatic Khardung La route towards Nubra Valley.",
        activities: [
          "Mountain drive",
          "Khardung La",
          "Nubra Valley",
          "Desert experience"
        ]
      },
      {
        day: "Day 04",
        title: "Explore Nubra",
        description:
          "Discover the landscapes and monasteries of Nubra Valley.",
        activities: [
          "Diskit Monastery",
          "Hunder",
          "Sand dunes",
          "Village experience"
        ]
      },
      {
        day: "Day 05",
        title: "Nubra to Pangong",
        description:
          "Travel towards the spectacular Pangong Lake.",
        activities: [
          "Mountain transfer",
          "Scenic landscapes",
          "Pangong Lake",
          "Lakeside stay"
        ]
      },
      {
        day: "Day 06",
        title: "Pangong to Leh",
        description:
          "Enjoy the morning views before returning to Leh.",
        activities: [
          "Pangong sunrise",
          "Scenic drive",
          "Leh arrival",
          "Evening leisure"
        ]
      },
      {
        day: "Day 07",
        title: "Departure",
        description:
          "Breakfast followed by airport transfer.",
        activities: [
          "Breakfast",
          "Hotel checkout",
          "Airport transfer"
        ]
      }
    ]
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
    image: "/photos/picture1.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Delhi Arrival",
        description:
          "Begin your Golden Triangle journey in India's capital.",
        activities: [
          "Arrival transfer",
          "Hotel check-in",
          "India Gate",
          "Evening leisure"
        ]
      },
      {
        day: "Day 02",
        title: "Discover Delhi",
        description:
          "Explore the historic and modern highlights of Delhi.",
        activities: [
          "Red Fort",
          "Qutub Minar",
          "Humayun's Tomb",
          "Local market"
        ]
      },
      {
        day: "Day 03",
        title: "Agra & Taj Mahal",
        description:
          "Travel to Agra and experience its famous heritage landmarks.",
        activities: [
          "Transfer to Agra",
          "Taj Mahal",
          "Agra Fort",
          "Local shopping"
        ]
      },
      {
        day: "Day 04",
        title: "Agra to Jaipur",
        description:
          "Continue to Jaipur and begin exploring the Pink City.",
        activities: [
          "Road transfer",
          "Amber Fort",
          "City Palace",
          "Evening market"
        ]
      },
      {
        day: "Day 05",
        title: "Jaipur & Departure",
        description:
          "Enjoy a final morning in Jaipur before departure.",
        activities: [
          "Hawa Mahal",
          "Local breakfast",
          "Shopping",
          "Departure transfer"
        ]
      }
    ]
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
    image: "/photos/picture3.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Kerala",
        description:
          "Begin your premium Kerala experience with a comfortable arrival.",
        activities: [
          "Private transfer",
          "Luxury hotel check-in",
          "Welcome experience",
          "Leisure evening"
        ]
      },
      {
        day: "Day 02",
        title: "Munnar Hills",
        description:
          "Travel into the lush hills and tea plantations of Munnar.",
        activities: [
          "Scenic drive",
          "Tea plantations",
          "Waterfalls",
          "Luxury stay"
        ]
      },
      {
        day: "Day 03",
        title: "Munnar Experience",
        description:
          "Enjoy a relaxed day surrounded by mountain landscapes.",
        activities: [
          "Tea museum",
          "Mountain viewpoints",
          "Nature walk",
          "Leisure time"
        ]
      },
      {
        day: "Day 04",
        title: "Thekkady",
        description:
          "Continue to Thekkady for a nature-filled experience.",
        activities: [
          "Transfer to Thekkady",
          "Spice plantation",
          "Wildlife surroundings",
          "Resort stay"
        ]
      },
      {
        day: "Day 05",
        title: "Thekkady Exploration",
        description:
          "Experience the natural beauty and culture of the region.",
        activities: [
          "Nature activities",
          "Local experiences",
          "Spice shopping",
          "Evening leisure"
        ]
      },
      {
        day: "Day 06",
        title: "Alleppey Houseboat",
        description:
          "Board a premium houseboat and cruise through Kerala's backwaters.",
        activities: [
          "Private transfer",
          "Houseboat check-in",
          "Backwater cruise",
          "Onboard dinner"
        ]
      },
      {
        day: "Day 07",
        title: "Backwater Leisure",
        description:
          "Enjoy a relaxed morning surrounded by peaceful waterways.",
        activities: [
          "Morning cruise",
          "Village views",
          "Kerala cuisine",
          "Sunset experience"
        ]
      },
      {
        day: "Day 08",
        title: "Departure",
        description:
          "Complete your Kerala journey with a comfortable departure transfer.",
        activities: [
          "Breakfast",
          "Checkout",
          "Private transfer",
          "Departure"
        ]
      }
    ]
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
    image: "/photos/picture2.jpg",

    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Goa",
        description:
          "Arrive in Goa and settle into your hotel near the beaches.",
        activities: [
          "Arrival transfer",
          "Hotel check-in",
          "Calangute Beach",
          "Sunset"
        ]
      },
      {
        day: "Day 02",
        title: "Panaji & North Goa",
        description:
          "Explore the colourful streets and beaches of North Goa.",
        activities: [
          "Panaji",
          "Baga Beach",
          "Anjuna Beach",
          "Local market"
        ]
      },
      {
        day: "Day 03",
        title: "Beach Morning & Departure",
        description:
          "Enjoy one final morning by the sea before heading home.",
        activities: [
          "Beach breakfast",
          "Leisure time",
          "Hotel checkout",
          "Departure transfer"
        ]
      }
    ]
  }
];

function TourDetails() {
  const { id } = useParams();

  const tour = tourItineraries.find(
    (item) => item.id === Number(id)
  );

  if (!tour) {
    return (
      <div className="tour-details-not-found">
        <h1>Tour Not Found</h1>
        <p>The itinerary you're looking for doesn't exist.</p>

        <Link to="/tours">
          ← Back to Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="tour-details-page">

      {/* HERO */}
      <section
        className="tour-details-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.72)
          ), url(${tour.image})`
        }}
      >

        <div className="tour-details-overlay">

          <Link
            to="/tours"
            className="tour-back-link"
          >
            ← Back to Tours
          </Link>

          <div className="tour-details-hero-content">

            <span className="tour-details-eyebrow">
              {tour.tier} JOURNEY
            </span>

            <h1>
              {tour.title}
            </h1>

            <p>
              {tour.location}
            </p>

            <div className="tour-details-meta">

              <span>
                {tour.duration}
              </span>

              <span>
                ★ {tour.rating}
              </span>

              <strong>
                ₹{tour.price.toLocaleString("en-IN")}
              </strong>

              <small>
                per person
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* ITINERARY */}
      <section className="tour-itinerary-section">

        <div className="tour-itinerary-heading">

          <span>
            YOUR JOURNEY
          </span>

          <h2>
            {tour.duration} Itinerary
          </h2>

          <p>
            A thoughtfully planned journey through {tour.destination}.
          </p>

        </div>


        <div className="itinerary-list">

          {tour.itinerary.map((day, index) => (

            <article
              className="itinerary-day"
              key={index}
            >

              <div className="itinerary-day-number">
                {day.day}
              </div>

              <div className="itinerary-day-content">

                <h3>
                  {day.title}
                </h3>

                <p className="itinerary-description">
                  {day.description}
                </p>

                <div className="itinerary-activities">

                  {day.activities.map(
                    (activity, activityIndex) => (

                      <span key={activityIndex}>
                        ✓ {activity}
                      </span>

                    )
                  )}

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* BOOKING CTA */}
      <section className="tour-itinerary-cta">

        <div>

          <span>
            READY TO EXPLORE?
          </span>

          <h2>
            Start Your {tour.title}
          </h2>

          <p>
            Your journey through {tour.destination} is waiting.
          </p>

        </div>

        <Link
          to="/booking"
          className="tour-book-button"
        >
          Book This Journey →
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="tour-details-footer">

        <div>
          ExploreIndia
        </div>

        <p>
          Discover India. Your journey starts here.
        </p>

        <Link to="/tours">
          Explore More Tours
        </Link>

      </footer>

    </div>
  );
}

export default TourDetails;