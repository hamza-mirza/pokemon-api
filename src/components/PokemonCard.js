import React from 'react'
import Link from 'next/link'

const PokemonCard = ({ name, url }) => {
  const id = url.split('/').filter(Boolean).pop()

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Link href={`/pokemon/${id}`}>
      <img
        src={imageUrl}
        alt={name}
      />
      <span className="text-xl capitalize font-semibold">{name}</span>
    </Link>
  )
}

export default PokemonCard
