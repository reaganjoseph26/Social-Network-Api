const { Schema, model } = require('mongoose');
// const { Schema, model, Types } = require('mongoose');


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
              return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v);
            },
        }
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
},
{
    toJSON: {
      virtuals: true,
    //   getters: true
    },
    // id: false
  }
);


userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', userSchema)

module.exports = User
