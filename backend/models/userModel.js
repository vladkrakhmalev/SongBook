const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  songs: [{
    isFavorite: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
    },
    name: String,
    text: [{
      type: {type: String},
      value: String
    }],
  }]
})

module.exports = model('User', userSchema)