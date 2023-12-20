import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        const data = await response.json()
        setPokemon(data.results)
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const handleClearSearch = () => {
    setSearchTerm('')
    setDebouncedTerm('')
  }

  const filteredPokemon = pokemon.filter(poke => poke.name.toLowerCase().includes(debouncedTerm.toLowerCase()))

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
