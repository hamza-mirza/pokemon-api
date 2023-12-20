import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePokemonContext } from '@/context/AppContext'
import Wrapper from '@/components/Wrapper'

const Pokemon = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    state: { loading, pokemonDetails },
    dispatch
  } = usePokemonContext()

  useEffect(() => {
    if (!id) return
    const fetchPokemonDetails = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await response.json()
        dispatch({ type: 'SET_POKEMON_DETAILS', payload: data })
      } catch (error) {
        console.error('Error fetching pokemon details: ', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    fetchPokemonDetails()
  }, [id, dispatch])

  const details = pokemonDetails[id]

  if (loading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    )

  if (!details) return <Wrapper>No data found.</Wrapper>

  const imageUrl = details.sprites.other['official-artwork'].front_default

  return (
    <Wrapper>
      <h1>{details.name}</h1>
      <div>
        <img
          src={imageUrl}
          alt={details.name}
        />
      </div>
      <div>
        <div>
          <h2>Abilities</h2>
          <ul>
            {details.abilities.map(abilityInfo => (
              <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Stats</h2>
          <ul>
            {details.stats.map(statInfo => (
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
