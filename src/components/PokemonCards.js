/**
 * @file PokemonCards.js
 * Renders the individual pokemon cards within the pokemon list.
 * Handles the 'Load More' functionality to paginate the displayed pokemons.
 * Fetches and displays detailed information upon clicking a pokemon card.
 */

import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import { fetchPokemonDetails } from '@/utils/fetch'
import PokemonCard from './PokemonCard'

// Component to render a list of Pokemon cards.
const PokemonCards = ({ setSelectedPokemon }) => {
  const [displayCount, setDisplayCount] = useState(6) // Number of pokemon to display initially.

  // Function to load more pokemon.
  const loadMorePokemon = () => {
    setDisplayCount(prevCount => prevCount + 6)
  }

  const {
    state: { pokemon, debouncedTerm }
  } = useAppContext()

  // Function to handle pokemon card click.
  const handlePokemonClick = async id => {
    try {
      const data = await fetchPokemonDetails(id)
      setSelectedPokemon(data)
    } catch (error) {
      console.error('Error fetching pokemon details: ', error)
    }
  }

  // Filter and slice the pokemon list based on search term and display count.
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
            className="button"
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
