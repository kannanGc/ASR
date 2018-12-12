/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `Reports` (
  `ReportId` int(5) NOT NULL AUTO_INCREMENT,
  `ReportName` varchar(200) DEFAULT NULL,
  `Type` varchar(10) DEFAULT NULL,
  `CreatedBy` varchar(100) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` varchar(100) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ReportId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;
