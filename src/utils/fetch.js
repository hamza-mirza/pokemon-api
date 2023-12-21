/**
 * @file fetch.js
 * Contains utility functions for fetching pokemon data from the external API.
 * Encapsulates the logic for making HTTP requests and handling responses.
 * Exports functions for fetching both the list of pokemon and individual pokemon details.
 */

const BASE_URL = 'https://pokeapi.co/api/v2'

// Function to fetch the list of pokemons
export const fetchPokemonList = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20`)
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list.')
  }
  return await response.json()
}

// Function to fetch details of a specific pokemon by ID.
export const fetchPokemonDetails = async id => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch details for pokemon ID: ${id}`)
  }
  return await response.json()
}
