'use client'
import { Menu, Search, SearchX } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import { IGenre } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

export const Header = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [menu, setMenu] = useState<IGenre[]>([])
  const active = usePathname()
  const genre = useSearchParams()
  const genreActive = genre.get('genre')
  const [input, setInput] = useState('')
  const router = useRouter()

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

  const handleSerch = (e:FormEvent) => {
    e.preventDefault()
    setInput('')
    setOpenSearch( false )
    router.push(`/search/${ input }`)
  }

  return (

    <header >
      <div className='hidden fixed w-full z-10 px-4  md:block bg-gray-100 text-zinc-600 drop-shadow-lg dark:bg-zinc-800 dark:text-zinc-200 transition-all duration-700'>
        <div className='flex items-center justify-between h-10 '>
          <h1 className='font-bold text-2xl'>
            <Link href='/'>Movies.</Link>
          </h1>
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <div className='flex items-center border rounded-md border-gray-400 overflow-hidden'>
              <input
                type="text"
                placeholder='search movie...'
                className='outline-none ml-2 text-xs w-48 placeholder:text-gray-400'
                value={ input }
                onChange={ e => setInput( e.target.value )}
              />
              <button onClick={ handleSerch } className='px-1 h-6 bg-zinc-800 cursor-pointer hover:bg-zinc-600 transition-all duration-500'>
                <Search size={18} className='text-gray-50' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* menu mobile */}
      <div className='relative z-40 w-full h-9 md:hidden '>
        <div className='flex items-center justify-between w-full h-10 px-4 bg-gray-50 text-gray-800 drop-shadow-lg dark:bg-zinc-900 dark:text-white transition-all duration-700'>
          <div className='flex-1  relative overflow-hidden'>
            <Menu size={20} className='md:hidden' onClick={() => setOpenMenu(!openMenu)} />
          </div>
          <div className='flex-1'>
            <h1 className='font-bold text-2xl text-zinc-500 dark:text-zinc-300'>
              <Link href='/'>Movies.</Link>
            </h1>
          </div>

          <div className='flex-1 flex items-center justify-end gap-3'>
            <ThemeToggle />
            <button className='px-1 h-6 rounded cursor-pointer' onClick={() => setOpenSearch(!openSearch)}>
              {
                openSearch === false
                  ? <Search size={20} className='text-gray-400' />
                  : <SearchX size={20} className='text-red-400' />
              }
            </button>
          </div>
        </div>

        {/* search */}
        <div className={`fixed -z-10 w-full h-24 left-0 right-0 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 transition-all ease-in-out duration-500 ${openSearch === true ? 'bottom-0' : '-bottom-24'}`}>
          <div className='px-4 pt-7'>
            <div className='flex items-center border-2 rounded-lg border-zinc-600 overflow-hidden'>
              <input
                type="text"
                placeholder='search movie...'
                className='outline-none text-sm w-full px-2 h-8 placeholder:text-gray-400'
                onChange={ e => setInput( e.target.value )}
                value={ input }
              />
              <button onClick={ handleSerch } className='px-2 h-8 bg-zinc-600'>
                <Search size={20} className='text-gray-50' />
              </button>
            </div>
          </div>
        </div>

        {/* links */}
        <div className={`fixed -z-30 pt-8 top-9 left-0 w-full h-[calc(100vh-41px)] bg-zinc-50 dark:bg-zinc-800 transition-all duration-500 ${openMenu === true ? 'top-0' : '-translate-y-full -mt-10'} overflow-hidden overflow-y-auto`}>
          <div className='px-4'>
            <h2 className='text-xl px-2 font-semibold mb-3 dark:text-zinc-100'>Discover</h2>
            <ul className='space-y-4 px-4 text-sm dark:text-zinc-100'>
              <li
                onClick={() => setOpenMenu(false)}
                className={`w-full py-1 px-2 ${active === '/discover/now_playing'
                  ? 'text-zinc-400 border-b'
                  : ''}
              `}>
                <Link href='/discover/now_playing' >Now Playng </Link>
              </li>
              <li
                onClick={() => setOpenMenu(false)}
                className={`w-full py-1 px-2 ${active === '/discover/top_rated'
                  ? 'text-zinc-400 border-b'
                  : ''}
              `}>
                <Link href='/discover/top_rated'>
                  Top Rated
                </Link>
              </li>
              <li
                onClick={() => setOpenMenu(false)}
                className={`w-full py-1 px-2 ${active === '/discover/popular'
                  ? 'text-zinc-400 border-b'
                  : ''}
              `}>
                <Link
                  href='/discover/popular'>Popular
                </Link>
              </li>
              <li
                onClick={() => setOpenMenu(false)}
                className={`w-full py-1 px-2 ${active === '/discover/upcoming'
                  ? 'text-zinc-400 border-b'
                  : ''}
              `}>
                <Link href='/discover/upcoming'>
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          
          <div className='mb-8 px-4'>
            <h2 className='text-xl px-2 font-semibold mb-3 mt-6 dark:text-zinc-100'>Genre</h2>
            <ul className='space-y-4 px-4 text-sm dark:text-zinc-100'>
                {menu.map((g: IGenre) =>
                  <li
                    key={g.id}
                    onClick={() => setOpenMenu(false)}
                    className={`w-full py-1 px-2 ${ genreActive === g.name.toLowerCase()
                      ? 'text-zinc-400 border-b dark:text-zinc-500'
                      : ''}
                  `}>
                    <Link href={`/genre/${g.id}?genre=${g.name.toLowerCase()}`}>
                      {g.name}
                    </Link>
                  </li>
                )}
            </ul>
          </div>
          
        </div>

      </div>
    </header>
  )
}
