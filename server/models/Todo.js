const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;



const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
        
    },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;