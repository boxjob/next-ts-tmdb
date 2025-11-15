'use client'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IGenre } from '@/types'

export const Sidebar = () => {
  
  const [menu, setMenu] = useState<IGenre[]>([])
  const active = usePathname()
  const genre = useSearchParams()
  const genreActive = genre.get('genre')
  
  useEffect(() => {
    const fetchGenreMenu = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}/genre/movie/list`, {
          params: {
            api_key: process.env.API_KEY,
            language: 'en-US',
          }
        })
        setMenu(response.data.genres)
      }
      catch (error) {
        console.error('Erro ao buscar filmes:', error)
        throw error
      }
    }
    fetchGenreMenu()
  }, [])

  return (
    <aside className='hidden md:block w-full h-[calc(100vh-40px)] p-4 bg-zinc-50 dark:bg-zinc-900 overflow-hidden overflow-y-auto transition-all duration-700'>
      <div>
        <h2 className='text-xl font-semibold mb-3'>Discover</h2>
        <ul className='space-y-4 ml-2 text-sm'>
          <li>
            <Link 
              href='/discover/now_playing'
              className={`${active === '/discover/now_playing' ? 'text-zinc-400 underline underline-offset-4' : ''}`}
              >Now Playng
            </Link>
          </li>
          <li>
            <Link 
              href='/discover/top_rated'
              className={`${active === '/discover/top_rated' ? 'text-zinc-400 underline underline-offset-4' : ''}`}
              >Top Rated
            </Link>
          </li>
          <li>
            <Link 
              href='/discover/popular'
              className={`${active === '/discover/popular' ? 'text-zinc-400 underline underline-offset-4' : ''}`}
              >Popular
            </Link>
          </li>
          <li>
            <Link 
              href='/discover/upcoming'
              className={`${active === '/discover/upcoming' ? 'text-zinc-400 underline underline-offset-4' : ''}`}
              >Upcoming
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-3 mt-6'>Genre</h2>
        <ul className='space-y-4 ml-2 text-sm'>
          {menu.map((g: IGenre) =>
            <li key={ g.id }>
              <Link 
                href={`/genre/${g.id}?genre=${g.name.toLowerCase()}`}
                className={`${genreActive === g.name.toLowerCase() ? 'text-zinc-400 underline underline-offset-4' : '' }`}
              >
                { g.name }
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}
