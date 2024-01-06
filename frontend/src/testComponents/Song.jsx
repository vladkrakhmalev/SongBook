import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { sendRequest } from "../services/apiServices";
import SongText from "./SongText";

export default function Song({isNew}) {
  const [songs, setSongs, updateOpenMenu] = useOutletContext()
  const [song, setSong] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [sizeText, setSizeText] = useState(18)
  const {id} = useParams() 
  const navigate = useNavigate()
  const disabledClass = disabled ? " _disabled" : ''
  const categories = ['Хлебопреломление','Жатва','Рождество']

  function handleChange(value, prop) {
    const newSong = {...song}
    newSong[prop] = value
    setSong(newSong)
  }

  function generateSong() {
    setSong({
      isFavorite: false,
      category: '',
      name: '',
      text: [{
        type: '',
        value: '',
      }],
    })
    setDisabled(false)
  }

  async function getSong(id) {
    setDisabled(true)
    if (songs.length === 0) {
      const result = await sendRequest('/api/song/' + id, 'GET')
      result.success ? setSong(result.song) : console.log(result.message)
    } else {
      const song = songs.find(song => song._id == id)
      setSong(song)
    }
  }

  async function addSong(song) {
    setDisabled(!disabled)
    const result = await sendRequest('/api/song', 'POST', song)
    if (result.success) {
      songs.push(result.song)
      setSongs(songs)
      navigate('/songs/' + result.song._id)
    } else {
      console.log(result.message)
    }
  }

  async function editSong(song) {
    setDisabled(!disabled)
    return await sendRequest('/api/song/' + song._id, 'PUT', song)
  }

  async function deleteSong(id) {
    const index = songs.findIndex(song => song._id == id)
    songs.splice(index, 1)
    setSongs(songs)
    navigate('/songs')
    await sendRequest('/api/song/' + song._id, 'DELETE', song)
  }

  useEffect(() => {
    isNew ? generateSong() : getSong(id)
  },[id])


  
  const editButton = <div
    className="panel__btn _small _light _edit"
    onClick={() => setDisabled(false)}
  >Редактировать</div>

  const saveButton = <div
    className="panel__btn _small _light _save"
    onClick={() => isNew ? addSong(song) : editSong(song)}
  >Сохранить</div>

  const deleteButton = <div
    className="panel__btn _small _light _delete"
    onClick={() => deleteSong(song._id)}
  >Удалить</div>

  
  
  return song ? <>
    <div className='song'>
      <div className="song__header">
        <div className="panel__open-menu" onClick={updateOpenMenu}></div>

        <textarea
          className={'song__name' + disabledClass}
          value={song.name}
          readOnly={disabled}
          onChange={e => handleChange(e.target.value, 'name')}
          rows={1}
          placeholder="Название песни"
        />

        <div className="panel__menu menu">
          <div className="menu__wrapper">
            <div className="menu__tonality">
              <div className="menu__tonality-btn" onClick={() => setSizeText(sizeText-2)}>-</div>
              <div className="menu__tonality-btn" onClick={() => setSizeText(sizeText+2)}>+</div>
              <div className="menu__tonality-name">Изменить размер</div>
            </div>
            <div className="menu__tonality">
              <div className="menu__tonality-btn" onClick={() => transpose(false)}>-</div>
              <div className="menu__tonality-btn" onClick={() => transpose(true)}>+</div>
              <div className="menu__tonality-name">Транспонировать</div>
            </div>
            {disabled ? editButton : saveButton}
            {deleteButton}
          </div>
        </div>

      </div>
      <div className="song__subheader">
        <select
          className={'song__select' + disabledClass}
          defaultValue={song.category}
          onChange={e => handleChange(e.target.value, 'category')}
        >
          <option value=''>Выберете категорию</option>
          {categories.map((category, id) => 
            <option value={category} key={id}>{category}</option>
          )}
        </select>
      </div>
      <SongText
        blocks={song.text}
        sizeText={sizeText}
        disabled={disabled}
        handleChange={handleChange}
      />
    </div>
  </> : ''
}