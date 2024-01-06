import { Outlet, useNavigate } from 'react-router-dom'
import List from './List'
import Navigation from './Navigation'
import { useEffect, useState } from 'react'
import { sendRequest } from '../services/apiServices'

export default function Layout() {  
  const [songs, setSongs] = useState([])
  const [openMenu, setOpenMenu] = useState(true)
  const navigate = useNavigate()

  function updateOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function updateSongs(songs) {
    setSongs(songs)
  }

  function addSongHandler() {
    updateOpenMenu()
    navigate('/songs/new')
  }

  async function getSongs() {
    const result = await sendRequest('/api/songs/', 'GET')
    result.success ? setSongs(result.songs) : navigate('/auth')
  }

  async function logout() {
    await sendRequest('/api/logout', 'POST')
    navigate('/auth')
  }
 
  useEffect(() => {getSongs()} ,[])

  return (
    <div className="panel">
      <div className={'panel__column _left' + (openMenu ? '' : ' _hide')}>
        <Navigation/>
        <List songs={songs} updateOpenMenu={updateOpenMenu} updateSongs={updateSongs}/>
        <div className="panel__btn _add" onClick={addSongHandler}>Добавить песню</div>
        <div className="panel__btn _light" onClick={logout}>Выйти</div>
      </div>
      <div className="panel__column _right">
        <Outlet context={[songs, setSongs, updateOpenMenu]}/>
      </div>
    </div>
  )
}
