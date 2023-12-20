import React, { useEffect } from 'react'
import PokemonCard from './PokemonCard'
import { usePokemonContext } from '@/context/AppContext'

const PokemonList = () => {
  const {
    state: { pokemon, loading, searchTerm, debouncedTerm },
    dispatch
  } = usePokemonContext()

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

  const filteredPokemon = pokemon.filter(poke => poke.name.toLowerCase().includes(debouncedTerm.toLowerCase()))

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        />
        <button onClick={handleClearSearch}>Clear</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredPokemon.map(poke => (
            <PokemonCard
              key={poke.name}
              name={poke.name}
              url={poke.url}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonList
