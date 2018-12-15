var model = require('../models');
var dao = require('../dao');
var async = require('async');
var _ = require('lodash');
//Get tables




exports.login = function (paramData, callback) {
console.log("getAllProducts");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.login(paramData, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
        
}


exports.getAllProducts = function (id, callback) {
console.log("getAllProducts");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllProducts(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
        
}

exports.getAllProductName = function (callback) {
console.log("getAllProductName");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllProductName(function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
        
}




exports.getAllBills = function (id, callback) {
console.log("getAllBills");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllBills(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}



exports.insertProduct = function (paramData, callback) {
console.log("insert product");
 

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.insertProduct(paramData, function (err, data) {
            console.log("insert product 3");
            if (err) return callback(true, null);
            updatestockJSON =[{
                "product_id":data[0],
                "stock_present":paramData.noofstockin
            }];
            console.log("insert product 4");
            callback(false, data);
        })
    });

    asyncTasks.push(function (data,callback) {
        dao.products.updateStockDetails(updatestockJSON, function (err, data) {
            console.log(err);
            if (err) return callback(err, null);
            callback(false, data);
        })    
    });       

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });

        
}


exports.updatestock = function (paramData, callback) {
 console.log("updatestock");
 // console.log(paramData);

 var productCodes = _.map(paramData, 'product_code'); // [12, 14, 16, 18]
 // var productCodes = _.map(paramData, 'productCode'); // [12, 14, 16, 18]
 // console.log(productCodes);

  var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getStockDetails(productCodes, function (err, data) {
            console.log(err);
            if (err) return callback(true, null);

            for(var items in data){
                // console.log(paramData);
                // console.log(data[items].product_id);
                console.log("pid");
                // console.log(data[items].product_id);
                var dataToUpdate =  _.find(paramData, ['product_code', data[items].product_id]);    
                // console.log(dataToUpdate);
                data[items].stock_present =    data[items].stock_present + parseInt(dataToUpdate.quantity) ;         
            }

            callback(false, data);
        })
    });

    asyncTasks.push(function (data, callback) {
        dao.products.updateStockDetails(data, function (err, data) {
            console.log(err);
            if (err) return callback(err, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });

}
 
exports.generateBill = function (paramData, callback) {
console.log("generate bill");
console.log(paramData); 

    var asyncTasks = [];
     var productCodes = _.map(paramData.items, 'product_code'); // [12, 14, 16, 18]
     console.log(productCodes)
    asyncTasks.push(function (callback) {
        dao.products.insertBill(paramData, function (err, data) {
            if (err) return callback(true, null);

            var billData = paramData.items;
            for(var items    in billData){
                billData[items].bill_id = data[0];
                billData[items].serial_number =items;
            }
            callback(false, billData);
        })
    });

    asyncTasks.push(function (billData, callback) {
        dao.products.insertBillDetails(billData, function (err, data) {
            if (err) return callback(err, null);
            callback(false, data);
        })
    });


    asyncTasks.push(function (data, callback) {
        console.log("productCodes from here");
        // console.log(productCodes);
        dao.products.getStockDetails(productCodes, function (err, data) {
            // console.log(err);
            if (err) return callback(true, null);
            // console.log("getstock from update bill");
            // console.log(data);
            for(var items in data){
                // console.log(paramData);
                // console.log(data[items].product_id);
                // console.log("pid");
                // console.log(data[items].product_id);
                var dataToUpdate =  _.find(paramData.items, ['product_code', data[items].product_id]);    
                // console.log(dataToUpdate.quantity);
                // console.log(data[items].stock_present);
                data[items].stock_present =    data[items].stock_present - parseInt(dataToUpdate.quantity) ;         
                // console.log("pid3");
                // console.log(data[items].stock_present);
            }
            console.log("final data");
            console.log(data);    
            callback(false, data);
        })
    });

    asyncTasks.push(function (data, callback) {
        console.log("getting data");
        console.log(data);
        dao.products.updateStockDetails(data, function (err, data) {
            // console.log(err);
            if (err) return callback(err, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
}


exports.insertHSNCode = function (paramData, callback) {
console.log("insertHSNCode");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.insertHSNCode(paramData, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}


exports.insertCompanyName = function (paramData, callback) {
console.log("insertCompanyName");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.insertCompanyName(paramData, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}

exports.getAllHSNCodes = function (id, callback) {
console.log("getAllHSNCodes");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllHSNCodes(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}

exports.getAllCompanyName = function (id, callback) {
console.log("getAllBills");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllCompanyName(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}

exports.getAllPacks = function (id, callback) {
console.log("getAllPacks");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllPacks(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}

exports.getAllProductGroup = function (id, callback) {
console.log("getAllProductGroup");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllProductGroup(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}

exports.getAllGst = function (id, callback) {
console.log("getAllGst");

    var asyncTasks = [];

    asyncTasks.push(function (callback) {
        dao.products.getAllGst(id, function (err, data) {
            if (err) return callback(true, null);
            callback(false, data);
        })
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        callback(false, data);
    });
    
}
