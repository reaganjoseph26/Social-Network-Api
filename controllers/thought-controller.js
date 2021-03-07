const { User, Thought } = require('../model');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thought: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'User can not be found. Try again!' });
              return;
            }
            res.json(dbUserData);
          })
        .catch(err => res.json(err));
    },

    
}
module.exports = thoughtController;