var mongoose = require('mongoose');

mongoose.connect("localhost");

var TdlistSchema = new mongoose.Schema({
    date: {
        type: Date,
        default:Date.now
    },
    task: {
        type:String,
        required:true
    },
    time: {
        type: Date,
        default:Date.now
    }
});

var Todo = mongoose.model('todo',TdlistSchema);

module.exports = Todo;