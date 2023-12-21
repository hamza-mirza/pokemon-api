/**
 * @file PokemonList.js
 * Main component responsible for rendering the list of pokemons.
 * Integrates searching and loading functionalities.
 * Manages the selected pokemon state and triggers the Modal component for displaying pokemon details.
 */

import { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards'
import PokemonDetails from './PokemonDetails'
import PokemonSearch from './PokemonSearch'
import Wrapper from './Wrapper'
import Modal from './Modal'
import { useAppContext } from '@/context/AppContext'
import { fetchPokemonList } from '@/utils/fetch'

// Main component to display the list of Pokemon.
const PokemonList = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null) // State to track the selected pokemon for details.

  const {
    state: { loading, searchTerm },
    dispatch
  } = useAppContext()

  // Fetch pokemon list when component mounts.
  useEffect(() => {
    const fetchPokemon = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const data = await fetchPokemonList()
        dispatch({ type: 'SET_POKEMON', payload: data.results })
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    fetchPokemon()
  }, [dispatch])

  // Debounce search term input.
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch({ type: 'SET_DEBOUNCED_TERM', payload: searchTerm })
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, dispatch])

  return (
    <div className="poke-list">
      <Wrapper>
        <PokemonSearch />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <PokemonCards setSelectedPokemon={setSelectedPokemon} />
            <Modal
              isOpen={!!selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            >
              {selectedPokemon && <PokemonDetails selectedPokemon={selectedPokemon} />}
            </Modal>
          </>
        )}
      </Wrapper>
    </div>
  )
}

export default PokemonList
