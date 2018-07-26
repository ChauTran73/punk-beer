const mongoose = require('mongoose');
const validator = require('validator/isEmail');

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
})

const User = new mongoose.model('User', UserSchema);