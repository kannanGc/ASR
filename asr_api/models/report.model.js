module.exports = function (sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
        reportId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        reportName: DataTypes.STRING,
        type: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                    Report.hasMany(models.ReportColumn, { foreignKey: 'reportId' });
                    Report.hasMany(models.ReportCondition, { foreignKey: 'reportId' });
                }
            }
        },
        {
            timestamps: true
        }
    );

    return Report;
};
