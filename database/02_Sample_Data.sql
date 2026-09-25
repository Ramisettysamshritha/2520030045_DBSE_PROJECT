USE travel_package_portal;

-- ============================================================
-- 1. USERS
-- ============================================================

INSERT INTO users
(full_name, email, password_hash, phone, role)
VALUES
('Laxmi Sri', 'laxmi.sri01@gmail.com', 'Password@123', '9876500001', 'customer'),
('Ekaksh Singh Ranawat', 'ekaksh.ranawat@gmail.com', 'Password@123', '9876500002', 'customer'),
('Isha Singhania', 'isha.singhania@gmail.com', 'Password@123', '9876500003', 'customer'),
('Arjun Singh Rana', 'arjun.rana@gmail.com', 'Password@123', '9876500004', 'customer'),
('Anaya Varman', 'anaya.varman@gmail.com', 'Password@123', '9876500005', 'customer'),
('Shivay Dhanraj', 'shivay.dhanraj@gmail.com', 'Password@123', '9876500006', 'customer'),
('Sidhi Sharma', 'sidhi.sharma@gmail.com', 'Password@123', '9876500007', 'customer'),
('Virant Singh Rana', 'virant.rana@gmail.com', 'Password@123', '9876500008', 'customer'),
('Layla Siddiqui', 'layla.siddiqui@gmail.com', 'Password@123', '9876500009', 'customer'),
('Dharv Agnihotri', 'dharv.agnihotri@gmail.com', 'Password@123', '9876500010', 'customer'),
('Armaan Malik', 'armaan.malik@gmail.com', 'Password@123', '9876500011', 'customer'),
('Ayesha Malik', 'ayesha.malik@gmail.com', 'Password@123', '9876500012', 'customer'),
('Rohan Mehta', 'rohan.mehta@gmail.com', 'Password@123', '9876500013', 'customer'),
('Aarav Kapoor', 'aarav.kapoor@gmail.com', 'Password@123', '9876500014', 'customer'),
('Meera Nair', 'meera.nair@gmail.com', 'Password@123', '9876500015', 'customer'),
('Aditya Verma', 'aditya.verma@gmail.com', 'Password@123', '9876500016', 'customer'),
('Kavya Reddy', 'kavya.reddy@gmail.com', 'Password@123', '9876500017', 'customer'),
('Rahul Malhotra', 'rahul.malhotra@gmail.com', 'Password@123', '9876500018', 'customer'),
('Sneha Iyer', 'sneha.iyer@gmail.com', 'Password@123', '9876500019', 'customer'),
('Vikram Joshi', 'vikram.joshi@gmail.com', 'Password@123', '9876500020', 'customer'),
('Priya Menon', 'priya.menon@gmail.com', 'Password@123', '9876500021', 'customer'),
('Karan Shah', 'karan.shah@gmail.com', 'Password@123', '9876500022', 'customer'),
('Nisha Rao', 'nisha.rao@gmail.com', 'Password@123', '9876500023', 'customer'),
('Siddharth Gupta', 'siddharth.gupta@gmail.com', 'Password@123', '9876500024', 'customer'),
('Riya Bansal', 'riya.bansal@gmail.com', 'Password@123', '9876500025', 'customer'),
('Varun Arora', 'varun.arora@gmail.com', 'Password@123', '9876500026', 'customer'),
('Diya Choudhary', 'diya.choudhary@gmail.com', 'Password@123', '9876500027', 'customer'),
('Harsh Vardhan', 'harsh.vardhan@gmail.com', 'Password@123', '9876500028', 'customer'),
('Neha Sethi', 'neha.sethi@gmail.com', 'Password@123', '9876500029', 'customer'),
('Manav Agarwal', 'manav.agarwal@gmail.com', 'Password@123', '9876500030', 'customer'),
('Tanvi Kulkarni', 'tanvi.kulkarni@gmail.com', 'Password@123', '9876500031', 'customer'),
('Yash Patel', 'yash.patel@gmail.com', 'Password@123', '9876500032', 'customer'),
('Anjali Das', 'anjali.das@gmail.com', 'Password@123', '9876500033', 'customer'),
('Rishabh Jain', 'rishabh.jain@gmail.com', 'Password@123', '9876500034', 'customer'),
('Pooja Reddy', 'pooja.reddy@gmail.com', 'Password@123', '9876500035', 'customer'),
('Nikhil Kumar', 'nikhil.kumar@gmail.com', 'Password@123', '9876500036', 'customer'),
('Shruti Mishra', 'shruti.mishra@gmail.com', 'Password@123', '9876500037', 'customer'),
('Aman Singh', 'aman.singh@gmail.com', 'Password@123', '9876500038', 'customer'),
('Simran Kaur', 'simran.kaur@gmail.com', 'Password@123', '9876500039', 'customer'),
('Devansh Mehta', 'devansh.mehta@gmail.com', 'Password@123', '9876500040', 'customer'),

