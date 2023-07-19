import { useState, useEffect } from 'react'

import {allSongs} from './data'

import Navigation from "./components/Navigation";
import List from "./components/List";
import Song from "./components/Song";

const TONALITIES = ['H','A#','A','G#','G','F#','F','E','D#','D','C#','C',]
const categories = ['Хлебопреломление','Жатва','Рождество']



function App() {
  const [songs, setSongs] = useState(allSongs)
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [openMenu, setOpenMenu] = useState(true)
  const [activeSong, setActiveSong] = useState(null)
  const [isEditSong, setIsEditSong] = useState(false)
  
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

  function updateSongs(songs) {
    setSongs(songs)
  }



  // useEffect(() => getSongs(), [])

  function getSongs() {
    console.log('Get songs')
    fetch('/api/songs/')
      .then(res => res.json())
      .then(setSongs)
      .catch(console.error)
  }

  function decoratSong(song) {
    const regexp = new RegExp(`${TONALITIES.join('m?7?|')}m?7?`, 'g')
    song.text = song.text.replaceAll(regexp, match => {
      return `<span class='song__chord'>${match}</span>`
    })
    return song
  }

  function editSong(curSong) {
    setActiveSong(curSong)
    songs[curSong.id] = curSong
    updateSongs(songs)
  }

  function addSong() {

    const newSong = {
      number: '',
      isFavorite: false,
      category: '',
      name: '',
      text: '',
    }

    editSong(newSong)
    setOpenMenu(false)
    setIsEditSong(true)
  }

  function deleteSong(curSong) {
    const newSongs = songs.map(song => ({...song}))
    newSongs.splice(songs.indexOf(curSong), 1)
    updateSongs(newSongs)
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
        <List
          updateActiveSong={updateActiveSong}
          updateOpenMenu={updateOpenMenu}
          editSong={editSong}
          activeSong={activeSong}
          searchText={searchText}
          activeCategory={activeCategory}
          songs={songs}
        />
        <div
          className="panel__btn _add"
          onClick={addSong}
        >Добавить песню</div>
      </div>
      <div className="panel__column _right">
        {activeSong ? <Song
          updateIsEditSong={updateIsEditSong}
          editSong={editSong}
          deleteSong={deleteSong}
          decoratSong={decoratSong}
          updateOpenMenu={updateOpenMenu}
          song={activeSong}
          isEditSong={isEditSong}
          categories={categories}
          tonalities={TONALITIES}
        /> : ''}
      </div>
    </div>
  )
}

export default App
