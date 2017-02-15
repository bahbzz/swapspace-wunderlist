var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    todorouter = require("../List/list-routes");


    //set up middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


//mounting route
app.use("/todos", todorouter);


//error handler
app.use(function(err, req, res, next) {
    res.status('501').json(err.message);
});

//serve public files
app.use(express.static(__dirname + '/public'));

module.exports = app;