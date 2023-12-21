/**
 * @file PokemonInfo.js
 * This component is responsible for displaying detailed information about a specific pokemon.
 * It fetches the pokemon's details based on the provided ID and presents them in a visually appealing layout.
 * Includes a flipping card animation to showcase different images of the pokemon.
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { fetchPokemonDetails } from '@/utils/fetch'
import { capitaliseFirstLetter } from '@/utils/helpers'
import Header from '@/components/Header'
import Wrapper from '@/components/Wrapper'

const PokemonInfo = () => {
  const router = useRouter() // Access the Next.js router
  const { id } = router.query // Retrieve the pokemon ID from the URL
  const [pokemon, setPokemon] = useState(null) // State to store the pokemon details

  // Fetch pokemon details when the ID is available
  useEffect(() => {
    if (id) {
      fetchPokemonDetails(id).then(setPokemon)
    }
  }, [id])

  // Display a loading message while pokemon data is being fetched
  if (!pokemon) {
    return <Wrapper>Loading...</Wrapper>
  }

  // Render the pokemon information
  return (
    <>
      <Header tagline={capitaliseFirstLetter(pokemon.name)} />
      <Wrapper>
        <div className="poke-info">
          <div className="poke-info-card-container">
            <div className="poke-info-card">
              <div className="poke-info-card-front">
                {/* Front image of the pokemon */}
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={`${pokemon.name} front`}
                  width={300}
                  height={300}
                />
              </div>
              <div className="poke-info-card-back">
                {/* Back image (shiny version) of the pokemon */}
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_shiny}
                  alt={`${pokemon.name} back`}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
          <p className="poke-info-point">Height: {pokemon.height}cm</p>
          <Link
            className="button poke-info-button"
            href="/"
          >
            Go back {/* Link to navigate back to the home page */}
          </Link>
        </div>
      </Wrapper>
    </>
  )
}

export default PokemonInfo
