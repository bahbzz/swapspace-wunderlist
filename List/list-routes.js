var express = require('express');
var router = express.Router();
var listModel = require("./list-model");
var todo;
router.route('/')
    .get(function(req, res, next) {
        listModel.find({}, function(err, todos) {
            if(todos.length == 0) {return next(new Error("No todos found"))}
            if(err){return next(err);}
            res.status(200).json(todos);
        });

      
    })
    .post(function(req, res, next) {
        listModel.create(req.body, function(err, todo) {
            if(err){return next(err)}
                res.status(200).json(todo);
        });

    })

//Routes that take id attributes
router.route('/:id')
       .get(function(req, res, next) {
           listModel.findOne({_id: req.params.id}, function(err, todos) {
               if(!todos) {return next(new Error("ID does not exist"))}
               if(err){return next(err);}
               res.status(200).json(todos);
           });
       })
       .put(function(req, res, next) {
           //console.log(req.body)
           listModel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, todos) {
               if(!todos) {return next(new Error("ID does not exist"))}
               if(err){return next(err);}
               res.status(200).json(todos);
           });
       })
   
    



module.exports = router;
