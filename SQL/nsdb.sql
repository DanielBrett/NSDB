-- phpMyAdmin SQL Dump
-- version 5.1.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2021 at 06:51 PM
-- Server version: 10.6.4-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodate`
--

CREATE TABLE `accommodate` (
  `ActivityName` char(25) NOT NULL DEFAULT '',
  `fTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accommodate`
--

INSERT INTO `accommodate` (`ActivityName`, `fTypeID`) VALUES
('badminton', 75),
('basketball', 74),
('football', 73),
('jumping', 76),
('running', 77),
('soccer', 72);

-- --------------------------------------------------------

--
-- Table structure for table `Activities`
--

CREATE TABLE `Activities` (
  `activityName` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Activities`
--

INSERT INTO `Activities` (`activityName`) VALUES
('badminton'),
('basketball'),
('football'),
('hockey'),
('jumping'),
('running'),
('soccer');

-- --------------------------------------------------------

--
-- Table structure for table `builtOf`
--

CREATE TABLE `builtOf` (
  `activityName` char(25) NOT NULL DEFAULT '',
  `eventID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

CREATE TABLE `contains` (
  `divID` int(11) NOT NULL DEFAULT 0,
  `eventID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contains`
--

INSERT INTO `contains` (`divID`, `eventID`) VALUES
(5, 13),
(6, 14);

-- --------------------------------------------------------

--
-- Table structure for table `Division`
--

CREATE TABLE `Division` (
  `divID` int(11) NOT NULL,
  `divisionName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Division`
--

INSERT INTO `Division` (`divID`, `divisionName`) VALUES
(5, 'AAA'),
(6, 'AA');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `eventID` int(11) NOT NULL,
  `contactName` varchar(100) DEFAULT NULL,
  `contactEmail` varchar(100) DEFAULT NULL,
  `contactPhone` int(11) DEFAULT NULL,
  `nameOfEvent` varchar(100) DEFAULT NULL,
  `regCost` double DEFAULT NULL,
  `eoYear` year(4) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `eCity` varchar(100) DEFAULT NULL,
  `frequency` char(8) DEFAULT NULL,
  `maleFemaleBoth` char(1) DEFAULT NULL,
  `childAdultBoth` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`eventID`, `contactName`, `contactEmail`, `contactPhone`, `nameOfEvent`, `regCost`, `eoYear`, `startDate`, `endDate`, `eCity`, `frequency`, `maleFemaleBoth`, `childAdultBoth`) VALUES
(13, 'Santiago', 'santiago@email.com', 234, 'Olympics', 500, 2020, '2020-11-01', '2020-12-02', 'Toronto', '3', 'B', 'B'),
(14, 'John Smith', 'someperson@email.com', 999, 'GNBA', 300, 2020, '2020-10-02', '2020-10-21', 'Niagara Falls', '5', 'B', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `Facility`
--

CREATE TABLE `Facility` (
  `facID` int(11) NOT NULL,
  `facilityName` varchar(255) DEFAULT NULL,
  `ownerID` int(11) NOT NULL,
  `fTypeID` int(11) NOT NULL,
  `streetNum` int(11) DEFAULT NULL,
  `streetName` varchar(255) DEFAULT NULL,
  `fPostCode` char(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Facility`
--

INSERT INTO `Facility` (`facID`, `facilityName`, `ownerID`, `fTypeID`, `streetNum`, `streetName`, `fPostCode`) VALUES
(106, 'youngs sportsplex', 105, 72, 570, 'river road', 'l3b5n4'),
(107, 'youngs sportsplex', 105, 74, 570, 'river road', 'l3b5n4'),
(109, 'abc', 106, 74, 570, 'river road', 'l3b5n4');

--
-- Triggers `Facility`
--
DELIMITER $$
CREATE TRIGGER `add_to_fHasFT` AFTER INSERT ON `Facility` FOR EACH ROW INSERT INTO fHasFt(facID, fTypeID) values(NEW.facID, NEW.fTypeID)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `add_to_oOwnsF` AFTER INSERT ON `Facility` FOR EACH ROW INSERT INTO oOwnsF(facID, ownerID) values(NEW.facID, NEW.ownerID)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Fac_Types`
--

CREATE TABLE `Fac_Types` (
  `fTypeID` int(11) NOT NULL,
  `fType` varchar(20) DEFAULT NULL,
  `ActivityName` char(25) NOT NULL,
  `indoorOutdoor` char(1) DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Fac_Types`
--

INSERT INTO `Fac_Types` (`fTypeID`, `fType`, `ActivityName`, `indoorOutdoor`, `length`, `width`, `height`) VALUES
(72, 'field', 'soccer', 'o', 100, 100, 0),
(73, 'field', 'football', 'o', 100, 100, 0),
(74, 'court', 'basketball', 'i', 50, 50, 30),
(75, 'court', 'badminton', 'i', 50, 50, 30),
(76, 'court', 'jumping', 'o', 100, 100, 0),
(77, 'hard court', 'running', 'o', 200, 200, 0);

--
-- Triggers `Fac_Types`
--
DELIMITER $$
CREATE TRIGGER `add_to_accomodate` AFTER INSERT ON `Fac_Types` FOR EACH ROW INSERT INTO accommodate(ActivityName, fTypeID) values(NEW.ActivityName, NEW.fTypeID)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `fHasFt`
--

CREATE TABLE `fHasFt` (
  `facID` int(11) NOT NULL,
  `fTypeID` int(11) NOT NULL DEFAULT 0,
  `fhftUntil` date DEFAULT NULL,
  `fhftSince` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fHasFt`
--

INSERT INTO `fHasFt` (`facID`, `fTypeID`, `fhftUntil`, `fhftSince`) VALUES
(106, 72, NULL, NULL),
(107, 74, NULL, NULL),
(108, 74, NULL, NULL),
(109, 74, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `heldAt`
--

CREATE TABLE `heldAt` (
  `facID` int(11) NOT NULL DEFAULT 0,
  `eventID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `heldAt`
--

INSERT INTO `heldAt` (`facID`, `eventID`) VALUES
(100, 13),
(102, 14);

-- --------------------------------------------------------

--
-- Table structure for table `hostedBy`
--

CREATE TABLE `hostedBy` (
  `eventID` int(11) NOT NULL,
  `ownerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hostedBy`
--

INSERT INTO `hostedBy` (`eventID`, `ownerID`) VALUES
(13, 1),
(14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Host_Hotels`
--

CREATE TABLE `Host_Hotels` (
  `hotelID` int(11) NOT NULL,
  `hotelName` varchar(100) DEFAULT NULL,
  `hhPostalCode` char(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `oOwnsF`
--

CREATE TABLE `oOwnsF` (
  `ownerID` int(11) NOT NULL DEFAULT 0,
  `facID` int(11) NOT NULL,
  `since` date NOT NULL,
  `until` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oOwnsF`
--

INSERT INTO `oOwnsF` (`ownerID`, `facID`, `since`, `until`) VALUES
(105, 106, '0000-00-00', '0000-00-00'),
(105, 107, '0000-00-00', '0000-00-00'),
(106, 108, '0000-00-00', '0000-00-00'),
(106, 109, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `Ownership_Org`
--

CREATE TABLE `Ownership_Org` (
  `ownerID` int(11) NOT NULL,
  `ownerName` varchar(100) DEFAULT NULL,
  `oType` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Ownership_Org`
--

INSERT INTO `Ownership_Org` (`ownerID`, `ownerName`, `oType`) VALUES
(101, 'bob', 'ind'),
(102, 'brock', 'org'),
(103, 'undefined', 'undefined'),
(104, 'fah', 'ind'),
(105, 'city of welland', 'public'),
(106, 'def', 'org');

-- --------------------------------------------------------

--
-- Table structure for table `Participants`
--

CREATE TABLE `Participants` (
  `particID` int(11) NOT NULL,
  `pPostCode` char(15) NOT NULL,
  `teamSize` int(11) NOT NULL,
  `pCity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Participants`
--

INSERT INTO `Participants` (`particID`, `pPostCode`, `teamSize`, `pCity`) VALUES
(9, 'L2M3G4', 5, 'Toronto'),
(10, 'L4M6G4', 4, 'Welland'),
(11, 'undefined', 0, 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `participateIn`
--

CREATE TABLE `participateIn` (
  `particID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participateIn`
--

INSERT INTO `participateIn` (`particID`, `eventID`) VALUES
(9, 13),
(10, 14);

-- --------------------------------------------------------

--
-- Table structure for table `reserves`
--

CREATE TABLE `reserves` (
  `hotelID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodate`
--
ALTER TABLE `accommodate`
  ADD PRIMARY KEY (`ActivityName`,`fTypeID`);

--
-- Indexes for table `Activities`
--
ALTER TABLE `Activities`
  ADD PRIMARY KEY (`activityName`);

--
-- Indexes for table `builtOf`
--
ALTER TABLE `builtOf`
  ADD PRIMARY KEY (`activityName`,`eventID`);

--
-- Indexes for table `contains`
--
ALTER TABLE `contains`
  ADD PRIMARY KEY (`divID`,`eventID`);

--
-- Indexes for table `Division`
--
ALTER TABLE `Division`
  ADD PRIMARY KEY (`divID`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `Facility`
--
ALTER TABLE `Facility`
  ADD PRIMARY KEY (`facID`);

--
-- Indexes for table `Fac_Types`
--
ALTER TABLE `Fac_Types`
  ADD PRIMARY KEY (`fTypeID`);

--
-- Indexes for table `fHasFt`
--
ALTER TABLE `fHasFt`
  ADD PRIMARY KEY (`facID`,`fTypeID`);

--
-- Indexes for table `heldAt`
--
ALTER TABLE `heldAt`
  ADD PRIMARY KEY (`facID`,`eventID`);

--
-- Indexes for table `hostedBy`
--
ALTER TABLE `hostedBy`
  ADD PRIMARY KEY (`eventID`,`ownerID`);

--
-- Indexes for table `Host_Hotels`
--
ALTER TABLE `Host_Hotels`
  ADD PRIMARY KEY (`hotelID`);

--
-- Indexes for table `oOwnsF`
--
ALTER TABLE `oOwnsF`
  ADD PRIMARY KEY (`ownerID`,`facID`);

--
-- Indexes for table `Ownership_Org`
--
ALTER TABLE `Ownership_Org`
  ADD PRIMARY KEY (`ownerID`);

--
-- Indexes for table `Participants`
--
ALTER TABLE `Participants`
  ADD PRIMARY KEY (`particID`);

--
-- Indexes for table `participateIn`
--
ALTER TABLE `participateIn`
  ADD PRIMARY KEY (`particID`,`eventID`);

--
-- Indexes for table `reserves`
--
ALTER TABLE `reserves`
  ADD PRIMARY KEY (`hotelID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Division`
--
ALTER TABLE `Division`
  MODIFY `divID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Facility`
--
ALTER TABLE `Facility`
  MODIFY `facID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `Fac_Types`
--
ALTER TABLE `Fac_Types`
  MODIFY `fTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `Host_Hotels`
--
ALTER TABLE `Host_Hotels`
  MODIFY `hotelID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Ownership_Org`
--
ALTER TABLE `Ownership_Org`
  MODIFY `ownerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `Participants`
--
ALTER TABLE `Participants`
  MODIFY `particID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
