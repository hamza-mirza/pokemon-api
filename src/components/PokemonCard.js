/**
 * @file PokemonCard.js
 * Represents a single pokemon card in the pokemon list.
 * Displays basic information like pokemon's name and image.
 * Triggers a callback function when clicked, used for displaying detailed information.
 */

import Image from 'next/image'

// Component to display an individual Pokemon card.
const PokemonCard = ({ name, url, onClick }) => {
  // Extract the Pokemon ID from the URL.
  const id = url.split('/').filter(Boolean).pop()
  // Construct the image URL for the Pokemon's artwork.
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <div
      className="poke-card"
      onClick={() => onClick(id)}
    >
      <div className="poke-card-image-container">
        <Image
          src={imageUrl}
          alt={name}
          className="poke-card-image"
          width={100}
          height={100}
        />
      </div>
      <span className="poke-card-title">{name}</span>
    </div>
  )
}

export default PokemonCard
