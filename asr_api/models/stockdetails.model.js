module.exports = function (sequelize, DataTypes) {
    var stock_details = sequelize.define("stock_details", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        stock_present: DataTypes.INTEGER
    },
        {
            timestamps: true
        }
    );

    return stock_details;
};
