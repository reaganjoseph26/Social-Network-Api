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
        Thought.findOne({ _id: params.id })
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
          .then(({ username, _id }) => {
            return User.findOneAndUpdate(
              { username: username},
              { $push: { thoughts: _id } },
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

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts associated with this id. Try again!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(({ username }) => {
            return User.findOneAndUpdate(
                {username: username},
                { $pull: { thoughts: params.id } },
                { new: true }
            )
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users found with this id. Try again!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    

    
}
module.exports = thoughtController;