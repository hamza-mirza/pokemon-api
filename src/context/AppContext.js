/**
 * @file AppContext.js
 * Provides a React context for global state management across the application.
 * Utilises useReducer for handling state changes in a more predictable way.
 * Centralises the state and logic for fetching, displaying, and interacting with pokemon data.
 */

import { createContext, useReducer, useContext } from 'react'

// Create a context for the entire application.
const AppContext = createContext()

// Define the initial state of the app.
const initialState = {
  pokemon: [], // List of pokemon
  loading: true, // Loading state for async operations
  searchTerm: '', // Search term for filtering pokemon
  debouncedTerm: '', // Processed search term to reduce API calls
  pokemonDetails: {} // Details of individual pokemon
}

// Reducer function to handle state changes.
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMON':
      // Update the pokemon list and set loading to false
      return { ...state, pokemon: action.payload, loading: false }
    case 'SET_LOADING':
      // Set the loading state
      return { ...state, loading: action.payload }
    case 'SET_SEARCH_TERM':
      // Update the search term
      return { ...state, searchTerm: action.payload }
    case 'SET_DEBOUNCED_TERM':
      // Update the debounced search term
      return { ...state, debouncedTerm: action.payload }
    default:
      return state
  }
}

// Context provider component to wrap the app components.
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState)

  // Provide the state and dispatch function to children components.
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Custom hook to use the AppContext.
export const useAppContext = () => {
  return useContext(AppContext)
}
