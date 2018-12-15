/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `ReportFilters` (
  `Reportfilterid` int(11) NOT NULL AUTO_INCREMENT,
  `filtertype` varchar(10) NOT NULL,
  `filterdesc` varchar(50) NOT NULL,
  `filteroperator` varchar(20) NOT NULL,
  PRIMARY KEY (`Reportfilterid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;
