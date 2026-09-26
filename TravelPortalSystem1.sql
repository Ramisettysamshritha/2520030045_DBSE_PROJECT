/* ============================================================
   TRAVEL PACKAGE BOOKING PORTAL
   DBSBE 4th SEMESTER PROJECT
   MYSQL
   ============================================================ */

DROP DATABASE IF EXISTS travel_package_portal;

CREATE DATABASE travel_package_portal;

USE travel_package_portal;


/* ============================================================
   1. USERS
   ============================================================ */

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* ============================================================
   2. DESTINATIONS
   ============================================================ */

CREATE TABLE destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_name VARCHAR(100) NOT NULL,
    state_name VARCHAR(100),
    country_name VARCHAR(100) DEFAULT 'India',
    description TEXT
);


/* ============================================================
   3. TRAVEL PACKAGES
   ============================================================ */

CREATE TABLE travel_packages (
    package_id INT PRIMARY KEY AUTO_INCREMENT,
    package_name VARCHAR(150) NOT NULL,
    description TEXT,
    duration_days INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    available_slots INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* ============================================================
   4. PACKAGE DESTINATIONS
   ============================================================ */

CREATE TABLE package_destinations (
    package_id INT NOT NULL,
    destination_id INT NOT NULL,

    PRIMARY KEY (package_id, destination_id),

    FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id),

    FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
);


/* ============================================================
   5. HOTELS
   ============================================================ */

CREATE TABLE hotels (
    hotel_id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_name VARCHAR(150) NOT NULL,
    destination_id INT NOT NULL,
    address VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    description TEXT,
    status VARCHAR(20) DEFAULT 'ACTIVE',

    FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
);


/* ============================================================
   6. ROOMS
   ============================================================ */

CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    available_rooms INT DEFAULT 0,

    FOREIGN KEY (hotel_id)
        REFERENCES hotels(hotel_id)
);


/* ============================================================
   7. BUSES
   ============================================================ */

CREATE TABLE buses (
    bus_id INT PRIMARY KEY AUTO_INCREMENT,
    bus_number VARCHAR(30) NOT NULL UNIQUE,
    bus_type VARCHAR(50),
    source_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    departure_time TIME,
    arrival_time TIME,
    fare DECIMAL(10,2) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL
);


/* ============================================================
   8. RESTAURANTS
   ============================================================ */

CREATE TABLE restaurants (
    restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_name VARCHAR(150) NOT NULL,
    destination_id INT NOT NULL,
    cuisine VARCHAR(100),
    address VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    status VARCHAR(20) DEFAULT 'ACTIVE',

    FOREIGN KEY (destination_id)
        REFERENCES destinations(destination_id)
);


/* ============================================================
   9. BOOKINGS
   ============================================================ */

CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    package_id INT NOT NULL,
    booking_date DATE NOT NULL,
    travel_date DATE NOT NULL,
    number_of_people INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_status VARCHAR(30) DEFAULT 'PENDING',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id),

    CHECK (number_of_people BETWEEN 1 AND 50)
);


/* ============================================================
   10. PAYMENTS
   ============================================================ */

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(30) DEFAULT 'PENDING',
    transaction_id VARCHAR(100) UNIQUE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id)
        REFERENCES bookings(booking_id)
);


/* ============================================================
   11. REVIEWS
   ============================================================ */

CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    package_id INT NOT NULL,
    rating INT NOT NULL,
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    FOREIGN KEY (package_id)
        REFERENCES travel_packages(package_id),

    CHECK (rating BETWEEN 1 AND 5)
);


/* ============================================================
   12. 50 USERS
   ============================================================ */

INSERT INTO users
(full_name, email, password_hash, phone, role)
VALUES

