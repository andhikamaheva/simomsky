-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 21, 2016 at 02:45 PM
-- Server version: 5.6.29
-- PHP Version: 5.6.19-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `simomsky`
--

-- --------------------------------------------------------

--
-- Table structure for table `details_analysis`
--

CREATE TABLE IF NOT EXISTS `details_analysis` (
  `moms_quarterly_id` int(11) NOT NULL,
  `questions_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`moms_quarterly_id`,`questions_id`),
  KEY `fk_moms_quarterly_has_questions_questions1_idx` (`questions_id`),
  KEY `fk_moms_quarterly_has_questions_moms_quarterly1_idx` (`moms_quarterly_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Rendah', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(2, 'Sedang', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(3, 'Tinggi', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `moms`
--

CREATE TABLE IF NOT EXISTS `moms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `husband_name` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `work` varchar(255) DEFAULT NULL,
  `pregnants` int(11) DEFAULT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pregnant_status` varchar(255) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_moms_users_idx` (`users_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `moms`
--

INSERT INTO `moms` (`id`, `name`, `birthdate`, `age`, `husband_name`, `education`, `work`, `pregnants`, `address`, `city`, `status`, `pregnant_status`, `progress`, `users_id`, `created_at`, `updated_at`) VALUES
(1, 'Sri Mulyaningsih', '1990-12-18', 25, 'Alan Kuncoro', 'Sarjana', 'Ibu Rumah Tangga', 3, 'Surabaya', 'Surabaya', 'Hamil', 'Rendah', 25, 1, '2015-12-17 17:00:00', '2016-01-13 04:25:47'),
(2, 'DIana Saras Wati', '1990-04-21', 25, 'Alan Kuncoro', 'Mahasiswa', 'Mahasiswa', 4, 'Sidoarjo', 'Sidoarjo', 'Hamil', 'Tinggi', 0, 1, '2015-12-18 01:28:45', '2016-01-06 05:03:57'),
(3, 'Nindi', '1995-04-04', 21, 'Nando', 'Sarjana', 'PNS', 1, 'Surabaya', 'Surabaya', 'Selesai', 'Normal', 0, 1, '2016-01-04 13:40:00', '2016-01-04 13:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `moms_quarterly`
--

CREATE TABLE IF NOT EXISTS `moms_quarterly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregnants_id` int(11) NOT NULL,
  `quarterly_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `risk` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `helper` varchar(255) DEFAULT NULL,
  `score` decimal(10,0) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pregnants_has_quarterly_categories_quarterly_categories1_idx` (`quarterly_id`),
  KEY `fk_pregnants_has_quarterly_categories_pregnants1_idx` (`pregnants_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `moms_quarterly`
--

INSERT INTO `moms_quarterly` (`id`, `pregnants_id`, `quarterly_id`, `date`, `risk`, `treatment`, `reference`, `place`, `helper`, `score`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2016-01-06 06:53:25', NULL, NULL, NULL, NULL, NULL, NULL, 'Normal', '2016-01-05 23:53:25', '2016-01-05 23:53:25'),
(2, 2, 1, '2016-01-06 12:03:57', NULL, NULL, NULL, NULL, NULL, 0, 'Normal', '2016-01-06 05:03:57', '2016-01-06 05:03:57'),
(3, 3, 1, '2016-01-13 11:24:27', NULL, NULL, NULL, NULL, NULL, 0, 'Normal', '2016-01-13 04:24:27', '2016-01-13 04:24:27'),
(4, 4, 1, '2016-01-13 11:25:47', NULL, NULL, NULL, NULL, NULL, 0, 'Normal', '2016-01-13 04:25:47', '2016-01-13 04:25:47');

-- --------------------------------------------------------

--
-- Table structure for table `pregnants`
--

CREATE TABLE IF NOT EXISTS `pregnants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_period` date DEFAULT NULL COMMENT 'Tanggal Menstruasi Terakhir',
  `estimate` date DEFAULT NULL COMMENT 'Estimasi waktu melahirkan',
  `pregnants` int(11) DEFAULT NULL COMMENT 'Kehamilan ke',
  `last_check` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT 'Status Kehamilan :\nMasa Hamil\nMelahirkan',
  `moms_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pregnants_moms1_idx` (`moms_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `pregnants`
--

INSERT INTO `pregnants` (`id`, `last_period`, `estimate`, `pregnants`, `last_check`, `status`, `moms_id`, `created_at`, `updated_at`) VALUES
(1, '2015-01-06', '2015-10-06', 4, '2016-01-06 06:53:25', 'Masa Hamil', 1, '2016-01-05 23:53:25', '2016-01-05 23:53:25'),
(2, '2015-01-06', '2015-10-06', 4, '2016-01-06 12:03:57', 'Masa Hamil', 2, '2016-01-06 05:03:57', '2016-01-06 05:03:57'),
(3, '2016-01-05', '2016-10-05', 6, '2016-01-13 11:24:27', 'Masa Hamil', 1, '2016-01-13 04:24:26', '2016-01-13 04:24:27'),
(4, '2016-01-05', '2016-10-05', 3, '2016-01-13 11:25:47', 'Masa Hamil', 1, '2016-01-13 04:25:47', '2016-01-13 04:25:47');

-- --------------------------------------------------------

--
-- Table structure for table `quarterly`
--

CREATE TABLE IF NOT EXISTS `quarterly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `quarterly`
--

INSERT INTO `quarterly` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Triwulan 1', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(2, 'Triwulan 2', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(3, 'Triwulan 3.1', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(4, 'Triwulan 3.2', NULL, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL,
  `groups_id` int(11) NOT NULL,
  `quarterly_id` int(11) NOT NULL,
  `question` longtext,
  `score` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questions_quarterly1_idx` (`quarterly_id`),
  KEY `fk_questions_groups1_idx` (`groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `groups_id`, `quarterly_id`, `question`, `score`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Skor awal ibu hamil', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(2, 1, 1, 'Terlalu muda, hamil 1 <= 16 tahun', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(3, 1, 1, 'Terlalu lambat hamil 1, kawin >= 4 tahun', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(4, 1, 1, 'Terlalu tua, hamil 1 >= 5 tahun', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(5, 1, 1, 'Terlalu cepat hamil lagi (< 2 tahun)', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(6, 1, 1, 'Terlalu lama hamil lagi (>= 10 tahun)', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(7, 1, 1, 'Terlalu banuak anak, 4 / lebih', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(8, 1, 1, 'Terlalu tua, umur >= 35 tahun', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(9, 1, 1, 'Terlalu pendek <= 145 cm', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(10, 1, 1, 'Pernah gagal kehamilan', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(11, 1, 1, 'Pernah melahirkan dengan tarikan tang / vakum', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(12, 1, 1, 'Pernah melahirkan dengan Uri Dirogoh', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(13, 1, 3, 'Pernah melahirkan dengan Diberi infus / transfusi', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(14, 1, 1, 'Pernah Operasi Sesar', 8, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(15, 2, 2, 'Penyakit pada ibu hamil : Kurang Darah / Malaria', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(16, 2, 2, 'Penyakit pada ibu  hamil : TBC Paru / Payah Jatung', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(17, 2, 2, 'Penyakit pada ibu hamil : Kencing Manis (Diabetes)', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(18, 2, 2, 'Penyakit Menular Seksual', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(19, 2, 2, 'Bengkak pada muka / tungkai dan tekanan darah tinggi', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(20, 2, 2, 'Hamil kembar 2 atau lebih', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(21, 2, 2, 'Hamil kembar air (Hydramnion)', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(22, 2, 2, 'Bayi mati dalam kandungan', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(23, 2, 2, 'Kehamilan lebih bulan', 4, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(24, 2, 3, 'Letak sungsan', 8, NULL, NULL, NULL),
(25, 2, 3, 'Letak lintang', 8, NULL, NULL, NULL),
(26, 2, 3, 'Letak lintang', 4, 'Aktif', '2015-12-10 17:00:00', '2015-12-16 17:00:00'),
(27, 3, 3, 'Pendarahan pada kehamilan', 8, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00'),
(28, 3, 3, 'Preeklampsia berat / kejang - kejang', 8, 'Aktif', '2015-12-16 17:00:00', '2015-12-16 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `role_has_users`
--

CREATE TABLE IF NOT EXISTS `role_has_users` (
  `role_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`users_id`),
  KEY `fk_role_has_users_users1_idx` (`users_id`),
  KEY `fk_role_has_users_role1_idx` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `work` varchar(255) DEFAULT NULL,
  `latest_login` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `name`, `address`, `phone`, `work`, `latest_login`, `created_at`, `updated_at`, `remember_token`, `status`) VALUES
(1, 'andhikamaheva', '$2a$10$/JV347NlnGL9rTFIlPoeu.KXwEgeP3sPbTsIEkNoExpD9omtAxuaq', 'andhikamaheva@gmail.com', 'Andhika Maheva Wicaksono', 'Perumahan Tridasa Windu Asri D8', '085745200924', 'Programmer', '2016-01-17 20:26:26', '2015-12-16 17:00:00', '2016-01-17 20:26:26', 'k0yshsKM6MODcR5m1AEWAV0u2edlyK3KRSqtUjuk0LuYmXy1n3o1Y7ukA1ob', 'Aktif'),
(5, 'alkunjo', '$2a$10$/JV347NlnGL9rTFIlPoeu.KXwEgeP3sPbTsIEkNoExpD9omtAxuaq', 'alkunjo95@gmail.com', 'Alan Kuncoro R', 'Sidoarjo', '123', 'Calon', '2016-01-07 08:13:13', '2015-12-18 01:14:12', '2016-01-07 08:13:13', '', 'Aktif');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `details_analysis`
--
ALTER TABLE `details_analysis`
  ADD CONSTRAINT `fk_moms_quarterly_has_questions_moms_quarterly1` FOREIGN KEY (`moms_quarterly_id`) REFERENCES `moms_quarterly` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_moms_quarterly_has_questions_questions1` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `moms`
--
ALTER TABLE `moms`
  ADD CONSTRAINT `fk_moms_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `moms_quarterly`
--
ALTER TABLE `moms_quarterly`
  ADD CONSTRAINT `fk_pregnants_has_quarterly_categories_pregnants1` FOREIGN KEY (`pregnants_id`) REFERENCES `pregnants` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pregnants_has_quarterly_categories_quarterly_categories1` FOREIGN KEY (`quarterly_id`) REFERENCES `quarterly` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pregnants`
--
ALTER TABLE `pregnants`
  ADD CONSTRAINT `fk_pregnants_moms1` FOREIGN KEY (`moms_id`) REFERENCES `moms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_questions_quarterly1` FOREIGN KEY (`quarterly_id`) REFERENCES `quarterly` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `role_has_users`
--
ALTER TABLE `role_has_users`
  ADD CONSTRAINT `fk_role_has_users_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_role_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
