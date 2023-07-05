import ListItem from './ListItem';


function List(props) {


  const filterSong = songs => {
    if (props.activeCategory != 'Все') {
      props.activeCategory == 'Избранное' ?
        songs = songs.filter(song => song.isFavorite) :
        songs = songs.filter(song => song.category.match(props.activeCategory))
    }
    if (props.searchText) songs = songs.filter(song => song.name.match(props.searchText))
    return songs
  }
  

  return (
    <div>
      {filterSong(props.songs).map(song =>
        <ListItem
          key={song.id}
          song={song}
          {...props}
        />
      )}
    </div>
  )
}


export default List