const {Router} = require('express')
const router = Router()
const songController = require('../controllers/songController')
const verifyMiddleware = require('../middlewares/verifyMiddleware')

router.get('/songs', verifyMiddleware.verify, songController.getSongs)

router.get('/song/:id', verifyMiddleware.verify, songController.getSong)

router.post('/song', verifyMiddleware.verify, songController.addSong)

router.put('/song/:id', verifyMiddleware.verify, songController.editSong)

router.delete('/song/:id', verifyMiddleware.verify, songController.deleteSong)

module.exports = router