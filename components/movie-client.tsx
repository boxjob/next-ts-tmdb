'use client'

import { ICard } from '@/types'
import { useEffect, useState } from 'react'
import { Card } from './card'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import axios from 'axios'

interface IMovieClient {
    initialMovies: ICard[]
    slug: string | number
    type?: string 
}

export const MovieClient = ({ slug, type, initialMovies }: IMovieClient) => {

    const [movies, setMovies] = useState<ICard[]>( initialMovies )
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)

    useEffect(() => {
        if( type === 'genre'){
            if( page <= 1) return 
            fetchScrollGenre( page )

        } else {
            if( page <= 1) return 
            fetchScrollDiscover( page )
        }
    }, [page, slug])


    const fetchScrollGenre = async ( page:number ) => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.BASE_URL}/discover/movie?with_genres=${slug}`, {
                params: {
                    api_key: process.env.API_KEY,
                    language: 'en-US',
                    page: page,
                }
            })

            const data = response.data

            if (data.results.length === 0) {
                setHasNextPage(false)
                return
            }

            setMovies(prev => [...prev, ...data.results])

        } catch (error) {
            console.error('Erro ao buscar filmes:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const fetchScrollDiscover = async ( page:number ) => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.BASE_URL}/discover/movie?${slug}`, {
                params: {
                    api_key: process.env.API_KEY,
                    language: 'en-US',
                    page: page,
                }
            })

            const data = response.data

            if (data.results.length === 0) {
                setHasNextPage(false)
                return
            }

            setMovies(prev => [...prev, ...data.results])

        } catch (error) {
            console.error('Erro ao buscar filmes:', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const [infiniteRef] = useInfiniteScroll({
        loading,
        hasNextPage: true,
        onLoadMore: () => {
            if (!loading && hasNextPage) {
                setPage((prev) => prev + 1)
            }
        }
    })

    return (
        <div>
            <div className='grid grid-cols-2 gap-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  md:gap-2'>
                {movies.map((m, idx) =>
                    <Card key={idx} {...m} />
                )}
            </div>
            {hasNextPage ? (
                <div
                    ref={infiniteRef}
                    className="w-full text-gray-500 py-4"
                >
                    {loading ? 'Loading...' : 'Next Movies...'}
                </div>
            ) : (
                <div className="w-full text-gray-400 py-4">
                    It's over now.
                </div>
            )}
        </div>
    )
}