('Ekaksh Singh Ranawat','ekaksh@gmail.com','hash001','9000000001','USER'),
('isha singhania','isha@gmail.com','hash002','9000000002','USER'),
('Arjun singh rana','arjun@gmail.com','hash003','9000000003','USER'),
('anaya varman','anaya@gmail.com','hash004','9000000004','USER'),
('shivay dhanraj','shivay@gmail.com','hash005','9000000005','USER'),
('sidhi sharma','sidhi@gmail.com','hash006','9000000006','USER'),
('virant singh rana','virant@gmail.com','hash007','9000000007','USER'),
('layla siddiqui','layla@gmail.com','hash008','9000000008','USER'),
('Dharv Agnihotri','dharv@gmail.com','hash009','9000000009','USER'),
('Armaan Malik','armaan@gmail.com','hash010','9000000010','USER'),
('Ayesha Malik','ayesha@gmail.com','hash011','9000000011','USER'),

('Aarav Mehta','aarav@gmail.com','hash012','9000000012','USER'),
('Kiara Kapoor','kiara@gmail.com','hash013','9000000013','USER'),
('Reyansh Malhotra','reyansh@gmail.com','hash014','9000000014','USER'),
('Myra Sharma','myra@gmail.com','hash015','9000000015','USER'),
('Kabir Rajput','kabir@gmail.com','hash016','9000000016','USER'),
('Avni Sinha','avni@gmail.com','hash017','9000000017','USER'),
('Advik Khanna','advik@gmail.com','hash018','9000000018','USER'),
('Tara Malhotra','tara@gmail.com','hash019','9000000019','USER'),
('Ruhan Kapoor','ruhan@gmail.com','hash020','9000000020','USER'),
('Meera Arora','meera@gmail.com','hash021','9000000021','USER'),
('Vihaan Oberoi','vihaan@gmail.com','hash022','9000000022','USER'),
('Siya Bansal','siya@gmail.com','hash023','9000000023','USER'),
('Ayaan Khurana','ayaan@gmail.com','hash024','9000000024','USER'),
('Riya Mehta','riya@gmail.com','hash025','9000000025','USER'),
('Rudra Singh','rudra@gmail.com','hash026','9000000026','USER'),
('Anika Verma','anika@gmail.com','hash027','9000000027','USER'),
('Vivaan Sharma','vivaan@gmail.com','hash028','9000000028','USER'),
('Alina Khan','alina@gmail.com','hash029','9000000029','USER'),
('Yuvan Reddy','yuvan@gmail.com','hash030','9000000030','USER'),
('Naira Kapoor','naira@gmail.com','hash031','9000000031','USER'),
('Kian Malhotra','kian@gmail.com','hash032','9000000032','USER'),
('Diya Sharma','diya@gmail.com','hash033','9000000033','USER'),
('Arnav Singh','arnav@gmail.com','hash034','9000000034','USER'),
('Shanaya Mehta','shanaya@gmail.com','hash035','9000000035','USER'),
('Veer Khanna','veer@gmail.com','hash036','9000000036','USER'),
('Ira Kapoor','ira@gmail.com','hash037','9000000037','USER'),
('Reyansh Verma','reyanshverma@gmail.com','hash038','9000000038','USER'),
('Aadhya Rao','aadhya@gmail.com','hash039','9000000039','USER'),
('Daksh Malhotra','daksh@gmail.com','hash040','9000000040','USER'),
('Kavya Sharma','kavya@gmail.com','hash041','9000000041','USER'),
('Aryan Raj','aryan@gmail.com','hash042','9000000042','USER'),
('Mehak Sinha','mehak@gmail.com','hash043','9000000043','USER'),
('Rudransh Kapoor','rudransh@gmail.com','hash044','9000000044','USER'),
('Anvi Reddy','anvi@gmail.com','hash045','9000000045','USER'),
('Shaurya Mehta','shaurya@gmail.com','hash046','9000000046','USER'),
('Rhea Malhotra','rhea@gmail.com','hash047','9000000047','USER'),
('Vivaan Raj','vivaanraj@gmail.com','hash048','9000000048','USER'),
('Saanvi Sharma','saanvi@gmail.com','hash049','9000000049','USER'),
('Aarush Kapoor','aarush@gmail.com','hash050','9000000050','USER');


/* ============================================================
   13. DESTINATIONS
   ============================================================ */

INSERT INTO destinations
(destination_name,state_name,country_name,description)
VALUES

