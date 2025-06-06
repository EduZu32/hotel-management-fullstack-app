-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2025 a las 22:41:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aplicacion_hotel`

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS aplicacion_hotel
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

-- Usar la base de datos creada
USE aplicacion_hotel;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `account` (
  `account_client_id` int(11) NOT NULL,
  `account_passwd` varchar(100) DEFAULT NULL,
  `account_points` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`account_client_id`, `account_passwd`, `account_points`) VALUES
(17, '$2b$10$nrg60G09laFJ2JjqXQLk0uVFw4eqEHYLdBqs4iQ0p38BNSF3/1.R2', 140),
(19, '$2b$10$n6JToE1pPsyDjIkyHW7spO9zsYfXeVAjVg24PmOdvzK.s0JWs2DS6', 140),
(26, '$2b$10$ehpMf72akXvlcH9ZOopig.GbJrr.F3/byBQeFQfFWXLNTewNr0DF.', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_doc_type` varchar(10) NOT NULL,
  `client_doc_id` varchar(10) NOT NULL,
  `client_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `client_surname_one` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `client_surname_two` varchar(20) NOT NULL,
  `client_telephone` int(20) NOT NULL,
  `client_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`client_id`, `client_doc_type`, `client_doc_id`, `client_name`, `client_surname_one`, `client_surname_two`, `client_telephone`, `client_email`) VALUES
