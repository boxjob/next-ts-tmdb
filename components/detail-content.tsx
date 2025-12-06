'use client'
import { IDetail } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { X } from "lucide-react"
import { useRouter } from 'next/navigation'

export const DetailContent = (props: IDetail) => {

  const totalGenres = props.genres.length
  const [ trailer, setTrailer ] = useState<string | undefined>( undefined )
  const router = useRouter()

  console.log( trailer )
  
  useEffect(() => {
    const trailerIdx = props.videos.results.find( v => v.type === 'Trailer' )
    if( trailerIdx === undefined ){
      setTrailer( trailerIdx )
    } else {
      const trailerUrl = `https://www.youtube.com/watch?v=${trailerIdx?.key}`
      setTrailer( trailerUrl )
    }
  },[])

  return (
    <article className='mb-10 relative'>
      <X  className='absolute top-0 right-0 cursor-pointer hover:text-zinc-400' onClick={ router.back } />
      <div className='flex flex-col items-center md:flex-row md:items-start gap-8'>
        <figure className='relative md:max-w-1/2 max-h-[750px] mt-8'>
          <Image
            loading='eager'
            src={ props.poster_path ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : '/placeholder-photo-img.jpg'}
            alt={props.title}
            width={500}
            height={750}
            quality={75}
            className='rounded-lg'
          />
        </figure>

        <div className='flex-1 space-y-3'>
          <h1 className='text-4xl font-bold my-8'>{props.title}</h1>
          <div className='flex space-x-4 font-medium'>
            <p className='font-bold'>Genre:</p>
            {props.genres.map((item, idx) =>
              <Link
                href={`../genre/${item.id}?genre=${item.name.toLowerCase()}`}
                key={item.id}
              >
                <span className='pr-2 hover:underline underline-offset-4'>
                  {item.name}
                </span>
                <i>{idx + 1 !== totalGenres ? '|' : ''}</i>
              </Link>)
            }
          </div>
          <div>
            <p className='font-bold'>Time: <span className='font-medium'>{props.runtime}</span></p> 
          </div>
          <div className=''>
            <p className='font-bold'>Overview</p>
            <p>{props.overview}</p>
          </div>

          <div className='mt-10'>
            { trailer === undefined 
              ?( <p className='text-3xl text-zinc-300 font-bold dark:text-zinc-800'>No Trailer</p> ) 
              :(
                <div className=' md:max-w-[650px] md:mr-4'>
                  <div className='relative pt-[56.25%]'>
                    <ReactPlayer
                      src={`${trailer}`}
                      width='100%'
                      height='100%'
                      style={{ position: 'absolute', top: '0', left: '0', aspectRatio: '16/9' }}
                      controls={true}
                      playing={false}
                    />
                  </div>
                </div> 
                )
            }
            </div>
        </div>
      </div>
    </article>
  )

}
