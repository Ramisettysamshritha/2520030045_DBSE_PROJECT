USE travel_package_portal;

-- =========================================================
-- 03_Booking_Data.sql
-- Booking, Booking Items, Payment and Review Data
-- =========================================================


-- =========================================================
-- 1. BOOKINGS
-- =========================================================

INSERT INTO bookings
(
    booking_code,
    user_id,
    booking_date,
    travel_date,
    no_of_people,
    total_amount,
    booking_status,
    notes
)
VALUES
('BK1001', 1,  '2026-09-01 10:15:00', '2026-10-15', 2, 29998.00, 'Confirmed',  'Goa vacation booking'),
('BK1002', 2,  '2026-09-02 11:20:00', '2026-11-05', 3, 56997.00, 'Confirmed',  'Kerala family trip'),
('BK1003', 3,  '2026-09-03 09:45:00', '2026-09-25', 2, 51998.00, 'Completed',  'Ladakh adventure'),
('BK1004', 4,  '2026-09-04 14:10:00', '2026-12-10', 4, 87996.00, 'Pending',    'Rajasthan heritage trip'),
('BK1005', 5,  '2026-09-05 16:30:00', '2026-10-20', 2, 17998.00, 'Confirmed',  'Agra heritage trip'),
('BK1006', 6,  '2026-09-06 12:25:00', '2026-11-15', 3, 50997.00, 'Completed',  'Manali vacation'),
('BK1007', 7,  '2026-09-07 10:05:00', '2026-12-05', 2, 45998.00, 'Confirmed',  'Meghalaya nature trip'),
('BK1008', 8,  '2026-09-08 15:40:00', '2026-10-28', 4, 39996.00, 'Cancelled',  'Trip cancelled by customer'),
('BK1009', 9,  '2026-09-09 13:15:00', '2026-11-20', 2, 37998.00, 'Completed',  'Kerala holiday'),
('BK1010', 10, '2026-09-10 11:35:00', '2026-12-15', 3, 44997.00, 'Confirmed',  'Goa beach holiday'),
('BK1011', 11, '2026-09-11 09:50:00', '2026-10-30', 2, 33998.00, 'Pending',    'Manali trip'),
('BK1012', 12, '2026-09-12 14:25:00', '2026-11-25', 5, 74995.00, 'Confirmed',  'Goa group trip'),
('BK1013', 13, '2026-09-13 10:40:00', '2026-12-20', 2, 43998.00, 'Completed',  'Rajasthan heritage trip'),
('BK1014', 14, '2026-09-14 16:05:00', '2026-10-18', 3, 29997.00, 'Confirmed',  'Meghalaya trip'),
('BK1015', 15, '2026-09-15 12:15:00', '2026-11-10', 2, 17998.00, 'Cancelled',  'Booking cancelled');


-- =========================================================
-- 2. BOOKING ITEMS
-- =========================================================

INSERT INTO booking_items
(
    booking_id,
    package_id,
    room_id,
    bus_id,
    restaurant_id,
    service_date,
    quantity,
    unit_price,
    total_price,
    item_status
)
VALUES

-- Package bookings
(1,  1, NULL, NULL, NULL, '2026-10-15', 2, 14999.00, 29998.00, 'Confirmed'),
(2,  2, NULL, NULL, NULL, '2026-11-05', 3, 18999.00, 56997.00, 'Confirmed'),
(3,  3, NULL, NULL, NULL, '2026-09-25', 2, 25999.00, 51998.00, 'Completed'),
(4,  4, NULL, NULL, NULL, '2026-12-10', 4, 21999.00, 87996.00, 'Reserved'),
(5,  5, NULL, NULL, NULL, '2026-10-20', 2, 8999.00, 17998.00, 'Confirmed'),
(6,  6, NULL, NULL, NULL, '2026-11-15', 3, 16999.00, 50997.00, 'Completed'),
(7,  7, NULL, NULL, NULL, '2026-12-05', 2, 22999.00, 45998.00, 'Confirmed'),
(8,  8, NULL, NULL, NULL, '2026-10-28', 4, 9999.00, 39996.00, 'Cancelled'),
(9,  2, NULL, NULL, NULL, '2026-11-20', 2, 18999.00, 37998.00, 'Completed'),
(10, 1, NULL, NULL, NULL, '2026-12-15', 3, 14999.00, 44997.00, 'Confirmed'),
(11, 6, NULL, NULL, NULL, '2026-10-30', 2, 16999.00, 33998.00, 'Reserved'),
(12, 1, NULL, NULL, NULL, '2026-11-25', 5, 14999.00, 74995.00, 'Confirmed'),
(13, 4, NULL, NULL, NULL, '2026-12-20', 2, 21999.00, 43998.00, 'Completed'),
(14, 8, NULL, NULL, NULL, '2026-10-18', 3, 9999.00, 29997.00, 'Confirmed'),
(15, 5, NULL, NULL, NULL, '2026-11-10', 2, 8999.00, 17998.00, 'Cancelled'),

