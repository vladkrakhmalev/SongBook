import React from "react";
import { tonalities } from "../tonalityData";



function Song({isEditSong, updateIsEditSong, song, editSong, deleteSong, updateOpenMenu, categories}) {

  const textareaRef = React.useRef(null)
  const selectCategories = categories.map((category, id) => {
    return <option
      value={category}
      key={id}
    >{category}</option>
  })



  React.useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit"
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }, [song.name])

  function handleIsDisabled() {
    updateIsEditSong(!isEditSong)
  }

  function handleChange(value, prop) {
    const newSong = {...song}
    newSong[prop] = value
    editSong(newSong)
  }

  function transposition(tonality, isUp) {
    let id = tonalities.indexOf(tonality)
      
    if (isUp) {
      id = id == 0 ? tonalities.length-1 : id-1
    } else {
      id = id == tonalities.length-1 ? 0 : id+1
    }

    return tonalities[id]
  }

  function transpose(isUp) {
    const regexp = new RegExp(`${tonalities.join('|')}`, 'g')
    const text = song.text.replaceAll(regexp, match => transposition(match, isUp))

    handleChange(text, 'text')
  }


  
  return (
    <div className={'song' + (isEditSong ? '' : " _disabled")}>
      <div className="song__header">
        <div
          className="panel__open-menu"
          onClick={() => updateOpenMenu(true)}
        ></div>
        <textarea
          className={'song__name' + (isEditSong ? '' : " _disabled")}
          value={song.name}
          readOnly={!isEditSong}
          onChange={e => handleChange(e.target.value, 'name')}
          ref={textareaRef}
          rows={1}
          placeholder="Название песни"
        />
        <div className="panel__menu menu">
          <div className="menu__wrapper">
            <div className="menu__tonality">
              <div
                className="menu__tonality-btn"
                onClick={() => transpose(false)}
              >-</div>
              <div
                className="menu__tonality-btn"
                onClick={() => transpose(true)}
              >+</div>
              <div className="menu__tonality-name">Транспонировать</div>
            </div>
            <div
              onClick={handleIsDisabled}
              className={"panel__btn _small _light" + (isEditSong ? " _save" : " _edit")}
            >{isEditSong ? 'Сохранить' : 'Редактировать'}</div>
            <div
              onClick={() => deleteSong(song)}
              className="panel__btn _small _light _delete"
            >Удалить</div>
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
        <input
          className="song__number"
          type="number"
          placeholder="Номер"
          value={song.number || ''}
          onChange={e => handleChange(e.target.value, 'number')}
        />
      </div> : ''}
      <textarea
        className={'song__text' + (isEditSong ? '' : " _disabled")}
        value={song.text}
        readOnly={!isEditSong}
        onChange={e => handleChange(e.target.value, 'text')}
        placeholder="Текст и аккорды песни"
      />
      <div className="" contentEditable={true}></div>
    </div>
  )
}


export default Song