import { MovieClient } from "@/components/movie-client"
import { fetchMovies } from "@/function/api-fetch"

export default async function Discover({params}:{params:Promise<{slug:string}>}) {
  const { slug } = await params
  const movies = await fetchMovies(slug)
  return (
    <section className='w-full h-[calc(100vh-40px)] overflow-hidden overflow-y-scroll py-4 px-4 md:px-6 bg-zinc-50 dark:bg-zinc-900 transition-all duration-700'>
      <h2 className='capitalize mb-8 text-3xl font-semibold'>{slug.replace('_', ' ')}</h2>
      <MovieClient slug={ slug } type='discover' initialMovies={ movies.results } />
    </section>
  )
}