('Munnar','Kerala','India',
'Tea plantations, hills and scenic landscapes.'),

('Alleppey','Kerala','India',
'Famous for backwaters and houseboats.'),

('Goa','Goa','India',
'Popular beach destination.'),

('Manali','Himachal Pradesh','India',
'Mountain destination with adventure activities.'),

('Jaipur','Rajasthan','India',
'Historic city with forts and palaces.'),

('Leh','Ladakh','India',
'High altitude Himalayan destination.'),

('Araku Valley','Andhra Pradesh','India',
'Beautiful valley with coffee plantations.'),

('Hyderabad','Telangana','India',
'Historic city famous for Charminar and cuisine.');


/* ============================================================
   14. TRAVEL PACKAGES
   ============================================================ */

INSERT INTO travel_packages
(package_name,description,duration_days,price,rating,available_slots,status)
VALUES

('Kerala Paradise',
'Explore Munnar and Alleppey.',
6,19999.00,4.9,30,'ACTIVE'),

('Goa Beach Escape',
'Enjoy beaches and coastal attractions.',
5,15999.00,4.8,40,'ACTIVE'),

('Himalayan Adventure',
'Explore the mountains of Manali.',
7,22999.00,4.7,25,'ACTIVE'),

('Royal Rajasthan',
'Discover forts and palaces.',
6,24999.00,4.8,30,'ACTIVE'),

('Ladakh Explorer',
'Explore mountains and monasteries.',
8,29999.00,4.9,20,'ACTIVE'),

('Araku Valley Escape',
'Enjoy waterfalls and coffee plantations.',
4,12999.00,4.6,35,'ACTIVE');


/* ============================================================
   15. PACKAGE DESTINATIONS
   ============================================================ */

INSERT INTO package_destinations
(package_id,destination_id)
VALUES

(1,1),
(1,2),
(2,3),
(3,4),
(4,5),
(5,6),
(6,7);


/* ============================================================
   16. HOTELS
   ============================================================ */

INSERT INTO hotels
(hotel_name,destination_id,address,rating,description,status)
VALUES

('Munnar Hills Resort',1,'Munnar, Kerala',4.7,
'Resort surrounded by tea plantations.','ACTIVE'),

('Alleppey Lake Resort',2,'Alleppey, Kerala',4.6,
'Resort near the backwaters.','ACTIVE'),

('Goa Beach Resort',3,'Calangute, Goa',4.8,
'Beachside resort.','ACTIVE'),

('Manali Mountain Hotel',4,'Manali, Himachal Pradesh',4.7,
'Hotel with mountain views.','ACTIVE'),

('Jaipur Palace Hotel',5,'Jaipur, Rajasthan',4.8,
'Heritage style hotel.','ACTIVE'),

('Leh Mountain Stay',6,'Leh, Ladakh',4.6,
'Comfortable mountain stay.','ACTIVE'),

('Araku Valley Resort',7,'Araku Valley, Andhra Pradesh',4.5,
'Resort surrounded by nature.','ACTIVE');


/* ============================================================
   17. ROOMS
   ============================================================ */

INSERT INTO rooms
(hotel_id,room_type,capacity,price_per_night,available_rooms)
VALUES

(1,'Deluxe Room',2,4500.00,8),
(1,'Family Room',4,7000.00,5),
(2,'Deluxe Room',2,4000.00,10),
(2,'Suite',4,6500.00,4),
(3,'Standard Room',2,3500.00,12),
(3,'Deluxe Room',3,5500.00,7),
(4,'Mountain View Room',2,5000.00,8),
(4,'Family Room',4,7500.00,4),
(5,'Heritage Room',2,6000.00,6),
(5,'Royal Suite',4,9500.00,3),
(6,'Standard Room',2,4500.00,7),
(6,'Deluxe Room',3,6500.00,4),
(7,'Valley View Room',2,3500.00,8);


/* ============================================================
   18. BUSES
   ============================================================ */

INSERT INTO buses
(bus_number,bus_type,source_city,destination_city,
departure_time,arrival_time,fare,total_seats,available_seats)
VALUES

