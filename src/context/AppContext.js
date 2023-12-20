import { createContext, useReducer, useContext } from 'react'

const PokemonContext = createContext()

const initialState = {
  pokemon: [],
  loading: true,
  searchTerm: '',
  debouncedTerm: '',
  pokemonDetails: {}
}

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, pokemon: action.payload, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_DEBOUNCED_TERM':
      return { ...state, debouncedTerm: action.payload }
    case 'SET_POKEMON_DETAILS':
      return {
        ...state,
        pokemonDetails: {
          ...state.pokemonDetails,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state
  }
}

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState)

  return <PokemonContext.Provider value={{ state, dispatch }}>{children}</PokemonContext.Provider>
}

export const usePokemonContext = () => {
  return useContext(PokemonContext)
}
