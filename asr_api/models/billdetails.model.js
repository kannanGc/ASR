module.exports = function (sequelize, DataTypes) {
    var billdetails = sequelize.define("billdetails", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        bill_id: DataTypes.INTEGER,
        product_code: DataTypes.INTEGER,
        price_per_unit: DataTypes.INTEGER,
        gst: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        serial_number: DataTypes.INTEGER    
    },
        {
            timestamps: true
        }
    );

    return billdetails;
};