('TS09AB1234','AC Sleeper','Hyderabad','Goa',
'20:00:00','08:00:00',1800.00,40,32),

('TS10CD5678','Volvo AC','Hyderabad','Bangalore',
'21:30:00','06:30:00',1500.00,45,38),

('AP16EF9012','AC Seater','Hyderabad','Araku Valley',
'06:00:00','13:00:00',900.00,40,35),

('HP01GH3456','Volvo AC','Delhi','Manali',
'19:00:00','08:00:00',2200.00,45,30),

('RJ14IJ7890','AC Sleeper','Delhi','Jaipur',
'22:00:00','04:30:00',1200.00,40,34);


/* ============================================================
   19. RESTAURANTS
   ============================================================ */

INSERT INTO restaurants
(restaurant_name,destination_id,cuisine,address,rating,status)
VALUES

('Munnar Spice Garden',1,'South Indian','Munnar, Kerala',4.6,'ACTIVE'),
('Alleppey Backwater Cafe',2,'Kerala Cuisine','Alleppey, Kerala',4.7,'ACTIVE'),
('Goa Coastal Kitchen',3,'Goan','Calangute, Goa',4.8,'ACTIVE'),
('Manali Mountain Cafe',4,'North Indian','Manali, Himachal Pradesh',4.5,'ACTIVE'),
('Jaipur Royal Kitchen',5,'Rajasthani','Jaipur, Rajasthan',4.7,'ACTIVE'),
('Leh Himalayan Kitchen',6,'Tibetan','Leh, Ladakh',4.6,'ACTIVE'),
('Araku Coffee House',7,'Andhra Cuisine','Araku Valley',4.5,'ACTIVE'),
('Hyderabad Spice House',8,'Hyderabadi','Hyderabad, Telangana',4.8,'ACTIVE');


/* ============================================================
   20. 50 BOOKINGS
   ============================================================ */

INSERT INTO bookings
(user_id,package_id,booking_date,travel_date,
number_of_people,total_amount,booking_status)
VALUES

(1,1,'2026-08-29','2026-09-10',2,39998.00,'CONFIRMED'),
(2,2,'2026-08-29','2026-09-12',2,31998.00,'CONFIRMED'),
(3,2,'2026-08-29','2026-09-15',2,31998.00,'CONFIRMED'),
(4,2,'2026-08-29','2026-09-15',2,31998.00,'CONFIRMED'),
(5,3,'2026-08-29','2026-09-18',3,68997.00,'PENDING'),
(6,4,'2026-08-29','2026-09-20',2,49998.00,'CANCELLED'),
(7,5,'2026-08-29','2026-09-22',2,59998.00,'CONFIRMED'),
(8,6,'2026-08-29','2026-09-25',2,25998.00,'PENDING'),
(9,4,'2026-08-29','2026-09-28',3,74997.00,'CONFIRMED'),
(10,1,'2026-08-29','2026-10-01',2,39998.00,'CANCELLED'),

(11,2,'2026-08-29','2026-10-02',2,31998.00,'CONFIRMED'),
(12,3,'2026-08-29','2026-10-03',2,45998.00,'CONFIRMED'),
(13,4,'2026-08-29','2026-10-05',2,49998.00,'PENDING'),
(14,5,'2026-08-29','2026-10-07',2,59998.00,'CONFIRMED'),
(15,6,'2026-08-29','2026-10-09',3,38997.00,'CONFIRMED'),
(16,1,'2026-08-29','2026-10-10',2,39998.00,'CANCELLED'),
(17,2,'2026-08-29','2026-10-12',4,63996.00,'CONFIRMED'),
(18,3,'2026-08-29','2026-10-14',2,45998.00,'PENDING'),
(19,4,'2026-08-29','2026-10-16',2,49998.00,'CONFIRMED'),
(20,5,'2026-08-29','2026-10-18',2,59998.00,'CONFIRMED'),

