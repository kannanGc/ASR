var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var async = require('async');


chai.use(chaiHttp);
chai.should();

describe('Adhoc reports API', function () {
    describe('Table controller', function () {

        it('Get tables', function (done) {
            chai.request(app)
                .get('/api/getTables')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
                .catch(function (err) {
                    return done(err);
                });
        });
        it('Get getDatatypesAndConditions', function (done) {
            chai.request(app)
                .get('/api/getDatatypesAndConditions')
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



