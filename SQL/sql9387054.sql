-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql9.freesqldatabase.com
-- Generation Time: Jan 26, 2021 at 09:21 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql9387054`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodate`
--

CREATE TABLE `accommodate` (
  `Activities` char(25) NOT NULL DEFAULT '',
  `fTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('basketball'),
('hockey'),
('soccer');

-- --------------------------------------------------------

--
-- Table structure for table `builtOf`
--

CREATE TABLE `builtOf` (
  `activityName` char(25) NOT NULL DEFAULT '',
  `eventID` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

CREATE TABLE `contains` (
  `divID` int(11) NOT NULL DEFAULT '0',
  `eventID` int(11) NOT NULL DEFAULT '0'
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
(100, 'hannah complex', 101, 50, 23, 'lake', 'l2m3g7'),
(101, 'hannah complex', 101, 49, 23, 'lake', 'l2m8g4'),
(102, 'brock stadium', 102, 48, 25, 'isaac', 'l5m6h7');

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
(48, 'soccer field', 'soccer', 'o', 2, 2, 2),
(49, 'basketball court', 'basketball', 'i', 2, 2, 2),
(50, 'ice rink', 'hockey', 'i', 4, 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `fHasFt`
--

CREATE TABLE `fHasFt` (
  `facID` int(11) NOT NULL,
  `fTypeID` int(11) NOT NULL DEFAULT '0',
  `fhftUntil` date DEFAULT NULL,
  `fhftSince` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `heldAt`
--

CREATE TABLE `heldAt` (
  `facID` int(11) NOT NULL DEFAULT '0',
  `eventID` int(11) NOT NULL DEFAULT '0'
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
  `ownerID` int(11) NOT NULL DEFAULT '0',
  `facID` int(11) NOT NULL,
  `since` date NOT NULL,
  `until` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(103, 'undefined', 'undefined');

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
  ADD PRIMARY KEY (`Activities`,`fTypeID`);

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
  MODIFY `facID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT for table `Fac_Types`
--
ALTER TABLE `Fac_Types`
  MODIFY `fTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `Host_Hotels`
--
ALTER TABLE `Host_Hotels`
  MODIFY `hotelID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Ownership_Org`
--
ALTER TABLE `Ownership_Org`
  MODIFY `ownerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT for table `Participants`
--
ALTER TABLE `Participants`
  MODIFY `particID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
CREATE TRIGGER add_to_fHasFT AFTER INSERT ON Facility
	FOR EACH ROW INSERT INTO fHasFT(facID, fTypeID) values(NEW.facID, NEW.fTypeID);

CREATE TRIGGER add_to_oOwnsF AFTER INSERT on Facility
	FOR EACH ROW INSERT INTO oOwnsF(facID, ownerID) values(NEW.facID, NEW.ownerID);

CREATE TRIGGER add_to_accommodate AFTER INSERT on Fac_Types
	FOR EACH ROW INSERT INTO accommodate(fTypeID, activityName) values(NEW.fTypeID, NEW.activityName);
