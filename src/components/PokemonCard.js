import React from 'react'
import Link from 'next/link'

const PokemonCard = React.memo(({ name, url }) => {
  const id = url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Link
      className="poke-card"
      href={`/pokemon/${id}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="poke-card-image"
      />
      <span className="poke-card-title">{name}</span>
    </Link>
  )
})

export default PokemonCard
