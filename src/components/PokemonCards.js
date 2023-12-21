import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import { fetchPokemonDetails } from '@/utils/fetch'

import PokemonCard from './PokemonCard'

const PokemonCards = ({ setSelectedPokemon }) => {
  const [displayCount, setDisplayCount] = useState(6)
  const loadMorePokemon = () => {
    setDisplayCount(prevCount => prevCount + 6)
  }
  const {
    state: { pokemon, debouncedTerm }
  } = useAppContext()

  const handlePokemonClick = async id => {
    try {
      const data = await fetchPokemonDetails(id)
      setSelectedPokemon(data)
    } catch (error) {
      console.error('Error fetching pokemon details: ', error)
    }
  }

  const displayedPokemon = pokemon.slice(0, displayCount)

  const filteredPokemon = displayedPokemon.filter(poke => poke.name.toLowerCase().includes(debouncedTerm.toLowerCase()))

  return (
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
      {pokemon.length > displayCount && !debouncedTerm.length && (
        <div className="poke-list-cards-load-more">
          <button
            className="poke-list-cards-load-more-btn"
            onClick={loadMorePokemon}
          >
            Load More
          </button>
        </div>
      )}
      {!filteredPokemon.length && <p>No pokemons found.</p>}
    </>
  )
}

export default PokemonCards
