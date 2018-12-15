var reportdatamap = {
    reportid: 'reportid',
    reportname: { column: 'reportname' },
    columns: [{
        columnid: 'columnid',
        tablename: 'tablename',
        columnname: 'columnname',
        alias: 'alias',
        aggregate: 'aggregate'
    }],
    conditions: [{
        conditionid: 'conditionid',
        conditiontype: 'condition_type',
        columnname: 'condition_columnname',
        filter: 'condition_filter',
        filtervalue: 'condition_filtervalue'
    }]
}

module.exports = reportdatamap;