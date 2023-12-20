import { PokemonProvider } from '@/context/AppContext'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Component {...pageProps} />
    </PokemonProvider>
  )
}
