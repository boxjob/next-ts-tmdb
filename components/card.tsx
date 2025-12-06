import { ICard } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export const Card = (props: ICard) => {
  
  return (
    <article className='md:hover:shadow-lg md:p-3 rounded-xl  dark:shadow-black'>
      <Link href={`/detail/${props.id}`}>
        <div className="relative w-full aspect-2/3">
          <Image
            src={ props.poster_path ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : '/placeholder-photo-img.jpg'}
            alt={props.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
            className="rounded-xl object-cover"
            quality={75}
          />
        </div>
        <div className='mt-2 mb-4'>
          <h2 className='font-semibold line-clamp-1 my-3'>{props.title}</h2>
          <p className='text-sm line-clamp-2'>{props.overview}</p>
        </div>
      </Link>
    </article>
  )
}