(21,6,'2026-08-29','2026-10-20',2,25998.00,'PENDING'),
(22,1,'2026-08-29','2026-10-22',3,59997.00,'CONFIRMED'),
(23,2,'2026-08-29','2026-10-24',2,31998.00,'CANCELLED'),
(24,3,'2026-08-29','2026-10-26',2,45998.00,'CONFIRMED'),
(25,4,'2026-08-29','2026-10-28',3,74997.00,'CONFIRMED'),
(26,5,'2026-08-29','2026-10-30',2,59998.00,'PENDING'),
(27,6,'2026-08-29','2026-11-01',2,25998.00,'CONFIRMED'),
(28,1,'2026-08-29','2026-11-03',2,39998.00,'CONFIRMED'),
(29,2,'2026-08-29','2026-11-05',3,47997.00,'CANCELLED'),
(30,3,'2026-08-29','2026-11-07',2,45998.00,'CONFIRMED'),

(31,4,'2026-08-29','2026-11-09',2,49998.00,'CONFIRMED'),
(32,5,'2026-08-29','2026-11-11',2,59998.00,'PENDING'),
(33,6,'2026-08-29','2026-11-13',4,51996.00,'CONFIRMED'),
(34,1,'2026-08-29','2026-11-15',2,39998.00,'CONFIRMED'),
(35,2,'2026-08-29','2026-11-17',2,31998.00,'CANCELLED'),
(36,3,'2026-08-29','2026-11-19',3,68997.00,'CONFIRMED'),
(37,4,'2026-08-29','2026-11-21',2,49998.00,'PENDING'),
(38,5,'2026-08-29','2026-11-23',2,59998.00,'CONFIRMED'),
(39,6,'2026-08-29','2026-11-25',2,25998.00,'CONFIRMED'),
(40,1,'2026-08-29','2026-11-27',3,59997.00,'CANCELLED'),

(41,2,'2026-08-29','2026-11-29',2,31998.00,'CONFIRMED'),
(42,3,'2026-08-29','2026-12-01',2,45998.00,'PENDING'),
(43,4,'2026-08-29','2026-12-03',2,49998.00,'CONFIRMED'),
(44,5,'2026-08-29','2026-12-05',3,89997.00,'CONFIRMED'),
(45,6,'2026-08-29','2026-12-07',2,25998.00,'PENDING'),
(46,1,'2026-08-29','2026-12-09',2,39998.00,'CONFIRMED'),
(47,2,'2026-08-29','2026-12-11',2,31998.00,'CANCELLED'),
(48,3,'2026-08-29','2026-12-13',2,45998.00,'CONFIRMED'),
(49,4,'2026-08-29','2026-12-15',3,74997.00,'CONFIRMED'),
(50,5,'2026-08-29','2026-12-17',2,59998.00,'PENDING');


/* ============================================================
   21. PAYMENTS
   ============================================================ */

INSERT INTO payments
(booking_id,amount,payment_method,payment_status,transaction_id)
VALUES

(1,39998.00,'UPI','SUCCESS','TXN10001'),
(2,31998.00,'CARD','SUCCESS','TXN10002'),
(3,31998.00,'UPI','SUCCESS','TXN10003'),
(4,31998.00,'CARD','SUCCESS','TXN10004'),
(5,68997.00,'UPI','PENDING','TXN10005'),
(6,49998.00,'CARD','REFUNDED','TXN10006'),
(7,59998.00,'NET BANKING','SUCCESS','TXN10007'),
(8,25998.00,'UPI','FAILED','TXN10008'),
(9,74997.00,'CARD','SUCCESS','TXN10009'),
(10,39998.00,'UPI','REFUNDED','TXN10010'),

(11,31998.00,'CARD','SUCCESS','TXN10011'),
(12,45998.00,'UPI','SUCCESS','TXN10012'),
(13,49998.00,'CARD','PENDING','TXN10013'),
(14,59998.00,'UPI','SUCCESS','TXN10014'),
(15,38997.00,'NET BANKING','SUCCESS','TXN10015'),
(16,39998.00,'CARD','REFUNDED','TXN10016'),
(17,63996.00,'UPI','SUCCESS','TXN10017'),
(18,45998.00,'CARD','FAILED','TXN10018'),
(19,49998.00,'UPI','SUCCESS','TXN10019'),
(20,59998.00,'CARD','SUCCESS','TXN10020'),

