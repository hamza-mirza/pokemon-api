import { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards'
import PokemonDetails from './PokemonDetails'
import PokemonSearch from './PokemonSearch'
import Wrapper from './Wrapper'
import Modal from './Modal'
import { useAppContext } from '@/context/AppContext'

import { fetchPokemonList } from '@/utils/fetch'

const PokemonList = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const {
    state: { loading, searchTerm },
    dispatch
  } = useAppContext()

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
