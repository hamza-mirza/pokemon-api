import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import Modal from './Modal'
import { useAppContext } from '@/context/AppContext'

const PokemonList = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const {
    state: { pokemon, loading, searchTerm, debouncedTerm },
    dispatch
  } = useAppContext()

  useEffect(() => {
    const fetchPokemon = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = await response.json()
        dispatch({ type: 'SET_POKEMON', payload: data.results })
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    fetchPokemon()
  }, [dispatch])

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch({ type: 'SET_DEBOUNCED_TERM', payload: searchTerm })
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, dispatch])

  const handleClearSearch = () => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' })
    dispatch({ type: 'SET_DEBOUNCED_TERM', payload: '' })
  }

  const handlePokemonClick = async id => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      const data = await response.json()
      setSelectedPokemon(data)
    } catch (error) {
      console.error('Error fetching pokemon details: ', error)
    }
  }
  console.log(selectedPokemon)
  const filteredPokemon = pokemon.filter(poke => poke.name.toLowerCase().includes(debouncedTerm.toLowerCase()))

  return (
    <div className="poke-list">
      <div className="poke-list-search">
        <input
          className="poke-list-search-input"
          placeholder="Search Pokémon"
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="poke-list-cards">
            {filteredPokemon.map(poke => (
              <PokemonCard
                key={poke.name}
                name={poke.name}
                url={poke.url}
                onClick={() => handlePokemonClick(poke.name)}
              />
            ))}
          </div>
          <Modal
            isOpen={!!selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          >
            {/* Render selected Pokemon details */}
            {selectedPokemon && (
              <div>
                <h1>{selectedPokemon.name}</h1>
                <ul>
                  {selectedPokemon.abilities.map(abilityInfo => (
                    <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                  ))}
                </ul>
                <ul>
                  {selectedPokemon.stats.map(statInfo => (
                    <li key={statInfo.stat.name}>
                      {statInfo.stat.name}: {statInfo.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  )
}

export default PokemonList