(21,25998.00,'UPI','PENDING','TXN10021'),
(22,59997.00,'CARD','SUCCESS','TXN10022'),
(23,31998.00,'UPI','REFUNDED','TXN10023'),
(24,45998.00,'CARD','SUCCESS','TXN10024'),
(25,74997.00,'UPI','SUCCESS','TXN10025'),
(26,59998.00,'CARD','PENDING','TXN10026'),
(27,25998.00,'UPI','SUCCESS','TXN10027'),
(28,39998.00,'NET BANKING','SUCCESS','TXN10028'),
(29,47997.00,'CARD','REFUNDED','TXN10029'),
(30,45998.00,'UPI','SUCCESS','TXN10030'),

(31,49998.00,'CARD','SUCCESS','TXN10031'),
(32,59998.00,'UPI','FAILED','TXN10032'),
(33,51996.00,'CARD','SUCCESS','TXN10033'),
(34,39998.00,'UPI','SUCCESS','TXN10034'),
(35,31998.00,'CARD','REFUNDED','TXN10035'),
(36,68997.00,'UPI','SUCCESS','TXN10036'),
(37,49998.00,'CARD','PENDING','TXN10037'),
(38,59998.00,'UPI','SUCCESS','TXN10038'),
(39,25998.00,'CARD','SUCCESS','TXN10039'),
(40,59997.00,'UPI','REFUNDED','TXN10040'),

(41,31998.00,'CARD','SUCCESS','TXN10041'),
(42,45998.00,'UPI','FAILED','TXN10042'),
(43,49998.00,'CARD','SUCCESS','TXN10043'),
(44,89997.00,'UPI','SUCCESS','TXN10044'),
(45,25998.00,'CARD','PENDING','TXN10045'),
(46,39998.00,'UPI','SUCCESS','TXN10046'),
(47,31998.00,'CARD','REFUNDED','TXN10047'),
(48,45998.00,'UPI','SUCCESS','TXN10048'),
(49,74997.00,'CARD','SUCCESS','TXN10049'),
(50,59998.00,'UPI','PENDING','TXN10050');


/* ============================================================
   22. REVIEWS
   ============================================================ */

INSERT INTO reviews
(user_id,package_id,rating,review_text)
VALUES

(1,1,5,'Amazing Kerala experience.'),
(2,2,4,'Beautiful beaches and great atmosphere.'),
(3,2,5,'The Goa trip was excellent.'),
(4,2,5,'Loved the trip and the beaches.'),
(7,5,4,'Ladakh was adventurous and beautiful.'),
(9,4,5,'Loved the forts and heritage places.'),
(11,2,3,'Good trip but some things can improve.'),
(14,5,5,'One of the best travel experiences.'),
(17,2,4,'Very enjoyable trip.'),
(20,5,5,'Amazing mountain views.'),
(24,3,4,'Manali was beautiful.'),
(28,1,5,'Kerala was peaceful and beautiful.'),
(33,6,4,'Araku Valley was wonderful.'),
(38,5,5,'Excellent Ladakh experience.'),
(44,5,4,'Great package and good service.');


/* ============================================================
   23. VIEW - BOOKING DETAILS
   ============================================================ */

CREATE VIEW booking_details AS
SELECT
    b.booking_id,
    u.full_name AS customer_name,
    u.email,
    tp.package_name,
    b.booking_date,
    b.travel_date,
    b.number_of_people,
    b.total_amount,
    b.booking_status,
    p.payment_method,
    p.payment_status
FROM bookings b
JOIN users u
    ON b.user_id = u.user_id
JOIN travel_packages tp
    ON b.package_id = tp.package_id
LEFT JOIN payments p
    ON b.booking_id = p.booking_id;


/* ============================================================
   24. VIEW - AVAILABLE PACKAGES
   ============================================================ */

CREATE VIEW available_packages AS
SELECT
    package_id,
    package_name,
    duration_days,
    price,
    rating,
    available_slots
