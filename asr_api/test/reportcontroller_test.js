var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var async = require('async');


chai.use(chaiHttp);
chai.should();

describe('Adhoc reports API', function () {
 
    describe('Report controller', function () {

        it('Get Report', function (done) {
            chai.request(app)
                .get('/api/reports/001')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });

        it('Save Report', function (done) {
            chai.request(app)
                .post('/api/reports')
                .set('content-type', 'application/json')
                .send({"report":{"type":"Private","reportName":new Date(),"createdBy":"0001","updatedBy":"0001"},"tables":["articlehistory"],"aliasName":["id"],"aliasDuplicatedName":"","aliasHasDuplicate":false,"fields":[{"tableName":"articlehistory","columnName":"id","alias":"id","type":"","aggregate":"","name":"articlehistory.id"}],"conditions":[{"tableName":"articlehistory","columnName":"id","filter":"=","sqlType":"int","property":"articlehistory.id","filterValue":"100","type":"and"}]})
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });

        it('Get ReportData', function (done) {
            chai.request(app)
                .get('/api/getreports/1')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });
        
   });
});