import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import logoImg from './assets/Logo.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  
  useEffect(() =>{
    axios('https://nlw-esports-anderson.koyeb.app/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])

  return(
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt =""/>

      <h1 className='text-6xl text-white font-black mt-20 bg-nlw-gradient bg-clip-text'>
        Seu <span className='text-transparent '>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games
        .sort((a, b) => (a._count.ads > b._count.ads) ? -1 : 1)
        .map(game => {
          return(
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />)
        })}
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
export default App
