/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `FilterTypeReferences` (
  `filtertypereferenceid` int(11) NOT NULL AUTO_INCREMENT,
  `sqltype` varchar(20) NOT NULL,
  `filtertype` varchar(20) NOT NULL,
  PRIMARY KEY (`filtertypereferenceid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;
