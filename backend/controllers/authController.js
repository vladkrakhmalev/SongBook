const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const {JWT_TOKEN_KEY} = require('../config')

class authController {

  async registration(req, res) {
    try {

      // Проверка на уникальность пользователя
      const {name, password} = req.body
      const candidate = await User.findOne({name})
      if (candidate) {
        return res.json({success: false, message: 'Пользователь с таким именем уже существует'})
      }

      // Добавление пользователя в БД
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({name, password: hashPassword})
      await user.save()

      // Генерация и сохранение токена
      const token = jwt.sign({id: user._id}, JWT_TOKEN_KEY, {expiresIn: '30d'})
      await Token.create({user: user._id, token})

      // Сохранение в куки
      res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      // Ответ
      return res.json({success: true, message: 'Пользователь зарегестрирован', token})
    } catch (e) {
      return res.json({success: false, message: 'Ошибка регистрации'})
    }
  }

  async login(req, res) {
    try {

      // Поиск пользователя
      const {name, password} = req.body
      const user = await User.findOne({name})
      if (!user) {
        return res.json({success: false, message: `Пользователь с именем ${name} не найден`})
      }
      
      // Проверка пароля
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.json({success: false, message: `Неверный пароль`})
      }

      // Генерация и сохранение токена
      const token = jwt.sign({id: user._id}, JWT_TOKEN_KEY, {expiresIn: '30d'})
      const tokenData = await Token.findOne({user: user._id})
      if (tokenData) {
        tokenData.token = token
        await tokenData.save()
      } else {
        await Token.create({user: user._id, token})
      }

      // Сохранение в куки
      res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      // Ответ
      return res.json({success: true, message: 'Вход успешно выполнен', token})      
    } catch (e) {
      return res.json({success: false, message: 'Ошибка входа'})    
    }
  }

  async logout(req, res) {
    try {

      //Удаление токена из БД
      const {token} = req.cookies
      await Token.deleteOne({token})
      
      // Очищение кук
      res.clearCookie('token')

      // Ответ
      return res.json({success: true, message: 'Выход выполнен успешно'})  
    } catch (e) {
      return res.json({success: false, message: 'Ошибка выхода'})  
    }
  }

}

module.exports = new authController()