('Royal Travels', 'royal.travels@gmail.com', 'Password@123', '9876500041', 'vendor'),
('India Holidays', 'india.holidays@gmail.com', 'Password@123', '9876500042', 'vendor'),
('WanderWorld Travels', 'wanderworld@gmail.com', 'Password@123', '9876500043', 'vendor'),
('BlueSky Tourism', 'bluesky.tourism@gmail.com', 'Password@123', '9876500044', 'vendor'),
('Incredible Journeys', 'incredible.journeys@gmail.com', 'Password@123', '9876500045', 'vendor'),

('Travel Portal Admin', 'admin@travelportal.com', 'Password@123', '9876500046', 'admin'),
('System Administrator', 'sysadmin@travelportal.com', 'Password@123', '9876500047', 'admin'),
('Booking Administrator', 'bookingadmin@travelportal.com', 'Password@123', '9876500048', 'admin'),
('Reports Administrator', 'reportsadmin@travelportal.com', 'Password@123', '9876500049', 'admin'),
('Portal Manager', 'manager@travelportal.com', 'Password@123', '9876500050', 'admin'),

('Varnika Ranawat', 'varnika.ranawat@gmail.com', 'Password@123', '9876500051', 'customer'),
('Artharv Kapoor', 'artharv.kapoor@gmail.com', 'Password@123', '9876500052', 'customer');


-- ============================================================
-- 2. DESTINATIONS
-- ============================================================

INSERT INTO destinations
(destination_name, state, country, description, image_url)
VALUES
('Goa', 'Goa', 'India', 'Beaches, nightlife and coastal tourism.', '/photos/picture2.jpg'),
('Kerala', 'Kerala', 'India', 'Backwaters, greenery and hill stations.', '/photos/picture3.jpg'),
('Ladakh', 'Ladakh', 'India', 'Mountains, monasteries and adventure tourism.', '/photos/picture4.jpg'),
('Jaipur', 'Rajasthan', 'India', 'The Pink City known for forts and palaces.', '/photos/picture5.png'),
('Udaipur', 'Rajasthan', 'India', 'City of lakes and royal palaces.', '/photos/picture6.png'),
('Agra', 'Uttar Pradesh', 'India', 'Historic destination famous for the Taj Mahal.', '/photos/picture1.jpg'),
('Manali', 'Himachal Pradesh', 'India', 'Himalayan destination with valleys and adventure.', NULL),
('Meghalaya', 'Meghalaya', 'India', 'Waterfalls, caves and green landscapes.', NULL),
('Varanasi', 'Uttar Pradesh', 'India', 'Historic city famous for ghats and temples.', NULL),
('Mumbai', 'Maharashtra', 'India', 'Major coastal city and tourism destination.', NULL);


-- ============================================================
-- 3. TRAVEL PACKAGES
-- ============================================================

INSERT INTO travel_packages
(vendor_id, package_name, description, duration_days, base_price,
 max_people, category, status)
VALUES
(41, 'Goa Beach Escape', 'Relaxing beach holiday covering major attractions of Goa.', 4, 14999.00, 20, 'Beach', 'active'),
(42, 'Kerala Backwater Bliss', 'Scenic Kerala trip covering backwaters and hills.', 5, 18999.00, 18, 'Nature', 'active'),
(43, 'Ladakh Adventure', 'Adventure trip through mountains and monasteries.', 6, 25999.00, 15, 'Adventure', 'active'),
(44, 'Royal Rajasthan', 'Heritage tour covering Jaipur and Udaipur.', 5, 21999.00, 20, 'Heritage', 'active'),
(45, 'Agra Heritage Tour', 'Heritage package covering the Taj Mahal and Agra Fort.', 2, 8999.00, 25, 'Heritage', 'active'),
(41, 'Manali Mountain Escape', 'Mountain vacation with scenic valleys and activities.', 5, 16999.00, 20, 'Adventure', 'active'),
(42, 'Meghalaya Nature Trail', 'Nature trip through waterfalls, caves and hills.', 6, 22999.00, 15, 'Nature', 'active'),
(43, 'Varanasi Cultural Journey', 'Cultural and heritage journey through Varanasi.', 3, 9999.00, 25, 'Cultural', 'active');


