function Navigation({activeCategory, updateSearchText, updateCategory, categories}) {


    
  categories = categories.map((category, index) =>
    <div
      key={index}
      className="menu__item"
      onClick={() => {updateCategory(category)}}
    >{category}</div>
  )



  return (
    <div className="panel__header">
      <input
        className="search__input"
        onChange={evt => {updateSearchText(evt.target.value)}}
        placeholder="Поиск"
      ></input>
      <div className="panel__menu menu">
        <div className="menu__wrapper">
          <div
            onClick={() => {updateCategory("Избранное")}}
            className="menu__item"    
          >Избранное</div>
          {categories}
          <div
            // onClick={}
            className="panel__btn _edit _light _small"
          >Редактировать категории</div>
        </div>
      </div>
      {activeCategory != 'Все' ?
      <div
          className="panel__category panel__btn _small _light"
          onClick={() => updateCategory('Все')}
      >{activeCategory}</div> : ''}
    </div>
)
}


export default Navigation