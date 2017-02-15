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
    }
});

var Todo = mongoose.model('todo',TdlistSchema);

module.exports = Todo;