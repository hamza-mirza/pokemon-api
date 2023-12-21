/**
 * @file PokemonDetails.js
 * Component for displaying detailed information about a specific pokemon.
 * Shows stats, abilities, and other relevant details of the selected pokemon.
 * Utilises utility functions for formatting and presenting data in a user-friendly manner.
 */

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/AppContext'
import { formatString } from '@/utils/helpers'

// Component to display detailed information about a selected Pokemon.
const PokemonDetails = ({ selectedPokemon }) => {
  const { dispatch } = useAppContext()
  const router = useRouter()
  const pok = selectedPokemon
  const imageUrl = pok.sprites.other['official-artwork'].front_default
  // Calculate the average score of the Pokemon's stats.
  const averageScore = Math.floor(pok.stats.reduce((sum, statInfo) => sum + Math.min(statInfo.base_stat, 100), 0) / pok.stats.length)

  const handleClearSearch = () => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' })
    dispatch({ type: 'SET_DEBOUNCED_TERM', payload: '' })
  }

  const handleOnClick = () => {
    router.push(`/pokemon/${pok.id}`)
    handleClearSearch()
  }

  return (
    <div className="poke-detail">
      <div className="poke-detail-image-container">
        <Image
          className="poke-detail-image"
          src={imageUrl}
          alt={pok.name}
          width={200}
          height={200}
        />
      </div>
      <div className="poke-detail-content">
        <div className="poke-detail-wrapper">
          <h1 className="poke-detail-title">{pok.name.toUpperCase()}</h1>
          <ul className="poke-detail-ability">
            <span className="poke-detail-ability-heading">Abilities:</span>
            {pok.abilities.map(abilityInfo => (
              <li
                className="poke-detail-ability-item"
                key={abilityInfo.ability.name}
              >
                {formatString(abilityInfo.ability.name)}
              </li>
            ))}
          </ul>
          <ul className="poke-detail-stats">
            <span className="poke-detail-stat-heading">Stats:</span>
            {pok.stats.map(statInfo => (
              <li
                className="poke-detail-stat-item"
                key={statInfo.stat.name}
              >
                {formatString(statInfo.stat.name)}: {Math.min(statInfo.base_stat, 100)}
                <span className="poke-detail-skill">
                  <span
                    className="poke-detail-skill-bar"
                    style={{ width: `${Math.min(statInfo.base_stat, 100)}%` }}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
          <p>Overall skill level: {averageScore}%</p>
          <button
            className="button poke-detail-button"
            onClick={handleOnClick}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
