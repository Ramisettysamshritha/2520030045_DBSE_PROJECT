import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Buses from "./pages/Buses";
import Hotels from "./pages/Hotels";
import Tours from "./pages/Tours";
import Restaurants from "./pages/Restaurants";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Reviews from "./pages/Reviews";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import "./App.css";

function Placeholder({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "40px",
      }}
    >
      {title}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main */}
        <Route path="/" element={<Home />} />

        {/* Travel Services */}
        <Route path="/buses" element={<Buses />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/restaurants" element={<Restaurants />} />
       <Route path="/packages" element={<Packages />} />

<Route path="/booking" element={<Booking />} />

<Route path="/reviews" element={<Reviews />} />

<Route path="/my-bookings" element={<MyBookings />} />

<Route path="/profile" element={<Profile />} />
        {/* Account */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Other */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Temporary pages */}
        <Route
          path="/my-bookings"
          element={<Placeholder title="My Bookings" />}
        />

        <Route
          path="/profile"
          element={<Placeholder title="My Profile" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;