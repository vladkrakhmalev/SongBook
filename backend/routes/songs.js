const {Router} = require('express')
const router = Router()
const Song = require('../models/Song')

router.get('/api/songs', async (req, res) => {
  const songs = await Song.find()
  res.json(songs)
})

router.post('/api/song', async (req, res) => {
  const song = new Song({
    number: req.body.number,
    category: req.body.category,
    name: req.body.name,
    text: req.body.text,
  })
  await song.save()
  res.json(song)
})

router.put('/api/song/:id', async (req, res) => {
  const song = await Song.findById(req.params.id)
  song.name = req.body.name
  song.text = req.body.text
  song.number = req.body.number
  song.category = req.body.category
  song.isFavorite = req.body.isFavorite
  await song.save()
})

router.delete('/api/song/:id', async (req, res) => {
  await Song.findByIdAndDelete(req.params.id)
})

module.exports = router