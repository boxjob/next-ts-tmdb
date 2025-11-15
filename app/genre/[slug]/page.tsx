import { MovieClient } from "@/components/movie-client"
import { fetchMoviesByGenre } from "@/function/api-fetch"

export default async function Genrer({params, searchParams}:{params:Promise<{slug:string}>, searchParams: Promise<{ genre: string }> }) {
    const { slug } = await params
    const { genre } = await searchParams
    const movies = await fetchMoviesByGenre( slug )
    
    return (
        <section className='w-full h-[calc(100vh-40px)] overflow-hidden overflow-y-scroll p-4 md:px-6 bg-zinc-50 dark:bg-zinc-900 transition-all duration-700'>
            <h2 className='capitalize mb-8 text-3xl font-semibold'>{genre.replace(/%20/g, ' ')}</h2>
            <MovieClient slug={ slug } type='discover' initialMovies={ movies.results } />
        </section>
    )
}
