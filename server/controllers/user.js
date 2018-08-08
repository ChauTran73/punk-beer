const User = require('../models/user');

const userController = {
  getUser: (req, res, next) => {
    const { user_id } = req.session.passport.user;
    return User.findOneAndUpdate(
      { user_id }, 
      { user_id }, 
      { upsert: true, setDefaultsOnInsert: true}
    )
    .then((user) => {
      console.log(user);
      res.status(200).json({favorites: user.favorites})
    })
    .catch((e) => {
      res.status(500);
      res.json({status: 500, error: e.message});
    })
  }
}

module.exports =  { userController };