import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRequest } from "../services/apiServices"

export default function Auth() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  async function registration() {
    const result = await sendRequest('/api/registration', 'POST', {name, password})
    result.success ? navigate('/songs') : setMessage(result.message)
  }

  async function login() {
    const result = await sendRequest('/api/login', 'POST', {name, password})
    result.success ? navigate('/songs') : setMessage(result.message)
  }

  return (
    <div className='panel__container'>
      <h1 className=" ">SongBook</h1>
      <p className='panel__title'>Сервис для хранения и использования песен с аккордами</p>
      <form className="panel__form">
        <input
          className="panel__input"
          placeholder="Имя"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="panel__input"
          placeholder="Пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className='panel__btn _light _medium' onClick={registration}>Зарегистрироваться</a>
        <a className='panel__btn _medium' onClick={login}>Войти</a>
        <p className='panel__message'>{message}</p>
      </form>
    </div>
  )
}