USE travel_package_portal;

-- =========================================================
-- 04_Views_Procedures.sql
-- Views, Stored Procedures and Functions
-- =========================================================


-- =========================================================
-- 1. VIEW: PACKAGE DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_package_details;

CREATE VIEW vw_package_details AS
SELECT
    tp.package_id,
    tp.package_name,
    tp.description,
    tp.duration_days,
    tp.base_price,
    tp.max_people,
    tp.category,
    tp.status,
    u.full_name AS vendor_name
FROM travel_packages tp
LEFT JOIN users u
    ON tp.vendor_id = u.user_id;


-- =========================================================
-- 2. VIEW: PACKAGE DESTINATIONS
-- =========================================================

DROP VIEW IF EXISTS vw_package_destinations;

CREATE VIEW vw_package_destinations AS
SELECT
    tp.package_id,
    tp.package_name,
    d.destination_id,
    d.destination_name,
    d.state,
    pd.day_number,
    pd.visit_order,
    pd.stay_nights,
    pd.notes
FROM package_destinations pd
JOIN travel_packages tp
    ON pd.package_id = tp.package_id
JOIN destinations d
    ON pd.destination_id = d.destination_id;


-- =========================================================
-- 3. VIEW: BOOKING DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_booking_details;

CREATE VIEW vw_booking_details AS
SELECT
    b.booking_id,
    b.booking_code,
    u.full_name AS customer_name,
    u.email,
    b.booking_date,
    b.travel_date,
    b.no_of_people,
    b.total_amount,
    b.booking_status,
    b.notes
FROM bookings b
JOIN users u
    ON b.user_id = u.user_id;


-- =========================================================
-- 4. VIEW: BOOKING ITEMS
-- =========================================================

DROP VIEW IF EXISTS vw_booking_items;

CREATE VIEW vw_booking_items AS
SELECT
    bi.booking_item_id,
    b.booking_code,
    u.full_name AS customer_name,
    tp.package_name,
    h.hotel_name,
    r.room_type,
    bs.bus_name,
    res.restaurant_name,
    bi.service_date,
    bi.quantity,
    bi.unit_price,
    bi.total_price,
    bi.item_status
FROM booking_items bi
JOIN bookings b
    ON bi.booking_id = b.booking_id
JOIN users u
    ON b.user_id = u.user_id
LEFT JOIN travel_packages tp
    ON bi.package_id = tp.package_id
LEFT JOIN rooms r
    ON bi.room_id = r.room_id
LEFT JOIN hotels h
    ON r.hotel_id = h.hotel_id
LEFT JOIN buses bs
    ON bi.bus_id = bs.bus_id
LEFT JOIN restaurants res
    ON bi.restaurant_id = res.restaurant_id;


-- =========================================================
-- 5. VIEW: PAYMENT DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_payment_details;

CREATE VIEW vw_payment_details AS
SELECT
    p.payment_id,
    b.booking_code,
    u.full_name AS customer_name,
    p.transaction_id,
    p.payment_method,
    p.amount,
    p.payment_status,
    p.payment_date
FROM payments p
JOIN bookings b
    ON p.booking_id = b.booking_id
JOIN users u
    ON b.user_id = u.user_id;


-- =========================================================
-- 6. VIEW: REVIEW DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_review_details;

CREATE VIEW vw_review_details AS
SELECT
    r.review_id,
    u.full_name AS customer_name,
    tp.package_name,
    h.hotel_name,
    bs.bus_name,
    res.restaurant_name,
    r.rating,
    r.title,
    r.comment,
    r.review_status,
    r.created_at
FROM reviews r
JOIN users u
    ON r.user_id = u.user_id
LEFT JOIN travel_packages tp
    ON r.package_id = tp.package_id
LEFT JOIN hotels h
    ON r.hotel_id = h.hotel_id
LEFT JOIN buses bs
    ON r.bus_id = bs.bus_id
LEFT JOIN restaurants res
    ON r.restaurant_id = res.restaurant_id;


-- =========================================================
-- 7. VIEW: HOTEL DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_hotel_details;

CREATE VIEW vw_hotel_details AS
SELECT
    h.hotel_id,
    h.hotel_name,
    d.destination_name,
    d.state,
    h.address,
    h.star_rating,
    h.status,
    u.full_name AS vendor_name
FROM hotels h
LEFT JOIN destinations d
    ON h.destination_id = d.destination_id
LEFT JOIN users u
    ON h.vendor_id = u.user_id;


-- =========================================================
-- 8. VIEW: AVAILABLE ROOMS
-- =========================================================

DROP VIEW IF EXISTS vw_available_rooms;

CREATE VIEW vw_available_rooms AS
SELECT
    r.room_id,
    h.hotel_name,
    r.room_number,
    r.room_type,
    r.capacity,
    r.price_per_night,
    r.status
FROM rooms r
JOIN hotels h
    ON r.hotel_id = h.hotel_id
WHERE r.status = 'available';


-- =========================================================
-- 9. VIEW: BUS DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_bus_details;

CREATE VIEW vw_bus_details AS
SELECT
    b.bus_id,
    b.bus_name,
    b.bus_type,
    b.from_location,
    b.to_location,
    b.departure_time,
    b.arrival_time,
    b.price,
    b.total_seats,
    b.status,
    u.full_name AS vendor_name
FROM buses b
LEFT JOIN users u
    ON b.vendor_id = u.user_id;


-- =========================================================
-- 10. VIEW: RESTAURANT DETAILS
-- =========================================================

DROP VIEW IF EXISTS vw_restaurant_details;

CREATE VIEW vw_restaurant_details AS
SELECT
    r.restaurant_id,
    r.restaurant_name,
    d.destination_name,
    d.state,
    r.cuisine,
    r.address,
    r.price_range,
    r.rating,
    r.status,
    u.full_name AS vendor_name
