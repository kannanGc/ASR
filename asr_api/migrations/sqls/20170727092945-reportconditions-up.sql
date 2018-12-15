/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS `ReportConditions` (
  `ConditionId` int(11) NOT NULL AUTO_INCREMENT,
  `Reportid` int(11) NOT NULL,
  `TableName` varchar(200) NOT NULL,
  `ColumnName` varchar(200) NOT NULL,
  `Filter` varchar(30) NOT NULL,
  `FilterValue` varchar(500) NOT NULL,
  `Type` varchar(10) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(100) NOT NULL,
  `UpdatedBy` varchar(100) NOT NULL,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ConditionId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

ALTER TABLE `ReportConditions`
ADD CONSTRAINT `fk_reportconditions_reportid` FOREIGN KEY (`Reportid`) REFERENCES `Reports` (`ReportId`);