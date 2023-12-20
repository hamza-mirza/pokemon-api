import React from 'react'
import Wrapper from '@/components/Wrapper'
import PokemonList from '@/components/PokemonList'

const Home = () => {
  return (
    <Wrapper>
      <h1>Pokémon List</h1>
      <PokemonList />
    </Wrapper>
  )
}

export default Home
