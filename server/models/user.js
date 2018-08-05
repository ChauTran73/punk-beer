'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id:{
    type: String,        
    unique: true,
    validate: {
      validator: (value) => {
        return /^((facebook|auth0)\|)([a-zA-Z0-9]*)$/.test(value);
      },
      message: '{VALUE} is not a user_id'
  }    
  },
  favorites: {
    type: [String],
    default: []
  }
})

UserSchema.method('addFavorite', (favorite) => {
  return this.update({
    $push: {
      favorites: favorite
    } 
  });
});   

const User = mongoose.model('User', UserSchema);

module.exports = User;