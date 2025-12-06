import { DetailContent } from "@/components/detail-content"
import { fetchMovieDetail } from "@/function/api-fetch"

export default async function Detail({ params }: { params:Promise<{ slug: string }> }) {
    const { slug } = await params
    const details = await fetchMovieDetail( slug )

    return (
        <section className='w-full h-[calc(100vh-40px)] overflow-hidden overflow-y-scroll p-4 md:px-6 bg-zinc-50 dark:bg-zinc-900 transition-all duration-700'>
            <DetailContent { ...details }/>
        </section>
    )
}
