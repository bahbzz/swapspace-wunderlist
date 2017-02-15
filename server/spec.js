var app = require('./server'),
    chai = require('chai'),
    http = require('chai-http'),
    request = require('supertest'),
    expect = chai.expect,
    should = chai.should();


    chai.use(http);

    describe('TODOS', function() {
        var tditem = {
            "task": "I need to go on a vacation in Maldives "
        }
        

        it("should get all todos", function(done) {
            request(app)
                .get("/todos")
                .expect(200)
                .expect("Content-type", "application/json")
                .end(function(err, res) {
                    expect(res.body).to.be.an('array')
                    done();
                });
        });

         it("should add a record to the db", function(done) {
            chai.request(app)
            .post('/todos')
            .send(tditem)
            .end(function(err, res) {
                res.status.should.equal(200)
                should.not.exist(err)
                res.body.should.be.an('object')
                done();
            });
        });


    });

       