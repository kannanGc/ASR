module.exports = function (app, routes, authenticate) {
    app.post('/api/getAllProducts',authenticate, routes.products.getAllProducts);
    app.post('/api/insertProduct',authenticate, routes.products.insertProduct);
    app.get('/api/getAllProductName',authenticate, routes.products.getAllProductName);
    app.get('/api/getAllBills',authenticate, routes.products.getAllBills);
    app.post('/api/updatestock',authenticate, routes.products.updatestock);
    app.post('/api/generateBill',authenticate, routes.products.generateBill);
    app.post('/api/login',authenticate, routes.products.login);
    app.post('/api/insertHSNcode',authenticate, routes.products.insertHSNCode);
    app.post('/api/insertCompanyName',authenticate, routes.products.insertCompanyName);
    app.get('/api/getAllCompanyName',authenticate, routes.products.getAllCompanyName);
    app.get('/api/getAllHSNCodes',authenticate, routes.products.getAllHSNCodes);
    app.get('/api/getAllProductGroup',authenticate, routes.products.getAllProductGroup);
    app.get('/api/getAllPacks',authenticate, routes.products.getAllPacks);
    app.get('/api/getAllGst',authenticate, routes.products.getAllGst);

    
    // app.post('/api/insertProduct',authenticate, routes.products.insertProduct);
    
}
