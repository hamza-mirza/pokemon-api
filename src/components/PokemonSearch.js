import { useAppContext } from '@/context/AppContext'

const PokemonSearch = () => {
  const {
    state: { searchTerm },
    dispatch
  } = useAppContext()

  const handleClearSearch = () => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' })
    dispatch({ type: 'SET_DEBOUNCED_TERM', payload: '' })
  }

  return (
    <div className="poke-list-search">
      <input
        className="poke-list-search-input"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
      />
      <button
        className="poke-list-search-clear"
        onClick={handleClearSearch}
      >
        &times;
      </button>
    </div>
  )
}

export default PokemonSearch
