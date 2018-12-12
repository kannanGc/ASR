module.exports = function (app, routes, authenticate) {
    app.post('/api/executequery',authenticate, routes.query.executeQuery);
}