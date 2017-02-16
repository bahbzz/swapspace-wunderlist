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

        var newt = {
            "task": "Home alone"
        };

       
       it("should fail if there are no todo items in the db", function(done) {
           request(app)
           .get("/todos")
           .expect(501)
           .expect("Content-type", "application/json")
           .end(function(err, res) {
               expect(res.body).to.be.equal("No todos found")
               done();
           })
       })
       
       
        it("should add a todo to the db", function(done) {
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
        it("should update a todo item selected by ID", function(done) {
            request(app)
                .post("/todos")
                .send(upd)
                .end(function(err, res){
                    var td_id = res.body._id;
                    request(app)
                       .put('/todos/' + td_id)
                       .send(newt)
                       .end(function(err, res) {
                            res.status.should.equal(200)
                            should.not.exist(err)
                            res.body.should.be.an('object')
                            console.log(res.body.task);
                            done();                                    
                        });
                                                
                });
        });
           
        it("should delete all todo items in the db", function(done) {
                request(app)
                .delete("/todos")
                .end(function(err, res) {
                    res.status.should.equal(200)
                    done();
                });
            })
            
             it("should delete a todo item selected by ID", function(done) {
                request(app)
                    .post("/todos")
                    .send(upd)
                    .end(function(err, res) {
                        var n_id = res.body._id;
                        request(app)
                        .delete("/todos/" + n_id)
                        .end(function(err, res) {
                            res.status.should.equal(200)
                            res.should.be.json
                            res.body.should.be.an('object')
                            res.body.should.have.property('task')
                            done();
                        });
                    });

             });

    });

       