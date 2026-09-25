USE travel_package_portal;

-- =========================================================
-- DATABASE DESIGN
-- Travel Package Booking Portal
-- =========================================================

-- =========================================================
-- 1. USERS
-- =========================================================
-- Stores customers, vendors and administrators.

-- Primary Key:
-- user_id

-- Important attributes:
-- full_name, email, password_hash, phone, role


-- =========================================================
-- 2. DESTINATIONS
-- =========================================================
-- Stores travel destinations available in the portal.

-- Primary Key:
-- destination_id

-- Important attributes:
-- destination_name, state, country, description, image_url


-- =========================================================
-- 3. TRAVEL_PACKAGES
-- =========================================================
-- Stores travel packages offered to customers.

-- Primary Key:
-- package_id

-- Foreign Key:
-- vendor_id → users.user_id

-- Important attributes:
-- package_name, duration_days, base_price,
-- max_people, category, status


-- =========================================================
-- 4. PACKAGE_DESTINATIONS
-- =========================================================
-- Associative table connecting travel packages
-- with multiple destinations.
--
-- It also stores itinerary information such as
-- day number, visit order and stay duration.

-- Primary Key:
-- package_id, destination_id, day_number

-- Foreign Keys:
-- package_id → travel_packages.package_id
-- destination_id → destinations.destination_id


-- =========================================================
-- 5. HOTELS
-- =========================================================
-- Stores hotels available at different destinations.

-- Primary Key:
-- hotel_id

-- Foreign Keys:
-- vendor_id → users.user_id
-- destination_id → destinations.destination_id

-- Important attributes:
-- hotel_name, address, star_rating, status


-- =========================================================
-- 6. ROOMS
-- =========================================================
-- Stores rooms belonging to hotels.

-- Primary Key:
-- room_id

-- Foreign Key:
-- hotel_id → hotels.hotel_id

-- Important attributes:
-- room_number, room_type, capacity,
-- price_per_night, status


-- =========================================================
-- 7. BUSES
-- =========================================================
-- Stores bus services available for travel.

-- Primary Key:
-- bus_id

-- Foreign Key:
-- vendor_id → users.user_id

-- Important attributes:
-- bus_name, bus_type, from_location,
-- to_location, departure_time, arrival_time,
-- price, total_seats, status


-- =========================================================
-- 8. RESTAURANTS
-- =========================================================
-- Stores restaurants available at destinations.

-- Primary Key:
-- restaurant_id

-- Foreign Keys:
-- vendor_id → users.user_id
-- destination_id → destinations.destination_id

-- Important attributes:
-- restaurant_name, cuisine, address,
-- price_range, rating, status


-- =========================================================
-- 9. PRICING_RULES
-- =========================================================
-- Stores dynamic pricing rules for travel packages.
--
-- Pricing can vary according to season,
-- travel dates and number of people.

-- Primary Key:
-- pricing_rule_id

-- Foreign Key:
-- package_id → travel_packages.package_id

-- Important attributes:
-- season_name, start_date, end_date,
-- min_people, max_people, price_multiplier, active


-- =========================================================
-- 10. BOOKINGS
-- =========================================================
-- Stores the main booking information of customers.

-- Primary Key:
-- booking_id

-- Foreign Key:
-- user_id → users.user_id

-- Important attributes:
-- booking_code, booking_date, travel_date,
-- no_of_people, total_amount, booking_status


-- =========================================================
-- 11. BOOKING_ITEMS
-- =========================================================
-- Stores individual services included in a booking.
--
-- A booking item can represent:
-- Travel package
-- Hotel room
-- Bus
-- Restaurant

-- Primary Key:
-- booking_item_id

-- Foreign Keys:
-- booking_id → bookings.booking_id
-- package_id → travel_packages.package_id
-- room_id → rooms.room_id
-- bus_id → buses.bus_id
-- restaurant_id → restaurants.restaurant_id

-- Important attributes:
-- service_date, quantity, unit_price,
-- total_price, item_status


-- =========================================================
-- 12. PAYMENTS
-- =========================================================
-- Stores payment transactions for bookings.

-- Primary Key:
-- payment_id

-- Foreign Key:
-- booking_id → bookings.booking_id

-- Important attributes:
-- transaction_id, payment_method,
-- amount, payment_status, payment_date


-- =========================================================
-- 13. REVIEWS
-- =========================================================
-- Stores customer reviews and ratings.
--
-- A review can be associated with:
-- Travel package
-- Hotel
-- Bus
-- Restaurant

-- Primary Key:
-- review_id

-- Foreign Keys:
-- user_id → users.user_id
-- package_id → travel_packages.package_id
-- hotel_id → hotels.hotel_id
-- bus_id → buses.bus_id
-- restaurant_id → restaurants.restaurant_id

-- Important attributes:
-- rating, title, comment,
-- review_status, created_at


-- =========================================================
-- RELATIONSHIP SUMMARY
-- =========================================================

-- USERS
--   1 ────────< TRAVEL_PACKAGES
--   1 ────────< HOTELS
--   1 ────────< BUSES
--   1 ────────< RESTAURANTS
--   1 ────────< BOOKINGS
--   1 ────────< REVIEWS

-- DESTINATIONS
--   1 ────────< PACKAGE_DESTINATIONS
--   1 ────────< HOTELS
--   1 ────────< RESTAURANTS

-- TRAVEL_PACKAGES
--   1 ────────< PACKAGE_DESTINATIONS
--   1 ────────< PRICING_RULES
--   1 ────────< BOOKING_ITEMS
--   1 ────────< REVIEWS

-- HOTELS
--   1 ────────< ROOMS
--   1 ────────< REVIEWS

-- BOOKINGS
--   1 ────────< BOOKING_ITEMS
--   1 ────────< PAYMENTS

-- ROOMS
--   1 ────────< BOOKING_ITEMS

-- BUSES
--   1 ────────< BOOKING_ITEMS
--   1 ────────< REVIEWS

-- RESTAURANTS
--   1 ────────< BOOKING_ITEMS
--   1 ────────< REVIEWS


-- =========================================================
-- DATABASE TABLE COUNT
-- =========================================================
-- Total tables: 13


-- =========================================================
-- END OF DATABASE DESIGN
-- =========================================================
-- =========================================================