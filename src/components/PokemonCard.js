import Image from 'next/image'

const PokemonCard = ({ name, url, onClick }) => {
  const id = url.split('/').filter(Boolean).pop()
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
