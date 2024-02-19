const mongoose = require('mongoose')
//add bcrypt to hash password 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'], // Ensure username is provided
        unique: true, // Ensure username is unique across all documents in the collection
        trim: true, // Trims whitespace from the username       
    }, 
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
            throw new Error('Email is not valid.')
          }
        }
      },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        validate(value) {
            if(value < 8) {
              throw new Error('Passwor must be 8 characters or greater')
            }
        }
    }
})

module.exports = mongoose.model('User', userSchema)