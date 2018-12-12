module.exports = function (sequelize, DataTypes) {
    var FilterTypeReference = sequelize.define("FilterTypeReference", {
        filterTypeReferenceId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        sqlType: DataTypes.STRING,
        filterType: DataTypes.STRING
    },
        {
            timestamps: true
        }
    );

    return FilterTypeReference;
};