FROM restaurants r
LEFT JOIN destinations d
    ON r.destination_id = d.destination_id
LEFT JOIN users u
    ON r.vendor_id = u.user_id;


-- =========================================================
-- 11. VIEW: SALES REPORT
-- =========================================================

DROP VIEW IF EXISTS vw_sales_report;

CREATE VIEW vw_sales_report AS
SELECT
    DATE(b.booking_date) AS booking_day,
    COUNT(DISTINCT b.booking_id) AS total_bookings,
    SUM(
        CASE
            WHEN p.payment_status = 'Successful'
            THEN p.amount
            ELSE 0
        END
    ) AS successful_revenue
FROM bookings b
LEFT JOIN payments p
    ON b.booking_id = p.booking_id
GROUP BY DATE(b.booking_date);


-- =========================================================
-- 12. STORED PROCEDURE: GET PACKAGE DETAILS
-- =========================================================

DROP PROCEDURE IF EXISTS GetPackageDetails;

DELIMITER $$

CREATE PROCEDURE GetPackageDetails(IN p_package_id INT)
BEGIN
    SELECT
        tp.package_id,
        tp.package_name,
        tp.description,
        tp.duration_days,
        tp.base_price,
        tp.max_people,
        tp.category,
        tp.status,
        d.destination_name,
        d.state,
        pd.day_number,
        pd.visit_order,
        pd.stay_nights,
        pd.notes
    FROM travel_packages tp
    LEFT JOIN package_destinations pd
        ON tp.package_id = pd.package_id
    LEFT JOIN destinations d
        ON pd.destination_id = d.destination_id
    WHERE tp.package_id = p_package_id
    ORDER BY pd.day_number, pd.visit_order;
END $$

DELIMITER ;


-- =========================================================
-- 13. STORED PROCEDURE: GET CUSTOMER BOOKINGS
-- =========================================================

DROP PROCEDURE IF EXISTS GetCustomerBookings;

DELIMITER $$

CREATE PROCEDURE GetCustomerBookings(IN p_user_id INT)
BEGIN
    SELECT
        b.booking_id,
        b.booking_code,
        b.booking_date,
        b.travel_date,
        b.no_of_people,
        b.total_amount,
        b.booking_status,
        p.payment_status
    FROM bookings b
    LEFT JOIN payments p
        ON b.booking_id = p.booking_id
    WHERE b.user_id = p_user_id
    ORDER BY b.booking_date DESC;
END $$

DELIMITER ;


-- =========================================================
-- 14. STORED PROCEDURE: GET PACKAGE PRICE
-- =========================================================

DROP PROCEDURE IF EXISTS GetPackagePrice;

DELIMITER $$

CREATE PROCEDURE GetPackagePrice(
    IN p_package_id INT,
    IN p_people INT
)
BEGIN
    SELECT
        tp.package_id,
        tp.package_name,
        tp.base_price,
        p_people AS number_of_people,
        ROUND(tp.base_price * p_people, 2) AS total_price
    FROM travel_packages tp
    WHERE tp.package_id = p_package_id
      AND p_people > 0
      AND p_people <= tp.max_people;
END $$

DELIMITER ;


-- =========================================================
-- 15. STORED PROCEDURE: GET SALES REPORT
-- =========================================================

DROP PROCEDURE IF EXISTS GetSalesReport;

DELIMITER $$

CREATE PROCEDURE GetSalesReport()
BEGIN
    SELECT
        COUNT(DISTINCT b.booking_id) AS total_bookings,
        COUNT(
            DISTINCT CASE
                WHEN b.booking_status = 'Confirmed'
                THEN b.booking_id
            END
        ) AS confirmed_bookings,
        COUNT(
            DISTINCT CASE
                WHEN b.booking_status = 'Completed'
                THEN b.booking_id
            END
        ) AS completed_bookings,
        COUNT(
            DISTINCT CASE
                WHEN b.booking_status = 'Cancelled'
                THEN b.booking_id
            END
        ) AS cancelled_bookings,
        COALESCE(
            SUM(
                CASE
                    WHEN p.payment_status = 'Successful'
                    THEN p.amount
                    ELSE 0
                END
            ),
            0
        ) AS successful_revenue
    FROM bookings b
    LEFT JOIN payments p
        ON b.booking_id = p.booking_id;
END $$

DELIMITER ;


-- =========================================================
-- 16. FUNCTION: CALCULATE PACKAGE TOTAL
-- =========================================================

DROP FUNCTION IF EXISTS CalculatePackageTotal;

DELIMITER $$

CREATE FUNCTION CalculatePackageTotal(
    p_package_id INT,
    p_people INT
)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    DECLARE v_base_price DECIMAL(10,2);
    DECLARE v_total DECIMAL(12,2);

    SELECT base_price
    INTO v_base_price
    FROM travel_packages
    WHERE package_id = p_package_id;

    SET v_total = v_base_price * p_people;

    RETURN v_total;
END $$

DELIMITER ;


-- =========================================================
-- 17. FUNCTION: GET SUCCESSFUL REVENUE
-- =========================================================

DROP FUNCTION IF EXISTS GetSuccessfulRevenue;

DELIMITER $$

CREATE FUNCTION GetSuccessfulRevenue(
    p_booking_id INT
)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    DECLARE v_amount DECIMAL(12,2);

    SELECT COALESCE(SUM(amount), 0)
    INTO v_amount
    FROM payments
    WHERE booking_id = p_booking_id
      AND payment_status = 'Successful';

    RETURN v_amount;
END $$

DELIMITER ;


-- =========================================================
-- END OF 04_Views_Procedures.sql
-- =========================================================