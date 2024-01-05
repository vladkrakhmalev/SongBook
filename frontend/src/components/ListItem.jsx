import { useEffect, useState } from "react"

function ListItem({song, activeSong, updateActiveSong, updateOpenMenu, saveSong}) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const changeFavorite = () => {
    song.isFavorite = !song.isFavorite
    setIsFavorite(song.isFavorite)
    saveSong(song)
  }

  useEffect(() => {
    setIsFavorite(song.isFavorite)
  }, [song])

  const itemClass = 'list__name' + (activeSong?._id === song._id ? ' _active' : '')



  return (
    <div className='list__item'>
      <div
        className={itemClass}
        onClick={() => {
          updateActiveSong(song)
          updateOpenMenu(false)
        }}
      >{song.name}</div> 
      <div
        className={isFavorite ? 'favorite _active' : 'favorite'}
        onClick={changeFavorite}
      ></div>
    </div>
  )
}

export default ListItem