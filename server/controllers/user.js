const User = require('../models/user');
const { punkAPI } = require('../api/beer');
const userController = {
  getUser: async(req, res, next) => {
    try {
      let { user_id } = req.session.passport.user;
      let user = await User.findOneAndUpdate(
        { user_id }, 
        { user_id }, 
        { upsert: true, setDefaultsOnInsert: true}
      );
        let { favorites } = user;
        let favoritesData = [];
        
        if (favorites.length) {
          favoritesData = await punkAPI.getBeersByIds(favorites);
        }
        
        req.session.favorites = favorites;
        req.session.favoritesData = favoritesData;
        next();
    }
    catch(e) {
      next(e);
    }

  },
  updateFavorites: async(req, res, next) => {

    try {
      let { favorites } = req.body;
      let { user_id } = req.session.passport.user;
  
      let user = await User.findOneAndUpdate(
        { user_id }, 
        { $set: { favorites } }
      );
  
      let favoritesData = await punkAPI.getBeersByIds(favorites);
      req.session.favorites = favorites;
      req.session.favoritesData = favoritesData;
      res.status(204).json({favorites, favoritesData})
    }
    catch(e) {
      next(e);
    }

  }
}

module.exports =  { userController };