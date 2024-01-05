const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')

router.post('/registration', authController.registration)

router.post('/login', authController.login)

router.post('/logout', authController.logout)

module.exports = router