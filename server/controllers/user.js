const User = require('../models/user');

const userController = {
  getUser: (req, res) => {
    const { email } = req.body;

    return User.findOne({email})
    .then((doc) => {
      res.json(doc);
    })
    .catch((e) => {
      res.status(500);
      res.json({status: 500, error: e.message});
    })
  }
}

module.exports =  { userController };