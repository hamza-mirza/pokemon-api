import Image from 'next/image'

import { formatString } from '@/utils/helpers'

const PokemonDetails = ({ selectedPokemon }) => {
  const pok = selectedPokemon
  const imageUrl = pok.sprites.other['official-artwork'].front_default
  const averageScore = Math.floor(
    selectedPokemon.stats.reduce((sum, statInfo) => {
      return sum + Math.min(statInfo.base_stat, 100)
    }, 0) / selectedPokemon.stats.length
  )

  return (
    <div className="poke-detail">
      <div className="poke-detail-image-container">
        <Image
          className="poke-detail-image"
          src={imageUrl}
          alt={pok.name}
          width={100}
          height={100}
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
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
