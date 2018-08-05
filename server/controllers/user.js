const User = require('../models/user');

const userController = {
  getUser: (req, res) => {
    const { email } = req.body;

    return User.findOne({email})
    .then((doc) => {
      req.session.authenticated = true;
      req.session.email = doc.email;
      res.json(doc);
    })
    .catch((e) => {
      res.status(500);
      res.json({status: 500, error: e.message});
    })
  }
}

module.exports =  { userController };