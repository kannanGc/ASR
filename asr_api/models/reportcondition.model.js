module.exports = function (sequelize, DataTypes) {
    var ReportCondition = sequelize.define("ReportCondition", {
        conditionId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        reportId: DataTypes.INTEGER,
        tableName: DataTypes.STRING,
        columnName: DataTypes.STRING,
        filter: DataTypes.STRING,
        filterValue: DataTypes.STRING,
        type: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING
    },
        {
            timestamps: true
        }
    );

    return ReportCondition;
};
