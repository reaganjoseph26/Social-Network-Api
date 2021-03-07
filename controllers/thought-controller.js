const { User, Thought } = require('../model');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found at this id' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { username: username},
              { $push: { thought: _id } },
              { new: true, runValidators: true }
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