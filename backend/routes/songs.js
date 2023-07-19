const {Router} = require('express')
const router = Router()
const Song = require('../models/Song')

router.get('/api/songs', async (req, res) => {
  const songs = await Song.find()
  res.json(songs)
})

module.exports = router