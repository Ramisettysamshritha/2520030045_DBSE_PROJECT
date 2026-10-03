import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Buses from "./pages/Buses";
import Hotels from "./pages/Hotels";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Reviews from "./pages/Reviews";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/buses" element={<Buses />} />

        <Route path="/hotels" element={<Hotels />} />

        <Route path="/tours" element={<Tours />} />

        {/* TOUR ITINERARY */}
        <Route
          path="/tour/:id"
          element={<TourDetails />}
        />

        <Route path="/restaurants" element={<Restaurants />} />

        {/* RESTAURANT MENU */}
        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />

        <Route path="/packages" element={<Packages />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/reviews" element={<Reviews />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;