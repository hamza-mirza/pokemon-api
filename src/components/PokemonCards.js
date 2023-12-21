import { useAppContext } from '@/context/AppContext'
import { fetchPokemonDetails } from '@/utils/fetch'

import PokemonCard from './PokemonCard'

const PokemonCards = ({ setSelectedPokemon }) => {
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

  const filteredPokemon = pokemon.filter(poke => poke.name.toLowerCase().includes(debouncedTerm.toLowerCase()))
  return (
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
  )
}

export default PokemonCards
