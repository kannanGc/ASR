module.exports = function (sequelize, DataTypes) {
    var ReportTableReference = sequelize.define("ReportTableReference", {
        reportTableReferenceId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tableName: DataTypes.STRING,
        referenceTableName: DataTypes.STRING,
        tablekey: DataTypes.STRING,
        referenceTableKey: DataTypes.STRING
    },
        {
            timestamps: true
        }
    );

    return ReportTableReference;
};
