-- ============================================================
-- TRAVEL PACKAGE BOOKING PORTAL
-- DATABASE SCHEMA
-- ============================================================

CREATE DATABASE IF NOT EXISTS travel_package_portal;
USE travel_package_portal;


-- ============================================================
-- 1. USERS
-- ============================================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('customer', 'vendor', 'admin') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. DESTINATIONS
-- ============================================================

CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    destination_name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. TRAVEL PACKAGES
-- ============================================================

CREATE TABLE travel_packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NULL,
    package_name VARCHAR(150) NOT NULL,
    description TEXT,
    duration_days INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    max_people INT NOT NULL,
    category VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_package_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_package_price
        CHECK (base_price >= 0),

    CONSTRAINT chk_package_duration
        CHECK (duration_days > 0),

    CONSTRAINT chk_package_people
        CHECK (max_people > 0)
);


-- ============================================================
-- 4. PACKAGE DESTINATIONS
-- ============================================================

CREATE TABLE package_destinations (
    package_id INT NOT NULL,
    destination_id INT NOT NULL,
    day_number INT NOT NULL,
    visit_order INT DEFAULT 1,
    stay_nights INT DEFAULT 0,
    notes VARCHAR(500),

    PRIMARY KEY (package_id, destination_id, day_number),

    CONSTRAINT fk_pd_package
        FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_pd_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_day_number
        CHECK (day_number > 0),

    CONSTRAINT chk_visit_order
        CHECK (visit_order > 0),

    CONSTRAINT chk_stay_nights
        CHECK (stay_nights >= 0)
);


-- ============================================================
-- 5. HOTELS
-- ============================================================

CREATE TABLE hotels (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NULL,
    destination_id INT NULL,
    hotel_name VARCHAR(150) NOT NULL,
    description TEXT,
    address VARCHAR(300),
    star_rating DECIMAL(2,1),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_hotel_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_hotel_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_hotel_rating
        CHECK (
            star_rating IS NULL
            OR (star_rating >= 1 AND star_rating <= 5)
        )
);


-- ============================================================
-- 6. ROOMS
-- ============================================================

CREATE TABLE rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    room_number VARCHAR(30) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    status ENUM('available', 'maintenance', 'inactive')
        DEFAULT 'available',

    UNIQUE (hotel_id, room_number),

    CONSTRAINT fk_room_hotel
        FOREIGN KEY (hotel_id)
        REFERENCES hotels(hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_room_capacity
        CHECK (capacity > 0),

    CONSTRAINT chk_room_price
        CHECK (price_per_night >= 0)
);


-- ============================================================
-- 7. BUSES
-- ============================================================

CREATE TABLE buses (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NULL,
    bus_name VARCHAR(150) NOT NULL,
    bus_type ENUM('Value', 'Comfort', 'Premium', 'Luxury')
        DEFAULT 'Value',
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_seats INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bus_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_bus_price
        CHECK (price >= 0),

    CONSTRAINT chk_bus_seats
        CHECK (total_seats > 0)
);


-- ============================================================
-- 8. RESTAURANTS
-- ============================================================

CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT NULL,
    destination_id INT NULL,
    restaurant_name VARCHAR(150) NOT NULL,
    cuisine VARCHAR(100),
    address VARCHAR(300),
    price_range VARCHAR(50),
    rating DECIMAL(2,1),
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_restaurant_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_restaurant_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_restaurant_rating
        CHECK (
            rating IS NULL
            OR (rating >= 1 AND rating <= 5)
        )
);


-- ============================================================
-- 9. PRICING RULES
-- ============================================================

CREATE TABLE pricing_rules (
    pricing_rule_id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT NOT NULL,
    season_name ENUM('normal', 'peak', 'off')
        DEFAULT 'normal',
    start_date DATE NULL,
    end_date DATE NULL,
    min_people INT NOT NULL DEFAULT 1,
    max_people INT NULL,
    price_multiplier DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pricing_package
        FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_pricing_min_people
        CHECK (min_people > 0),

    CONSTRAINT chk_pricing_max_people
        CHECK (
            max_people IS NULL
            OR max_people >= min_people
        ),

    CONSTRAINT chk_price_multiplier
        CHECK (price_multiplier > 0)
);


