module.exports = function (sequelize, DataTypes) {
    var ReportFilter = sequelize.define("ReportFilter", {
        reportFilterId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        filterType: DataTypes.STRING,
        filterDesc: DataTypes.STRING,
        filterOperator: DataTypes.STRING
    },
        {
            classMethods: {
                associate: function (models) {
                    ReportFilter.belongsTo(models.FilterTypeReference, { foreignKey: 'filterType',targetKey: 'filterType',  })
                }
            }
        },
        {
            timestamps: true
        }
    );

    return ReportFilter;
};