-- ============================================================
-- 4. PACKAGE DESTINATIONS
-- ============================================================

INSERT INTO package_destinations
(package_id, destination_id, day_number, visit_order, stay_nights, notes)
VALUES
(1, 1, 1, 1, 1, 'North Goa sightseeing'),
(1, 1, 2, 1, 1, 'Beach activities'),
(1, 1, 3, 1, 1, 'South Goa sightseeing'),

(2, 2, 1, 1, 1, 'Kochi sightseeing'),
(2, 2, 2, 1, 1, 'Munnar'),
(2, 2, 3, 1, 1, 'Thekkady'),
(2, 2, 4, 1, 1, 'Alleppey backwaters'),

(3, 3, 1, 1, 1, 'Leh'),
(3, 3, 2, 1, 1, 'Nubra Valley'),
(3, 3, 3, 1, 1, 'Pangong Lake'),

(4, 4, 1, 1, 1, 'Jaipur'),
(4, 5, 2, 1, 1, 'Udaipur'),
(4, 4, 3, 1, 1, 'Jaipur heritage sites'),

(5, 6, 1, 1, 1, 'Taj Mahal'),
(5, 6, 2, 1, 0, 'Agra Fort'),

(6, 7, 1, 1, 1, 'Manali'),
(6, 7, 2, 1, 1, 'Solang Valley'),
(6, 7, 3, 1, 1, 'Rohtang region'),

(7, 8, 1, 1, 1, 'Shillong'),
(7, 8, 2, 1, 1, 'Cherrapunji'),
(7, 8, 3, 1, 1, 'Waterfalls and caves'),

(8, 9, 1, 1, 1, 'Varanasi Ghats'),
(8, 9, 2, 1, 1, 'Temple and cultural tour');


-- ============================================================
-- 5. HOTELS
-- ============================================================

INSERT INTO hotels
(vendor_id, destination_id, hotel_name, description, address, star_rating, status)
VALUES
(41, 1, 'Goa Beach Resort', 'Beachside resort with modern facilities.', 'Calangute, Goa', 4.5, 'active'),
(42, 2, 'Kerala Backwater Resort', 'Resort overlooking Kerala backwaters.', 'Alleppey, Kerala', 4.3, 'active'),
(43, 3, 'Ladakh Mountain Stay', 'Comfortable hotel near Leh market.', 'Leh, Ladakh', 4.1, 'active'),
(44, 4, 'Jaipur Royal Palace Hotel', 'Heritage-style hotel in Jaipur.', 'Jaipur, Rajasthan', 4.6, 'active'),
(44, 5, 'Udaipur Lake View Hotel', 'Hotel with scenic lake views.', 'Udaipur, Rajasthan', 4.7, 'active'),
(45, 6, 'Agra Heritage Hotel', 'Hotel close to major attractions.', 'Agra, Uttar Pradesh', 4.0, 'active'),
(41, 7, 'Manali Valley Resort', 'Mountain resort surrounded by scenic views.', 'Manali, Himachal Pradesh', 4.4, 'active'),
(42, 8, 'Meghalaya Hills Resort', 'Nature resort near major attractions.', 'Shillong, Meghalaya', 4.2, 'active');


-- ============================================================
-- 6. ROOMS
-- ============================================================

INSERT INTO rooms
(hotel_id, room_number, room_type, capacity, price_per_night, status)
VALUES
(1, '101', 'Standard', 2, 2500.00, 'available'),
(1, '102', 'Deluxe', 3, 3500.00, 'available'),
(1, '201', 'Suite', 4, 5000.00, 'available'),

(2, '101', 'Standard', 2, 2800.00, 'available'),
(2, '102', 'Deluxe', 3, 4000.00, 'available'),

(3, '101', 'Standard', 2, 3000.00, 'available'),
(3, '201', 'Deluxe', 3, 4200.00, 'available'),

(4, '101', 'Standard', 2, 3200.00, 'available'),
(4, '102', 'Deluxe', 3, 4500.00, 'available'),

(5, '101', 'Lake View', 2, 4000.00, 'available'),
(5, '201', 'Suite', 4, 6500.00, 'available'),

