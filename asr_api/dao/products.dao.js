var model = require('../models');

exports.getAllProducts = function (id, callback) {

    var query = model.knex('products').select('products.id','products.product_name','products.company_name','packs.pack_name','product_groups.product_group_name','gst_types.gst_type','packs.pack_name','products.wholesale_rate','products.retail_rate','products.alert','stock_details.stock_present')
    .innerJoin('packs', 'packs.id', 'products.pack_id')
    .innerJoin('stock_details', 'stock_details.product_id', 'products.id')
    .innerJoin('product_groups', 'product_groups.id', 'products.product_group_id')
    .innerJoin('gst_types','gst_types.id','products.gst_type_id')

    if (typeof id != 'undefined') {
        query = query.where('products.id', id);
    }

    console.log(query.toSQL());

    query
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

exports.getAllProductName = function (callback) {

    var query = model.knex('products').select('products.id','products.product_name','products.company_name')
    
    console.log(query.toSQL());

    query
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}




exports.getAllBills = function (id, callback) {

    var query = model.knex('Bills')
    if (typeof id != 'undefined') {
        query = query.where('id', id);
    }
    console.log(query.toSQL());
    query
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

exports.insertProduct = function (paramData, callback) {
		
		model.knex('products')
        .insert({

         product_name: paramData.productName,
         company_name: paramData.companyName,
         pack_id: paramData.pack,
         product_group_id: paramData.productGroup,
         gst_type_id: paramData.gstType,
         wholesale_rate: paramData.advmetadata,
         wholesale_rate: paramData.wholesaleRate,
         retail_rate: paramData.retailRate,
         alert: paramData.alert

         })
        .returning('id')
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

exports.getStockDetails = function (productCodes, callback) {
	var query = model.knex('stock_details').select('stock_details.stock_present','stock_details.product_id').whereIn('stock_details.product_id',productCodes);

	console.log(query.toSQL());

    query
        .then(function (data) {
        	console.log(data);
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

exports.updateStockDetails = function (data, callback) {

		model.stock_details.bulkCreate(data,
                {
                    ignoreDuplicates: true,
                     updateOnDuplicate: ['product_id','stock_present']
                })
             .then(function (dataReturn) {
                console.log("completed data");
                callback(null, "data");
            })
            .catch(function (err) {
                return callback(err, false);
            })
            .finally(function () {
                //TODO : close connections if any
            });
}
exports.insertBill = function (paramData, callback) {
	 	model.knex('Bills')
        .insert({

         billamount: paramData.totalprice,
         discountpercentage: paramData.discountpercentage,
         customeramount: paramData.priceforcustomer,
         customer_name: paramData.customer_name
         })
        .returning('id')
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });

}

exports.insertBillDetails = function (billData, callback) {

		model.billdetails.bulkCreate(billData)
                    .then(function (dataReturn) {
                        console.log("completed data");
                        callback(null, dataReturn);

            
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
 }

 exports.login = function (userData, callback) {

     var query = model.knex('Users')
        query = query.where('username', userData.username);
        query = query.where('password', userData.password);
    console.log(query.toSQL());
    query
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, false);
        })
        .finally(function () {
            //TODO : close connections if any
        });
 }

 