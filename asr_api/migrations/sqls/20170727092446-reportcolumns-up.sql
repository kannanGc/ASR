/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `ReportColumns` (
  `ColumnId` int(11) NOT NULL AUTO_INCREMENT,
  `ReportId` int(11) NOT NULL,
  `TableName` varchar(200) NOT NULL,
  `ColumnName` varchar(200) NOT NULL,
  `Alias` varchar(200) DEFAULT NULL,
  `Aggregate` varchar(30) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(100) NOT NULL,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` varchar(100) NOT NULL,
  PRIMARY KEY (`ColumnId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1118 ;


ALTER TABLE `ReportColumns`
ADD CONSTRAINT `fk_reportcolumns_reportid` FOREIGN KEY (`ReportId`) REFERENCES `Reports` (`ReportId`);