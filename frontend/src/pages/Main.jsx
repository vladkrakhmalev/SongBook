import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../services/apiServices';
import Navigation from "../components/Navigation";
import List from "../components/List";
import Song from "../components/Song";
const TONALITIES = ['H','A#','A','G#','G','F#','F','E','D#','D','C#','C',]
const categories = ['Хлебопреломление','Жатва','Рождество']



export default function Main() {
  const [songs, setSongs] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [openMenu, setOpenMenu] = useState(true)
  const [activeSong, setActiveSong] = useState(null)
  const [isEditSong, setIsEditSong] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  


  function updateActiveSong(song) {
    song = song ? decoratSong(song) : null
    setIsEditSong(false)
    setActiveSong(song)
  }

  function updateSearchText(text) {
    setSearchText(text)
  }

  function updateCategory(category) {
    setActiveCategory(category)
  }

  function updateOpenMenu(isOpen) {
    setOpenMenu(isOpen)
  }

  function updateIsEditSong(bool) {
    setIsEditSong(bool)
  }



  useEffect(() => {getSongs()}, [])

  async function getSongs() {
    const result = await sendRequest('/api/songs/', 'GET')
    setSongs(result.songs)
    setLoading(true)
  }

  async function saveNewSong(song) {
    const result = await sendRequest('/api/song', 'POST', song)
    setSongs(result.songs)
  }

  async function saveSong(song) {
    const result = await sendRequest('/api/song/' + song._id, 'PUT', decoratSong(song))
    setSongs(result.songs)
  }

  async function deleteSong(song) {
    const result = await sendRequest('/api/song/' + song._id, 'DELETE', song)
    setSongs(result.songs)
    setOpenMenu(true)
    updateActiveSong(null)
  }

  async function logout() {
    await sendRequest('/api/logout/', 'POST')
    navigate('/auth')
  }



  function decoratSong(song) {
    const regexp = new RegExp(`>?(${TONALITIES.join('m?7?|')}m?7?)`, 'g')

    song.text = song.text.map(block => {
      block.value = block.value.replaceAll(regexp, match => {
        return match.match('>') === null ? `<span class='song__chord'>${match}</span>` : match
      })
    return block })

    return song
  }
  
  function addSong() {

    const newSong = {
      isFavorite: false,
      category: '',
      name: '',
      text: [{
        type: '',
        value: '',
      }],
    }

    setActiveSong(newSong)
    setOpenMenu(false)
    setIsEditSong(true)
  }

  

  return (
    <div className="panel">
      <div
        className={'panel__column _left' + (openMenu ? '' : ' _hide')}>
        <Navigation
          updateSearchText={updateSearchText}
          updateCategory={updateCategory}
          categories={categories}
          activeCategory={activeCategory}
        />
        {!loading ? <div className='loader'></div> :
          <List
            updateActiveSong={updateActiveSong}
            updateOpenMenu={updateOpenMenu}
            saveSong={saveSong}
            activeSong={activeSong}
            searchText={searchText}
            activeCategory={activeCategory}
            songs={songs}
          />
        }
        <div className="panel__btn _add" onClick={addSong}>Добавить песню</div>
        <div className="panel__btn _light" onClick={logout}>Выйти</div>
      </div>
      <div className="panel__column _right">
        <Song
          updateIsEditSong={updateIsEditSong}
          deleteSong={deleteSong}
          saveSong={saveSong}
          saveNewSong={saveNewSong}
          updateOpenMenu={updateOpenMenu}
          activeSong={activeSong}
          isEditSong={isEditSong}
          categories={categories}
          tonalities={TONALITIES}
        />
      </div>
    </div>
  )
}