-- Additional hotel / bus / restaurant services
(1,  NULL, 1, NULL, NULL, '2026-10-15', 1, 2500.00, 2500.00, 'Confirmed'),
(2,  NULL, 4, NULL, NULL, '2026-11-05', 1, 2800.00, 2800.00, 'Confirmed'),
(3,  NULL, NULL, 1, NULL, '2026-09-25', 2, 1200.00, 2400.00, 'Completed'),
(6,  NULL, NULL, 6, NULL, '2026-11-15', 3, 1700.00, 5100.00, 'Completed'),
(7,  NULL, NULL, NULL, 1, '2026-12-05', 2, 800.00, 1600.00, 'Confirmed');


-- =========================================================
-- 3. PAYMENTS
-- =========================================================

INSERT INTO payments
(
    booking_id,
    transaction_id,
    payment_method,
    amount,
    payment_status,
    payment_date
)
VALUES
(1,  'TXN10001', 'UPI',         29998.00, 'Successful', '2026-09-01 10:20:00'),
(2,  'TXN10002', 'Card',        56997.00, 'Successful', '2026-09-02 11:25:00'),
(3,  'TXN10003', 'UPI',         51998.00, 'Successful', '2026-09-03 09:50:00'),
(4,  'TXN10004', 'Net Banking', 87996.00, 'Pending',    '2026-09-04 14:15:00'),
(5,  'TXN10005', 'Card',        17998.00, 'Successful', '2026-09-05 16:35:00'),
(6,  'TXN10006', 'UPI',         50997.00, 'Successful', '2026-09-06 12:30:00'),
(7,  'TXN10007', 'Wallet',      45998.00, 'Successful', '2026-09-07 10:10:00'),
(8,  'TXN10008', 'Card',        39996.00, 'Refunded',   '2026-09-08 15:45:00'),
(9,  'TXN10009', 'UPI',         37998.00, 'Successful', '2026-09-09 13:20:00'),
(10, 'TXN10010', 'Card',        44997.00, 'Successful', '2026-09-10 11:40:00'),
(11, 'TXN10011', 'UPI',         33998.00, 'Pending',    '2026-09-11 09:55:00'),
(12, 'TXN10012', 'Net Banking', 74995.00, 'Successful', '2026-09-12 14:30:00'),
(13, 'TXN10013', 'UPI',         43998.00, 'Successful', '2026-09-13 10:45:00'),
(14, 'TXN10014', 'Wallet',      26997.00, 'Successful', '2026-09-14 16:10:00'),
(15, 'TXN10015', 'Card',        35998.00, 'Refunded',   '2026-09-15 12:20:00');


-- =========================================================
-- 4. REVIEWS
-- =========================================================

INSERT INTO reviews
(
    user_id,
    package_id,
    hotel_id,
    bus_id,
    restaurant_id,
    rating,
    title,
    comment,
    review_status
)
VALUES
(1,  1, NULL, NULL, NULL, 5, 'Amazing Goa Trip',
 'The beaches and overall experience were excellent.',
 'Published'),

(2,  2, NULL, NULL, NULL, 5, 'Beautiful Kerala',
 'The backwaters and scenery were wonderful.',
 'Published'),

(3,  3, NULL, NULL, NULL, 4, 'Great Adventure',
 'Ladakh was exciting and the views were amazing.',
 'Published'),

(4,  4, NULL, NULL, NULL, 5, 'Royal Rajasthan',
 'The heritage locations were beautiful.',
 'Published'),

(5,  5, NULL, NULL, NULL, 4, 'Wonderful Heritage',
 'The Taj Mahal visit was memorable.',
 'Published'),

(6,  6, NULL, NULL, NULL, 5, 'Manali Experience',
 'Beautiful mountains and enjoyable activities.',
 'Published'),

(7,  7, NULL, NULL, NULL, 5, 'Nature At Its Best',
 'Meghalaya was peaceful and scenic.',
 'Published'),

(9,  2, NULL, NULL, NULL, 4, 'Good Kerala Package',
 'Good itinerary and comfortable travel.',
 'Published'),

(10, 1, NULL, NULL, NULL, 5, 'Perfect Beach Holiday',
 'Everything was well planned.',
 'Published'),

(11, NULL, 1, NULL, NULL, 5, 'Great Resort',
 'Clean rooms and excellent location.',
 'Published'),

(12, NULL, 4, NULL, NULL, 4, 'Comfortable Stay',
 'The hotel was comfortable and clean.',
 'Published'),

(13, NULL, NULL, 1, NULL, 4, 'Good Bus Service',
 'The journey was comfortable.',
 'Published'),

(14, NULL, NULL, NULL, 1, 5, 'Delicious Food',
 'Excellent food and good service.',
 'Published'),

(15, 5, NULL, NULL, NULL, 4, 'Good Trip',
 'A useful short heritage package.',
 'Pending');


-- =========================================================
-- END OF 03_Booking_Data.sql
-- =========================================================