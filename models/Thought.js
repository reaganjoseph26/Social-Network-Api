 const mongoose = require('mongoose'); 

const thoughtSchema = new mongoose.Schema({
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

module.exports = mongoose.model('User', thoughtSchema);

