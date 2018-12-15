var _ = require('lodash');

exports.buildJoinCondition = function (tables, relationships, knexquery, callback) {
    var joinedtables = [];
    var tablesyettojoin = tables;
    var isNextIteration = true;

    while (tablesyettojoin.length > 0 && isNextIteration == true) {
        var preJoinedTablesCount = joinedtables.length;

        for (var key in tablesyettojoin) {
            var currentTable = tablesyettojoin[key];

            if (joinedtables.length == 0) {
                knexquery = knexquery.from(currentTable);
                joinedtables.push(currentTable);
                _.remove(tablesyettojoin, function (table) {
                    return table === currentTable
                });
            }
            else {
                var currentTableReferences = _.filter(relationships, { 'tablename': currentTable });
                var joinedTableMatchedReferences = _(currentTableReferences).keyBy('referencetablename').at(joinedtables).omitBy(_.isUndefined).value();

                if (_.isEmpty(joinedTableMatchedReferences)) {
                    
                }
                else {
                    knexquery = knexquery.innerJoin(currentTable, function () {
                        for (var relationIndex in joinedTableMatchedReferences) {
                            var relationData = joinedTableMatchedReferences[relationIndex];
                            this.on(relationData.tablekey, relationData.referencetablekey);
                        }
                    });
                    joinedtables.push(currentTable);
                    _.remove(tablesyettojoin, function (table) {
                        return table === currentTable
                    });
                }
            }
        }
        var postJoinedTablesCount = joinedtables.length;
        if (preJoinedTablesCount == postJoinedTablesCount) isNextIteration = false;
        else isNextIteration = true;
    }
    if (tablesyettojoin.length > 0) return callback({ type: "validation", error: "Invalid table combination", tables: tablesyettojoin }, null);
    else return callback(null, knexquery);
}

exports.buildConditions = function (conditions, knexquery, callback) {
    for (var groups in conditions) { // Loop groups
        var conditiongroup = conditions[groups];
        if (conditiongroup.type == 'and') {
            knexquery = addANDConditionGroups(knexquery, conditiongroup);
        }
        if (conditiongroup.type == 'or') {
            knexquery = addORConditionGroups(knexquery, conditiongroup);
        }
    }
    callback(null, knexquery);
}

exports.buildSelect = function (fields, knexquery, callback) {
    var selectFields = [];
    var groupbyFields = [];
    var aggregateFields = [];

    for (var fieldIndex in fields) {
        var field = fields[fieldIndex];
        var fieldName = field.name;
        if (typeof field.alias != 'undefined' && field.alias.length > 0) fieldName = field.name + ' as ' + field.alias;

        if (field.type == 'aggregate') {
            if (field.aggregate == 'count') {
                knexquery = knexquery.count(fieldName);
            } else if (field.aggregate == 'avg') {
                knexquery = knexquery.avg(fieldName);
            } else if (field.aggregate == 'sum') {
                knexquery = knexquery.sum(fieldName);
            } else if (field.aggregate == 'max') {
                knexquery = knexquery.max(fieldName);
            } else if (field.aggregate == 'min') {
                knexquery = knexquery.min(fieldName);
            }
            aggregateFields.push(field.name);
        }
        else {
            selectFields.push(fieldName);
            groupbyFields.push(field.name);
        }
    }

    knexquery = knexquery.select(selectFields);

    if (typeof aggregateFields != 'undefined' && aggregateFields.length > 0 && typeof selectFields != 'undefined' && selectFields.length > 0) {
        knexquery = knexquery.groupBy(groupbyFields);
    }

    callback(null, knexquery);
}

//TODO : add AND/OR code to be merged.
function addANDConditionGroups(knexquery, groupmembers) {
    return knexquery.where(function () {
    //    for (var condition in groupmembers) {

            var currentCondition = groupmembers;
            var operator = currentCondition.filter;
            var value = currentCondition.filterValue;
            if (operator == "like") {
                value = "%" + value + "%";
            } else if (operator == "startswith" || operator == "endswith") {
                if (operator == "startswith") {
                    value = value + "%";
                }
                else {
                    value = "%" + value;
                }
                operator = "like";
            }
            var sqlType = currentCondition.sqlType;
            // if (currentCondition.type == 'and' || currentCondition.type == 'groupbyand') {
            if (currentCondition.type == 'and') {
                if (operator == "between") {
                    if(sqlType == "date" || sqlType == "datetime"){
                        var dateQuery = "DATE ("+currentCondition.property+")";
                        dateQuery = dateQuery+" BETWEEN ? AND ?";
                        this.whereRaw(dateQuery,value); 
                    }else{
                        this.whereBetween(currentCondition.property, value);    
                    }
                    
                } else if (operator == "in") {
                    this.whereIn(currentCondition.property, value);
                } else {
                    if(sqlType == "date" || sqlType == "datetime"){
                        var dateQuery = "DATE ("+currentCondition.property+")";
                        dateQuery = dateQuery+ " " +operator+" ?";
                        this.whereRaw(dateQuery, value);
                    }else{
                        this.where(currentCondition.property, operator, value);
                    }
                    
                }

            }
            // else if (currentCondition.type == 'or') {
            //     if (operator == "between") {
            //         this.orWhereBetween(currentCondition.property, value);
            //     } else if (operator == "in") {
            //         this.orWhereIn(currentCondition.property, value);
            //     } else {
            //         this.orWhere(currentCondition.property, currentCondition.operator, currentCondition.value);
            //     }
            // }
      //  }
    });
}

function addORConditionGroups(knexquery, groupmembers) {
    return knexquery.orWhere(function () {
        // for (var condition in groupmembers) {
            var currentCondition = groupmembers;
            var operator = currentCondition.filter;
            var value = currentCondition.filterValue;
            if (operator == "like") {
                value = "%" + value + "%";
            } else if (operator == "startswith" || operator == "endswith") {
                if (operator == "startswith") {
                    value = value + "%";
                }
                else {
                    value = "%" + value;
                }
                operator = "like";
            }

            // if (currentCondition.type == 'and' || currentCondition.type == 'groupbyor') {
            //     if (operator == "between") {
            //         this.whereBetween(currentCondition.property, value);
            //     } else if (operator == "in") {
            //         this.whereIn(currentCondition.property, value);
            //     } else {
            //         this.where(currentCondition.property, operator, value);
            //     }

            // }
            var sqlType = currentCondition.sqlType;
            if (currentCondition.type == 'or') {
                if (operator == "between") {
                    if(sqlType == "date" || sqlType == "datetime"){
                        var dateQuery = "DATE ("+currentCondition.property+")";
                        dateQuery = dateQuery+" BETWEEN ? AND ?";
                        this.whereRaw(dateQuery,value); 
                    }else{
                        this.orWhereBetween(currentCondition.property, value);
                    }
                    
                } else if (operator == "in") {
                    this.orWhereIn(currentCondition.property, value);
                } else {
                    if(sqlType == "date" || sqlType == "datetime"){
                        var dateQuery = "DATE ("+currentCondition.property+")";
                        dateQuery = dateQuery+ " " +operator+" ?";
                        this.whereRaw(dateQuery, value);
                    }else{
                        this.orWhere(currentCondition.property, operator, value);
                    }
                    
                }
            }
        // }
    });
}