(17, 'dni', '214235423r', 'Eduard', 'Ciprian', '', 222333444, 'eduzu@gmail.com'),
(19, 'DNI', '12345678L', 'Prueba', 'Nueva', 'Cuenta', 123456789, 'prueba@email.com'),
(26, '', '', 'Prueba', 'Correo', 'Duplicado', 123456789, 'prueba1@email.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contact_messages`
--

CREATE TABLE `contact_messages` (
  `msg_id` int(11) NOT NULL,
  `msg_name` varchar(100) DEFAULT NULL,
  `msg_surname` varchar(100) DEFAULT NULL,
  `msg_email` varchar(150) DEFAULT NULL,
  `msg_subject` varchar(150) DEFAULT NULL,
  `msg_content` text DEFAULT NULL,
  `msg_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contact_messages`
--

INSERT INTO `contact_messages` (`msg_id`, `msg_name`, `msg_surname`, `msg_email`, `msg_subject`, `msg_content`, `msg_date`) VALUES
(7, 'PruebaServicio', 'Uno', 'pruebaServicio@email.com', 'consulta', 'Se puede contratar el servicio yaen el hotel?', '2025-05-11 15:35:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_doc_id` varchar(15) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `emp_surname_one` varchar(10) NOT NULL,
  `emp_surname_two` varchar(50) DEFAULT NULL,
  `emp_telephone` int(10) NOT NULL,
  `emp_email` varchar(100) NOT NULL,
  `emp_manager_id` int(11) NOT NULL,
  `emp_password` varchar(100) NOT NULL,
  `emp_hotel_id` varchar(20) NOT NULL,
  `emp_role` enum('manager','staff') NOT NULL DEFAULT 'staff',
  `emp_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_doc_id`, `emp_name`, `emp_surname_one`, `emp_surname_two`, `emp_telephone`, `emp_email`, `emp_manager_id`, `emp_password`, `emp_hotel_id`, `emp_role`, `emp_active`) VALUES
(2, '12345678', 'Juan', 'Pérez', 'Gómez', 987654321, 'juan.perez@email.com', 1, '$2a$10$XOZ5spTY86COtFTk7CMaY.EgF.NH4OQgvpH4sPbLW4lZ92GJnUzyu', '1', 'staff', 1),
(4, '00000000X', 'Ana', 'López', '', 600123456, 'ana.manager@email.com', 1, '$2b$10$XK2c7Z8VfMZuCBnB4v/OCOSI7TpVMFQY2020dZhG0g1mtTsQE0Nv2', '1', 'manager', 1),
(6, '12345678Z', 'Eduzu', 'Cip', '', 654987321, 'edu.admin@email.com', 0, '$2a$10$rzLK1Q76S.latY5r1tn9k.w6uzLdtq4gfa1kmmXlneJ8kQ.k860P2', '1', 'staff', 0),
(8, '98765432P', 'Carlos', 'Pérez', 'López', 600112233, 'carlos.perez@email.com', 4, '$2a$10$R5uM4E/XYetxtrnzDg3lYelkn3GJHLJIM8RDkTo/jkeiMGCEexMai', '1', 'staff', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee_reservation_log`
--

CREATE TABLE `employee_reservation_log` (
  `log_res_id` int(11) NOT NULL,
  `log_emp_id` int(11) NOT NULL,
  `log_op_date` datetime NOT NULL,
  `log_db_query` text NOT NULL,
  `log_db_original` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guest`
--

CREATE TABLE `guest` (
  `guest_id` int(11) NOT NULL,
  `guest_name` varchar(100) NOT NULL,
  `guest_lastname` varchar(100) NOT NULL,
  `guest_email` varchar(100) DEFAULT NULL,
  `guest_phone` varchar(20) DEFAULT NULL,
  `guest_preferences` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `hotel_id` int(6) NOT NULL,
  `hotel_address` varchar(20) NOT NULL,
  `hotel_telephone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`hotel_id`, `hotel_address`, `hotel_telephone`) VALUES
(1, 'Calle Ejemplo 123, C', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `invoice_code_transact` int(11) DEFAULT NULL,
  `invoice_details` text DEFAULT NULL,
  `invoice_pay_method` varchar(10) DEFAULT NULL,
  `invoice_points_used` int(11) DEFAULT NULL,
  `invoice_total_price` decimal(10,2) DEFAULT NULL,
  `invoice_date` date DEFAULT curdate(),
  `invoice_res_id` int(11) DEFAULT NULL,
  `invoice_client_id` int(11) DEFAULT NULL,
  `invoice_guest_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_code_transact`, `invoice_details`, `invoice_pay_method`, `invoice_points_used`, `invoice_total_price`, `invoice_date`, `invoice_res_id`, `invoice_client_id`, `invoice_guest_id`) VALUES
(61, NULL, 'Habitación plus-family, 4 noches', 'Tarjeta', 0, 677.55, '2025-05-11', 85, 19, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `res_id` int(6) NOT NULL,
  `res_client_id` int(11) DEFAULT NULL,
  `res_room_id` int(6) NOT NULL,
  `res_room_hotel_id` int(6) NOT NULL,
  `res_checkin` date NOT NULL,
  `res_checkout` date NOT NULL,
  `res_hour_checkin` datetime(6) NOT NULL,
  `res_hour_checkout` datetime(6) NOT NULL,
  `res_is_checkin` tinyint(1) NOT NULL,
  `res_is_checkout` tinyint(1) NOT NULL,
  `res_is_closed` tinyint(1) NOT NULL,
  `res_checkin_by` int(6) DEFAULT NULL,
  `res_checkout_by` int(6) DEFAULT NULL,
  `res_observations` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `res_wants_double` tinyint(1) NOT NULL,
  `res_file_one` varchar(255) DEFAULT NULL,
  `res_file_two` varchar(255) DEFAULT NULL,
  `res_file_three` varchar(255) DEFAULT NULL,
  `res_guest_id` int(11) DEFAULT NULL,
  `res_add_points` int(11) DEFAULT 0,
  `res_adults` int(11) NOT NULL DEFAULT 1,
  `res_children` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `reservation`
--

INSERT INTO `reservation` (`res_id`, `res_client_id`, `res_room_id`, `res_room_hotel_id`, `res_checkin`, `res_checkout`, `res_hour_checkin`, `res_hour_checkout`, `res_is_checkin`, `res_is_checkout`, `res_is_closed`, `res_checkin_by`, `res_checkout_by`, `res_observations`, `res_wants_double`, `res_file_one`, `res_file_two`, `res_file_three`, `res_guest_id`, `res_add_points`, `res_adults`, `res_children`) VALUES
(85, 19, 21, 1, '2025-05-20', '2025-05-24', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000', 0, 0, 0, NULL, NULL, 'Me gustaria que fuera un habitacion exterior. OK', 0, 'res_file_one-1746978088907.docx', NULL, NULL, NULL, 70, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `room_hotel_id` int(11) NOT NULL,
  `room_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `room_capacity` int(1) NOT NULL,
  `room_is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;

--
-- Volcado de datos para la tabla `room`
--

INSERT INTO `room` (`room_id`, `room_hotel_id`, `room_type`, `room_capacity`, `room_is_enabled`) VALUES
(3, 1, 'suite', 4, 1),
(4, 1, 'suite', 4, 1),
(21, 1, 'plus-family', 4, 1),
(22, 1, 'plus-family', 4, 1),
(23, 1, 'plus-family', 4, 0),
(24, 1, 'plus-family', 4, 1),
(25, 1, 'plus-family', 4, 1),
(26, 1, 'plus-family', 4, 0),
(27, 1, 'plus-family', 4, 1),
(28, 1, 'plus-family', 4, 1),
(29, 1, 'plus-family', 4, 1),
(30, 1, 'plus-family', 4, 1),
(31, 1, 'plus-family', 4, 1),
(32, 1, 'plus-family', 4, 1),
(33, 1, 'plus-family', 4, 1),
(34, 1, 'plus-family', 4, 0),
(35, 1, 'plus-family', 4, 1),
(36, 1, 'plus', 2, 0),
(37, 1, 'plus', 2, 0),
(38, 1, 'plus', 2, 1),
(39, 1, 'plus', 2, 1),
(40, 1, 'plus', 2, 1),
(41, 1, 'plus', 2, 1),
(42, 1, 'plus', 2, 1),
(43, 1, 'plus', 2, 1),
(44, 1, 'plus', 2, 1),
(45, 1, 'plus', 2, 0),
(46, 1, 'plus', 2, 1),
(47, 1, 'plus', 2, 1),
(48, 1, 'plus', 2, 1),
(49, 1, 'plus', 2, 1),
(50, 1, 'plus', 2, 1),
(51, 1, 'plus', 2, 1),
(52, 1, 'plus', 2, 1),
(53, 1, 'plus', 2, 0),
(54, 1, 'plus', 2, 1),
(55, 1, 'plus', 2, 1),
(56, 1, 'suite', 4, 1),
(57, 1, 'suite', 4, 1),
(58, 1, 'suite', 4, 0),
(59, 1, 'standard', 2, 1),
(60, 1, 'standard-family', 4, 1),
(61, 1, 'standard', 2, 1),
(62, 1, 'standard-family', 4, 1),
(63, 1, 'standard-family', 4, 0),
(64, 1, 'standard-family', 4, 1),
(65, 1, 'standard', 2, 1),
(66, 1, 'standard', 2, 1),
(67, 1, 'suite-family', 4, 1),
(68, 1, 'suite-family', 4, 0),
(69, 1, 'suite-family', 4, 1),
(70, 1, 'suite-family', 4, 1),
(71, 1, 'suite-family', 4, 0),
(72, 1, 'suite-family', 4, 1),
(73, 1, 'suite-family', 4, 1),
(74, 1, 'suite-family', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shift`
--

CREATE TABLE `shift` (
  `shift_id` int(11) NOT NULL,
  `shift_emp_id` int(11) NOT NULL,
  `shift_date_in` datetime(6) NOT NULL,
  `shift_date_out` datetime(6) DEFAULT NULL,
  `hours_worked` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `shift`
--

INSERT INTO `shift` (`shift_id`, `shift_emp_id`, `shift_date_in`, `shift_date_out`, `hours_worked`) VALUES
(47, 4, '2025-05-08 18:59:29.633000', '2025-05-08 19:00:44.982000', 1.25),
(48, 4, '2025-05-08 20:07:56.857000', '2025-05-08 20:35:29.417000', 27),
(49, 4, '2025-05-08 20:35:29.417000', '2025-05-09 12:10:04.614000', 934),
(50, 4, '2025-05-09 12:10:04.614000', '2025-05-09 16:15:36.689000', 245),
(51, 4, '2025-05-09 16:15:36.689000', '2025-05-09 19:15:51.216000', 180),
(52, 4, '2025-05-09 19:15:51.216000', '2025-05-09 19:19:15.590000', 3.4),
(53, 4, '2025-05-10 11:12:01.179000', '2025-05-10 14:43:05.743000', 211),
(54, 4, '2025-05-10 14:43:05.743000', '2025-05-10 14:47:57.924000', 4.86667),
(55, 4, '2025-05-11 17:40:05.983000', '2025-05-11 19:37:31.293000', 117),
(56, 2, '2025-05-11 18:31:12.579000', '2025-05-11 18:32:13.881000', 1.01667),
(57, 4, '2025-05-11 19:37:31.293000', '2025-05-11 19:38:31.902000', 1),
(58, 4, '2025-05-11 19:38:43.785000', '2025-05-11 19:38:52.862000', 0.15),
(59, 4, '2025-05-11 19:39:35.011000', '2025-05-11 20:00:16.180000', 20.6833),
(60, 4, '2025-05-11 22:18:54.739000', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_room`
--

CREATE TABLE `type_room` (
  `room_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `room_capacity` int(1) NOT NULL,
  `room_mts_square` decimal(10,0) NOT NULL,
  `room_has_views` tinyint(1) NOT NULL,
  `room_has_jacuzzi` tinyint(1) NOT NULL,
  `room_has_balcony` int(11) NOT NULL,
  `room_has_service` int(11) NOT NULL,
  `room_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `type_room`
--

INSERT INTO `type_room` (`room_type`, `room_capacity`, `room_mts_square`, `room_has_views`, `room_has_jacuzzi`, `room_has_balcony`, `room_has_service`, `room_price`) VALUES
('plus', 2, 22, 0, 0, 0, 1, 80.00),
('plus-family', 4, 30, 0, 0, 0, 1, 139.99),
('standard', 2, 18, 0, 0, 0, 0, 60.00),
('standard-family', 4, 25, 0, 0, 0, 0, 100.00),
('suite', 2, 30, 1, 1, 1, 1, 120.00),
('suite-family', 4, 45, 1, 1, 1, 1, 210.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_client_id`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_email` (`client_email`);

--
-- Indices de la tabla `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_email` (`emp_email`),
  ADD UNIQUE KEY `emp_email_2` (`emp_email`),
  ADD UNIQUE KEY `emp_doc_id` (`emp_doc_id`);

--
-- Indices de la tabla `employee_reservation_log`
--
ALTER TABLE `employee_reservation_log`
  ADD PRIMARY KEY (`log_res_id`,`log_emp_id`),
  ADD KEY `log-employee` (`log_emp_id`);

--
-- Indices de la tabla `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Indices de la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `fk_invoice_res` (`invoice_res_id`),
  ADD KEY `fk_invoice_client` (`invoice_client_id`),
  ADD KEY `fk_invoice_guest` (`invoice_guest_id`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `reservation-client` (`res_client_id`),
  ADD KEY `reservation-room` (`res_room_hotel_id`,`res_room_id`),
  ADD KEY `reservation-employee-in` (`res_checkin_by`),
  ADD KEY `reservation-employee-out` (`res_checkout_by`),
  ADD KEY `fk_reservation_guest` (`res_guest_id`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`,`room_hotel_id`) USING BTREE,
  ADD KEY `room-hotel` (`room_hotel_id`),
  ADD KEY `fk_room_type` (`room_type`);

--
-- Indices de la tabla `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`),
  ADD KEY `shift_emp_id` (`shift_emp_id`);

--
-- Indices de la tabla `type_room`
--
ALTER TABLE `type_room`
  ADD PRIMARY KEY (`room_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `guest`
--
ALTER TABLE `guest`
  MODIFY `guest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `hotel_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `res_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account-client` FOREIGN KEY (`account_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `employee_reservation_log`
--
ALTER TABLE `employee_reservation_log`
  ADD CONSTRAINT `log-employee` FOREIGN KEY (`log_emp_id`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `log-reservation` FOREIGN KEY (`log_res_id`) REFERENCES `reservation` (`res_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_invoice_client` FOREIGN KEY (`invoice_client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `fk_invoice_guest` FOREIGN KEY (`invoice_guest_id`) REFERENCES `guest` (`guest_id`),
  ADD CONSTRAINT `fk_invoice_res` FOREIGN KEY (`invoice_res_id`) REFERENCES `reservation` (`res_id`);

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_guest` FOREIGN KEY (`res_guest_id`) REFERENCES `guest` (`guest_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reservation-client` FOREIGN KEY (`res_client_id`) REFERENCES `client` (`client_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-in` FOREIGN KEY (`res_checkin_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-employee-out` FOREIGN KEY (`res_checkout_by`) REFERENCES `employee` (`emp_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation-room` FOREIGN KEY (`res_room_hotel_id`,`res_room_id`) REFERENCES `room` (`room_hotel_id`, `room_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_type` FOREIGN KEY (`room_type`) REFERENCES `type_room` (`room_type`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room-hotel` FOREIGN KEY (`room_hotel_id`) REFERENCES `hotel` (`hotel_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `shift`
--
ALTER TABLE `shift`
  ADD CONSTRAINT `shift_ibfk_1` FOREIGN KEY (`shift_emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
