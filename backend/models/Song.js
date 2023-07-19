const {Schema, model} = require('mongoose')

const songSchema = new Schema({
  number: {
    type: Number
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  category: {
    type: Array,
    default: []
  },
  name: {
    type: String
  },
  text: {
    type: String
  }
})

module.exports = model('Song', songSchema)