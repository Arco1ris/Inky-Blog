var assert = require('assert');
var express = require('express');
var supertest = require('supertest');
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
            assert.equal(-1, [1,2,3].indexOf(7));
        });
    });
});


describe("SAMPLE unit test",function(){
    it("should return home page",function(done){
        // calling home page api
        server
            .get("/test")
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.error.should.equal(false);
                res.body.message.should.equal("Hello !");
                done();
            });
    });

    it("should add two number",function(done){
        //calling ADD api
        server
            .post('/add')
            .send({num1 : 10, num2 : 20})
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                res.body.data.should.equal(30);
                done();
            });
    });
    // 测试不存在的 API
    it("should return 404",function(done){
        server
            .get("/random")
            .expect(404)
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    })


});

describe("myAPI test",function () {
    it('should get category',function (done) {
        server
            .get('/api/articles')
            .expect(200)
            .end(function (err,docs) {
                console.log(docs.body);
                docs.status.should.equal(200);
                // var products = JSON.parse(docs.body);
                docs.body.should.be.a.Array();
                // docs.body[0].title.should.equal("rainbow");

                // products.should.equal.instanceOf(Array);
                // docs.body[0].title.should.equal("rainbow");
                done();
            })

    })
})