FROM travel_packages
WHERE status = 'ACTIVE'
AND available_slots > 0;


/* ============================================================
   25. VIEW - SUCCESSFUL PAYMENTS
   ============================================================ */

CREATE VIEW successful_payments AS
SELECT
    p.payment_id,
    p.booking_id,
    u.full_name AS customer_name,
    p.amount,
    p.payment_method,
    p.payment_status,
    p.transaction_id
FROM payments p
JOIN bookings b
    ON p.booking_id = b.booking_id
JOIN users u
    ON b.user_id = u.user_id
WHERE p.payment_status = 'SUCCESS';


/* ============================================================
   26. STORED PROCEDURE - ALL PACKAGES
   ============================================================ */

DELIMITER //

CREATE PROCEDURE get_all_packages()
BEGIN

    SELECT
        package_id,
        package_name,
        duration_days,
        price,
        rating,
        available_slots,
        status
    FROM travel_packages
    ORDER BY package_id;

END //

DELIMITER ;


/* ============================================================
   27. STORED PROCEDURE - USER BOOKINGS
   ============================================================ */

DELIMITER //

CREATE PROCEDURE get_user_bookings(IN p_user_id INT)
BEGIN

    SELECT
        b.booking_id,
        u.full_name,
        tp.package_name,
        b.travel_date,
        b.number_of_people,
        b.total_amount,
        b.booking_status
    FROM bookings b
    JOIN users u
        ON b.user_id = u.user_id
    JOIN travel_packages tp
        ON b.package_id = tp.package_id
    WHERE b.user_id = p_user_id
    ORDER BY b.booking_date;

END //

DELIMITER ;


/* ============================================================
   28. STORED PROCEDURE - BOOKING REPORT
   ============================================================ */

DELIMITER //

CREATE PROCEDURE booking_report()
BEGIN

    SELECT
        b.booking_id,
        u.full_name AS customer,
        tp.package_name,
        b.number_of_people,
        b.total_amount,
        b.booking_status,
        p.payment_status
    FROM bookings b
    JOIN users u
        ON b.user_id = u.user_id
    JOIN travel_packages tp
        ON b.package_id = tp.package_id
    LEFT JOIN payments p
        ON b.booking_id = p.booking_id
    ORDER BY b.booking_id;

END //

DELIMITER ;


/* ============================================================
   29. FUNCTION - PACKAGE COST
   ============================================================ */

DELIMITER //

CREATE FUNCTION calculate_package_cost(
    p_package_id INT,
    p_people INT
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN

    DECLARE package_price DECIMAL(10,2);

    SELECT price
    INTO package_price
    FROM travel_packages
    WHERE package_id = p_package_id;

    RETURN package_price * p_people;

END //

DELIMITER ;


/* ============================================================
   30. FUNCTION - TOTAL SUCCESSFUL SALES
   ============================================================ */

DELIMITER //

CREATE FUNCTION total_successful_sales()
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN

    DECLARE total_sales DECIMAL(12,2);

    SELECT COALESCE(SUM(amount),0)
    INTO total_sales
    FROM payments
    WHERE payment_status = 'SUCCESS';

    RETURN total_sales;

END //

DELIMITER ;


/* ============================================================
   31. FINAL CHECKS
   ============================================================ */

SHOW TABLES;


/* 50 USERS */
SELECT COUNT(*) AS total_users
FROM users;


/* 50 BOOKINGS */
SELECT COUNT(*) AS total_bookings
FROM bookings;


/* ALL 50 USERS */
SELECT *
FROM users
ORDER BY user_id;


/* BOOKING DETAILS */
SELECT *
FROM booking_details
ORDER BY booking_id;


/* SUCCESSFUL PAYMENTS */
SELECT *
FROM successful_payments;


/* AVAILABLE PACKAGES */
SELECT *
FROM available_packages;


/* TEST STORED PROCEDURES */
CALL get_all_packages();

CALL get_user_bookings(3);

CALL booking_report();


/* TEST FUNCTIONS */
SELECT calculate_package_cost(2,2) AS package_cost;

SELECT total_successful_sales() AS total_successful_sales;