var service = require('../services');
var nestjs = require('nesthydrationjs')();
var maps = require('../resultmap');



/*
Get tables 
POST : /api/testasr
*/
exports.login = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("wowwwwwwwWrking");
    var paramData = req.body;
    console.log("paramData");
    console.log(paramData);
    service.products.login(paramData,function (err, data) {
        console.log(data);
        console.log(data.length);
        if(data.length == 0){
            data = "FAILED"
        }
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}


/*
Get tables 
POST : /api/testasr
*/


exports.getAllProducts = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    
    var id = req.query.id;
    service.products.getAllProducts(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}


exports.getAllProductName = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    
    var id = req.query.id;
    service.products.getAllProductName(function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}


exports.getAllBills = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllBills(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}


/*
Get tables 
POST : /api/testasr
*/
exports.insertProduct = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("working");
    var paramData = req.body;
    console.log(paramData);
    service.products.insertProduct(paramData,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}




/*
Get tables 
POST : /api/testasr
*/
exports.updatestock = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("working");
    var paramData = req.body;
    service.products.updatestock(paramData,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        console.log(data);
        res.send("success");
        next();
    });
}

/*
Get tables 
POST : /api/testasr
*/
exports.generateBill = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("wossrking");
    var paramData = req.body;
    console.log(paramData);
    service.products.generateBill(paramData,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        console.log(data);
        res.send(data);
        next();
    });
}

/*
Get tables 
POST : /api/testasr
*/
exports.insertHSNCode = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("working");
    var paramData = req.body;
    console.log(paramData);
    service.products.insertHSNCode(paramData,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

/*
Get tables 
POST : /api/testasr
*/
exports.insertCompanyName = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("working");
    var paramData = req.body;
    console.log(paramData);
    service.products.insertCompanyName(paramData,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}
exports.getAllHSNCodes= function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllHSNCodes(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

exports.getAllCompanyName = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllCompanyName(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

exports.getAllPacks = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllPacks(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

exports.getAllProductGroup = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllProductGroup(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

exports.getAllGst = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      
    console.log("innn");
    var id = req.query.id;
    service.products.getAllGst(id,function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return next(err, null);

        
        res.send(data);
        next();
    });
}

