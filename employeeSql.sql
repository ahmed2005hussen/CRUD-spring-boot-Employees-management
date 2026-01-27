CREATE DATABASE  IF NOT EXISTS `employee`;
USE `employee`;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `salary` double default null, 
  `department` varchar(50) default null,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `employee`
--

INSERT INTO `employee` VALUES 
	(1,'Ahmed','Hussein','ahmed@gmail.com', 100000, 'cs'),
	(2,'Emma','Baumgarten','emma@luv2code.com', 2002, 'is'),
	(3,'Avani','Gupta','avani@luv2code.com', 5000, 'it'),
	(4,'Yuri','Petrov','yuri@luv2code.com', 9000, 'ds'),
	(5,'Juan','Vega','juan@luv2code.com', 9000, 'ai');

