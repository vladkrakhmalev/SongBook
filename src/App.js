import Navigation from "./components/Navigation";
import List from "./components/List";
import Song from "./components/Song";
import { useState } from 'react'
import { allSongs } from "./data"
import { categories } from "./categoriesData"



function App() {
  const [songs, setSongs] = useState(allSongs)
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [openMenu, setOpenMenu] = useState(true)
  const [activeSong, setActiveSong] = useState('')
  const [isEditSong, setIsEditSong] = useState(false)
  

  
  function updateActiveSong(song) {
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

  function editSong(curSong) {
    setActiveSong(curSong)
    const newSongs = songs.map(song => ({...song}))
    newSongs[curSong.id] = curSong
    setSongs(newSongs)
  }

  function addSong() {

    const newSong = {
      id: songs[songs.length-1].id+1,
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
    setSongs(newSongs)
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
          isEditSong={isEditSong}
          updateIsEditSong={updateIsEditSong}
          song={activeSong}
          editSong={editSong}
          deleteSong={deleteSong}
          updateOpenMenu={updateOpenMenu}
          categories={categories}
        /> : ''}
      </div>
    </div>
  )
}

export default App
