module.exports = function (app, routes, authenticate) {
    app.post('/api/getAllProducts',authenticate, routes.products.getAllProducts);
    app.post('/api/insertProduct',authenticate, routes.products.insertProduct);
    app.get('/api/getAllProductName',authenticate, routes.products.getAllProductName);
    app.get('/api/getAllBills',authenticate, routes.products.getAllBills);
    app.post('/api/updatestock',authenticate, routes.products.updatestock);
    app.post('/api/generateBill',authenticate, routes.products.generateBill);
    app.post('/api/login',authenticate, routes.products.login);
    
    // app.post('/api/insertProduct',authenticate, routes.products.insertProduct);
    
}