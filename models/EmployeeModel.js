const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please enter First Name']
    },
    last_name: {
        type: String,
        required: [true, 'Please enter Last Name']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "other"],
        required: true
    },
    salary: {
        type: Number,
        validate(value) {
          if(value < 0) {
            throw new Error('Salary must be a positive number')
          }
        }
      },
})

module.exports = mongoose.model('Employee', employeeSchema)