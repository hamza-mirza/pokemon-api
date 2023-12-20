import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Wrapper from '@/components/Wrapper'

const Pokemon = () => {
  const router = useRouter()
  const { id } = router.query
  const [pokemonDetails, setPokemonDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await response.json()
        setPokemonDetails(data)
      } catch (error) {
        console.error('Error fetching pokemon details: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetails()
  }, [id])

  if (loading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    )

  if (!pokemonDetails) return <Wrapper>No data found.</Wrapper>
  console.log(pokemonDetails)
  const imageUrl = pokemonDetails.sprites.other['official-artwork'].front_default
  return (
    <Wrapper>
      <h1>{pokemonDetails.name}</h1>
      <div>
        <img
          src={imageUrl}
          alt={pokemonDetails.name}
        />
      </div>
      <div>
        <div>
          <h2>Abilities</h2>
          <ul>
            {pokemonDetails.abilities.map(abilityInfo => (
              <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Stats</h2>
          <ul>
            {pokemonDetails.stats.map(statInfo => (
              <li key={statInfo.stat.name}>
                {statInfo.stat.name}: {statInfo.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

export default Pokemon
