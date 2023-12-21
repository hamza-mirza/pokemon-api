/**
 * @file index.js
 * The main landing page component of the application.
 * Hosts the application's logo and the main pokemon list component.
 * Serves as the primary entry point for users to interact with the application.
 */

import React from 'react'
import Wrapper from '@/components/Wrapper'
import Logo from '@/components/Logo'
import PokemonList from '@/components/PokemonList'

// Home component is the main landing page of the application.
const Home = () => {
  return (
    <>
      <header className="header">
        <Wrapper>
          {/* Logo component with title and tagline. */}
          <Logo
            title="PokeQuest"
            tagline="A clever tagline or something. Discover some Pokemons, view their abilities and stuff. Your basic Pokemon guide. At least I tried."
          />
        </Wrapper>
      </header>
      {/* Main list of pokemons displayed on the homepage. */}
      <PokemonList />
    </>
  )
}

export default Home
