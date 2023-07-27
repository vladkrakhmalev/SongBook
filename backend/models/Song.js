const {Schema, model} = require('mongoose')

const songSchema = new Schema({
  number: Number,
  isFavorite: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: []
  },
  name: String,
  text: [{
    type: {type: String},
    value: String
  }]
})

module.exports = model('Song', songSchema)