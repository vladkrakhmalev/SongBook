import { useState, useEffect } from 'react'

import Navigation from "./components/Navigation";
import List from "./components/List";
import Song from "./components/Song";

const TONALITIES = ['H','A#','A','G#','G','F#','F','E','D#','D','C#','C',]
const categories = ['Хлебопреломление','Жатва','Рождество']



function App() {
  const [songs, setSongs] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [openMenu, setOpenMenu] = useState(true)
  const [activeSong, setActiveSong] = useState(null)
  const [isEditSong, setIsEditSong] = useState(false)
  const [loading, setLoading] = useState(false)
  
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



  useEffect(() => getSongs(), [])

  function getSongs() {
    fetch('/api/songs/')
      .then(res => res.json())
      .then(setSongs)
      .then(() => setLoading(true))
      .catch(console.error)
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
      number: '',
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

  function saveNewSong(curSong) {
    fetch('/api/song', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(curSong)
    })
      .then(res => res.json())
      .then(song => {
        setActiveSong(song)
        songs.push(song)
        setSongs(songs)
      })
  }

  function saveSong(curSong) {
    curSong = decoratSong(curSong)
    const id = songs.findIndex(song => song._id === curSong._id)
    songs[id] = curSong
    setSongs(songs)

    fetch('/api/song/' + curSong._id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(curSong)
    })
  }

  function deleteSong(curSong) {

    if (curSong._id) {
      songs.splice(songs.indexOf(curSong), 1)
      setSongs(songs)

      fetch('/api/song/' + curSong._id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(curSong)
      })
    }
    
    setOpenMenu(true)
    updateActiveSong(null)
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

export default App
