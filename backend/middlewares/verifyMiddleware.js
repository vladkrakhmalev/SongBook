const { JWT_TOKEN_KEY } = require("../config")
const jwt = require('jsonwebtoken')

class verifyMiddleware {

  verify(req, res, next) {
    try {
      const token = req.cookies.token
      if (!token) {
        return res.json({success: false, message: 'Пользователь не авторизирован'})
      }
      req.userID = jwt.verify(token, JWT_TOKEN_KEY).id
      next()
    } catch (e) {
      return res.json({success: false, message: 'Неверный токен'})
    }
  }

}

module.exports = new verifyMiddleware()