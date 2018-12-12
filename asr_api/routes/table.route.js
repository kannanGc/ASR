module.exports = function (app, routes, authenticate) {
    app.get('/api/gettables',authenticate, routes.table.getTables);
    app.get('/api/getDatatypesAndConditions',authenticate,routes.table.getFilters);
}