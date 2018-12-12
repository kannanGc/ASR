var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var async = require('async');


chai.use(chaiHttp);
chai.should();

describe('Adhoc reports API', function () {
    describe('Query controller', function () {

        it('Execute Query', function (done) {
            chai.request(app)
                .post('/api/executequery')
                .set('content-type', 'application/json')
                .send({"tables":["articlehistory"],"aliasName":["id"],"aliasDuplicatedName":"","aliasHasDuplicate":false,"fields":[{"tableName":"articlehistory","columnName":"id","alias":"id","type":"","aggregate":"","name":"articlehistory.id","columnId":195}],"conditions":[{"tableName":"articlehistory","columnName":"id","filter":"=","sqlType":"int","property":"articlehistory.id","filterValue":"100","conditionId":13,"type":"and"}]})
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



