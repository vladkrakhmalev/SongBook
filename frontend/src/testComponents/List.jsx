import { Link } from "react-router-dom"
import { sendRequest } from "../services/apiServices"

export default function List({songs, updateOpenMenu, updateSongs}) {

  function changeFavorite(song) {
    song.isFavorite = !song.isFavorite
    const index = songs.indexOf(song)
    songs[index] = song
    updateSongs(songs)
    sendRequest('/api/song/' + song._id, 'PUT', song)
  }
  
  return (
    <div className='list'>
      {songs.map(song => 
        <div className='list__item' key={song._id}>
          <Link
            onClick={updateOpenMenu}
            className="list__name"
            to={song._id}
          >{song.name}</Link>
          <div
            className={'favorite' + (song.isFavorite ? ' _active' : '')}
            onClick={() => changeFavorite(song)}
          ></div>
        </div>
      )}
    </div>
  )
}