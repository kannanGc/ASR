/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `ReportTables` (
  `reporttableid` int(11) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(50) NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(200) NOT NULL,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` varchar(200) NOT NULL,
  PRIMARY KEY (`reporttableid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;
