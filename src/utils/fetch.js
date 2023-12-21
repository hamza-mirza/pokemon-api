const BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20`)
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list.')
  }
  return await response.json()
}

export const fetchPokemonDetails = async id => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokémon ID: ${id}`)
  }
  return await response.json()
}
