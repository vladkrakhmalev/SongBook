function ListItem({song, activeSong, updateActiveSong, editSong, updateOpenMenu}) {
  
  const changeFavorite = () => {
    song.isFavorite = !song.isFavorite
    editSong(song)
  }

  const itemClass = 'list__name' + (activeSong?.id == song.id ? ' _active' : '')



  return (
    <div className='list__item'>
      <div
        className={song.isFavorite ? 'favorite _active' : 'favorite'}
        onClick={changeFavorite}
      ></div>
      <div
        className={itemClass}
        onClick={() => {
          updateActiveSong(song)
          updateOpenMenu(false)
        }}
      >{song.name}</div>
      <div>{song.number}</div>      
    </div>
  )
}

export default ListItem