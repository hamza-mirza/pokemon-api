import React from 'react'
import Wrapper from '@/components/Wrapper'
import Logo from '@/components/Logo'
import PokemonList from '@/components/PokemonList'

const Home = () => {
  return (
    <>
      <header className="header">
        <Wrapper>
          <Logo
            title="PokeQuest"
            tagline="A clever tagline or something. Discover some Pokemons, view their abilities and stuff. Your basic Pokemon guide. At least I tried."
          />
        </Wrapper>
      </header>
      <PokemonList />
    </>
  )
}

export default Home
