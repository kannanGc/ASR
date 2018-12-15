module.exports = function (sequelize, DataTypes) {
    var ReportTable = sequelize.define("ReportTable", {
        reportTableId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tableName: DataTypes.STRING
    },
        {
            timestamps: true
        }
    );

    return ReportTable;
};
