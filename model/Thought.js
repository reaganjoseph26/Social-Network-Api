const { Schema, model } = require('mongoose');
const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    username:{
        type: String,
        required: true,
    },
});
const Thought = model('Thought', thoughtSchema)
module.exports = Thought

