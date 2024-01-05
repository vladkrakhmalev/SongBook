import { useEffect, useState } from "react";
import SongText from "./SongText";



function Song({isEditSong, updateIsEditSong, deleteSong, saveSong, saveNewSong, updateOpenMenu, categories, tonalities, activeSong}) {

  const [song, setSong] = useState(null)
  const [sizeText, setSizeText] = useState(18)

  useEffect(() => setSong(activeSong), [activeSong])



  function handleChange(value, prop) {
    const newSong = {...song}
    newSong[prop] = value
    setSong(newSong)
  }

  function transposition(tonality, isUp) {
    let id = tonalities.indexOf(tonality)
      
    if (isUp) {
      id = id === 0 ? tonalities.length-1 : id-1
    } else {
      id = id === tonalities.length-1 ? 0 : id+1
    }

    return tonalities[id]
  }

  function transpose(isUp) {
    const regexp = new RegExp(`${tonalities.join('|')}`, 'g')
    const text = song.text.map(block => {
      block.value = block.value.replaceAll(regexp, match => transposition(match, isUp))
      return block
    })
    handleChange(text, 'text')
  }



  const saveHandler = () => {
    if (isEditSong) song._id ? saveSong(song) : saveNewSong(song)
    updateIsEditSong(!isEditSong)
  }

  const selectCategories = categories.map((category, id) => {
    return <option
      value={category}
      key={id}
    >{category}</option>
  })
  
  return <>
    {song ? <div className={'song' + (isEditSong ? '' : " _disabled")}>
    <div className="song__header">
      <div className="panel__open-menu" onClick={() => updateOpenMenu(true)}></div>

      <textarea
        className={'song__name' + (isEditSong ? '' : " _disabled")}
        value={song.name}
        readOnly={!isEditSong}
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

          <div 
            onClick={saveHandler}
            className={"panel__btn _small _light" + (isEditSong ? " _save" : " _edit")}
          >{isEditSong ? 'Сохранить' : 'Редактировать'}</div>

          <div onClick={() => deleteSong(song)} className="panel__btn _small _light _delete">Удалить</div>
        </div>
      </div>

    </div>
    {isEditSong ? <div className="song__subheader">
      <select
        className="song__select"
        defaultValue={song.category}
        onChange={e => handleChange(e.target.value, 'category')}
      >
        <option value=''>Выберете категорию</option>
        {selectCategories}
      </select>
    </div> : ''}
    <SongText
      blocks={song.text}
      sizeText={sizeText}
      disabled={!isEditSong}
      handleChange={handleChange}
    />
  </div> : ''}
  </>
}


export default Song