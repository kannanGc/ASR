module.exports = function (app, routes, authenticate) {
    app.get('/api/reports/:uid', authenticate,routes.report.getReports);
    app.get('/api/getreports/:reportid',authenticate, routes.report.getReportData);
    app.post('/api/reports',authenticate,routes.report.saveReports);
}