(6, '101', 'Standard', 2, 2200.00, 'available'),
(6, '201', 'Deluxe', 3, 3200.00, 'available'),

(7, '101', 'Standard', 2, 3000.00, 'available'),
(7, '102', 'Deluxe', 3, 4200.00, 'available'),

(8, '101', 'Standard', 2, 2800.00, 'available');


-- ============================================================
-- 7. BUSES
-- ============================================================

INSERT INTO buses
(vendor_id, bus_name, bus_type, from_location, to_location,
 departure_time, arrival_time, price, total_seats, status)
VALUES
(41, 'Goa Express', 'Comfort', 'Mumbai', 'Goa', '21:00:00', '07:00:00', 1200.00, 40, 'active'),
(42, 'Kerala Traveller', 'Premium', 'Bangalore', 'Kochi', '20:30:00', '06:30:00', 1800.00, 40, 'active'),
(43, 'Ladakh Explorer', 'Luxury', 'Manali', 'Leh', '06:00:00', '18:00:00', 2500.00, 30, 'active'),
(44, 'Rajasthan Royal', 'Comfort', 'Delhi', 'Jaipur', '22:00:00', '05:30:00', 1100.00, 45, 'active'),
(45, 'Agra Express', 'Value', 'Delhi', 'Agra', '07:00:00', '11:00:00', 600.00, 50, 'active'),
(41, 'Himalayan Rider', 'Premium', 'Delhi', 'Manali', '21:30:00', '07:30:00', 1700.00, 40, 'active');


-- ============================================================
-- 8. RESTAURANTS
-- ============================================================

INSERT INTO restaurants
(vendor_id, destination_id, restaurant_name, cuisine,
 address, price_range, rating, description, status)
VALUES
(41, 1, 'Goa Spice House', 'Goan', 'Calangute, Goa', '₹₹', 4.5, 'Popular Goan restaurant.', 'active'),
(42, 2, 'Kerala Kitchen', 'South Indian', 'Kochi, Kerala', '₹₹', 4.4, 'Traditional Kerala cuisine.', 'active'),
(43, 3, 'Leh Mountain Cafe', 'Tibetan', 'Leh, Ladakh', '₹₹', 4.3, 'Local and continental food.', 'active'),
(44, 4, 'Royal Jaipur Kitchen', 'Rajasthani', 'Jaipur, Rajasthan', '₹₹₹', 4.6, 'Traditional Rajasthani dining.', 'active'),
(44, 5, 'Udaipur Lake Restaurant', 'Indian', 'Udaipur, Rajasthan', '₹₹₹', 4.5, 'Restaurant with lake views.', 'active'),
(45, 6, 'Agra Mughal Kitchen', 'Mughlai', 'Agra, Uttar Pradesh', '₹₹', 4.2, 'Mughlai and North Indian cuisine.', 'active'),
(41, 7, 'Manali Valley Cafe', 'Multi-Cuisine', 'Manali, Himachal Pradesh', '₹₹', 4.4, 'Popular mountain cafe.', 'active'),
(42, 8, 'Meghalaya Hills Cafe', 'North Eastern', 'Shillong, Meghalaya', '₹₹', 4.3, 'Local Meghalaya dishes.', 'active');


-- ============================================================
-- 9. PRICING RULES
-- ============================================================

INSERT INTO pricing_rules
(package_id, season_name, start_date, end_date,
 min_people, max_people, price_multiplier, active)
VALUES
(1, 'peak', '2026-10-01', '2026-12-31', 1, 20, 1.25, TRUE),
(1, 'off', '2026-06-01', '2026-09-30', 1, 20, 0.85, TRUE),

(2, 'peak', '2026-10-01', '2027-01-31', 1, 18, 1.20, TRUE),
(2, 'off', '2026-06-01', '2026-09-30', 1, 18, 0.90, TRUE),

(3, 'peak', '2026-05-01', '2026-09-30', 1, 15, 1.30, TRUE),
(3, 'off', '2026-10-01', '2027-03-31', 1, 15, 0.80, TRUE),

(4, 'peak', '2026-10-01', '2027-02-28', 1, 20, 1.20, TRUE),
(5, 'normal', NULL, NULL, 1, 25, 1.00, TRUE),
(6, 'peak', '2026-12-01', '2027-02-28', 1, 20, 1.15, TRUE),
(7, 'peak', '2026-10-01', '2027-02-28', 1, 15, 1.20, TRUE),
(8, 'normal', NULL, NULL, 1, 25, 1.00, TRUE);