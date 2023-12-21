/**
 * @file PokemonSearch.js
 * Provides a search input for filtering the pokemon list.
 * Integrates with the global state to handle search term changes and debounce logic.
 * Allows users to clear the current search input.
 */

import { useAppContext } from '@/context/AppContext'

// Component for the search functionality in the Pokemon list.
const PokemonSearch = () => {
  const {
    state: { searchTerm },
    dispatch
  } = useAppContext()

  // Clear the current search term.
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
      {searchTerm && (
        <button
          className="poke-list-search-clear"
          onClick={handleClearSearch}
        >
          &times;
        </button>
      )}
    </div>
  )
}

export default PokemonSearch
