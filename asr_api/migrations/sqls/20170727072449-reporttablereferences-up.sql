/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS `ReportTableReferences` (
  `reporttablerederenceid` int(11) NOT NULL AUTO_INCREMENT,
  `tablename` varchar(200) NOT NULL,
  `referencetablename` varchar(200) NOT NULL,
  `tablekey` varchar(100) NOT NULL,
  `referencetablekey` varchar(100) NOT NULL,
  PRIMARY KEY (`reporttablerederenceid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;
