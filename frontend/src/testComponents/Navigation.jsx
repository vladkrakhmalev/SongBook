export default function Navigation() {

  return (
    <div className="panel__header">
      <input
        className="search__input"
        placeholder="Поиск"
      />
      <div className="panel__menu menu">
        <div className="menu__wrapper">
          <div className="menu__item">Избранное</div>
        </div>
      </div>
    </div>
)
}