-- ============================================================
-- 10. BOOKINGS
-- ============================================================

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(30) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATE,
    no_of_people INT NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    booking_status ENUM(
        'Pending',
        'Confirmed',
        'Cancelled',
        'Completed'
    ) DEFAULT 'Pending',
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_booking_people
        CHECK (no_of_people > 0),

    CONSTRAINT chk_booking_amount
        CHECK (total_amount >= 0)
);


-- ============================================================
-- 11. BOOKING ITEMS
-- ADDED LATER - INCLUDED HERE IN THE FINAL SCHEMA
-- ============================================================

CREATE TABLE booking_items (
    booking_item_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    package_id INT NULL,
    room_id INT NULL,
    bus_id INT NULL,
    restaurant_id INT NULL,
    service_date DATE NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    item_status ENUM(
        'Reserved',
        'Confirmed',
        'Cancelled',
        'Completed'
    ) DEFAULT 'Reserved',

    CONSTRAINT fk_booking_item_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(booking_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_booking_item_package
        FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_booking_item_room
        FOREIGN KEY (room_id)
        REFERENCES rooms(room_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_booking_item_bus
        FOREIGN KEY (bus_id)
        REFERENCES buses(bus_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_booking_item_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT chk_booking_item_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_booking_item_unit_price
        CHECK (unit_price >= 0),

    CONSTRAINT chk_booking_item_total
        CHECK (total_price >= 0),

    CONSTRAINT chk_one_booking_service
        CHECK (
            (package_id IS NOT NULL
             AND room_id IS NULL
             AND bus_id IS NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND room_id IS NOT NULL
             AND bus_id IS NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND room_id IS NULL
             AND bus_id IS NOT NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND room_id IS NULL
             AND bus_id IS NULL
             AND restaurant_id IS NOT NULL)
        )
);


-- ============================================================
-- 12. PAYMENTS
-- ADDED LATER - INCLUDED HERE IN THE FINAL SCHEMA
-- ============================================================

 (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    payment_method ENUM(
        'UPI',
        'Card',
        'Net Banking',
        'Wallet',
        'Cash'
    ) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM(
        'Pending',
        'Successful',
        'Failed',
        'Refunded'
    ) DEFAULT 'Pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(booking_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_payment_amount
        CHECK (amount >= 0)
);


-- ============================================================
-- 13. REVIEWS
-- ADDED LATER - INCLUDED HERE IN THE FINAL SCHEMA
-- ============================================================

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    package_id INT NULL,
    hotel_id INT NULL,
    bus_id INT NULL,
    restaurant_id INT NULL,
    rating INT NOT NULL,
    title VARCHAR(150),
    comment TEXT,
    review_status ENUM(
        'Published',
        'Pending',
        'Hidden'
    ) DEFAULT 'Published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_package
        FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_hotel
        FOREIGN KEY (hotel_id)
        REFERENCES hotels(hotel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_bus
        FOREIGN KEY (bus_id)
        REFERENCES buses(bus_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_review_rating
        CHECK (rating >= 1 AND rating <= 5),

    CONSTRAINT chk_one_review_target
        CHECK (
            (package_id IS NOT NULL
             AND hotel_id IS NULL
             AND bus_id IS NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND hotel_id IS NOT NULL
             AND bus_id IS NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND hotel_id IS NULL
             AND bus_id IS NOT NULL
             AND restaurant_id IS NULL)

            OR

            (package_id IS NULL
             AND hotel_id IS NULL
             AND bus_id IS NULL
             AND restaurant_id IS NOT NULL)
        )
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_destinations_name
ON destinations(destination_name);

CREATE INDEX idx_packages_vendor
ON travel_packages(vendor_id);

CREATE INDEX idx_packages_status
ON travel_packages(status);

CREATE INDEX idx_hotels_destination
ON hotels(destination_id);

CREATE INDEX idx_rooms_hotel
ON rooms(hotel_id);

CREATE INDEX idx_buses_route
ON buses(from_location, to_location);

CREATE INDEX idx_restaurants_destination
ON restaurants(destination_id);

CREATE INDEX idx_pricing_package
ON pricing_rules(package_id);

CREATE INDEX idx_bookings_user
ON bookings(user_id);

CREATE INDEX idx_bookings_status
ON bookings(booking_status);

CREATE INDEX idx_booking_items_booking
ON booking_items(booking_id);

CREATE INDEX idx_payments_booking
ON payments(booking_id);

CREATE INDEX idx_reviews_user
ON reviews(user_id);


-- ============================================================
-- END OF DATABASE SCHEMA
-- 13 TABLES
-- ============================================================