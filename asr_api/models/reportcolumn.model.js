module.exports = function (sequelize, DataTypes) {
    var ReportColumn = sequelize.define("ReportColumn", {
        columnId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        reportId: DataTypes.INTEGER,
        tableName: DataTypes.STRING,
        columnName: DataTypes.STRING,
        alias: DataTypes.STRING,
        aggregate: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING
    },
        {
            timestamps: true
        }
    );

    return ReportColumn;
};
