'use strict';
const mongoose = require('mongoose');
const validator = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
  email:{
    type: String,        
    require: true,
    trim: true,
    minlength: 4,
    unique: true,
    validate: {
        validator: validator,
        message: '{VALUE} is not a valid email'
    }
  },
  password: {
      type: String,
      require: true,
      minlength: 6
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