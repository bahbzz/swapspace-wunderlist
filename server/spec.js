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
        };
         var upd = {
            "task": "I need to go on a vacation in Maldives immediately"
        };
        

        it.skip("should get all todos", function(done) {
            request(app)
                .get("/todos")
                .expect(200)
                .expect("Content-type", "application/json")
                .end(function(err, res) {
                    expect(res.body).to.be.an('array')
                    done();
                });
        });

         it.skip("should add a record to the db", function(done) {
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

         it("should get a todo by id", function(done) {
            request(app)
                .post("/todos")
                .send(upd)
                .end(function(err,res) {
                    var item_id = res.body._id;
                    request(app)
                        .get('/todos/' + item_id)
                        .expect(200)
                        .expect("Content-type", "application/json")
                        .end(function(err, res) {
                            expect(res.body).to.be.an('object')
                            res.body.should.have.property('task');
                            res.body.task.should.equal("I need to go on a vacation in Maldives immediately")
                            done();
                        });
                })
        });


    });

       