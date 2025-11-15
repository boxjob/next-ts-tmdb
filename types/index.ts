export interface IGenre{
    id: number
    name: string
}

export interface ICard {
    id: number
    poster_path: string
    title: string
    release_date: string
    overview: string
    vote_average: number
}

export interface IDetail {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    overview: string
    runtime: number
    release_date: string
    tagline: string
    vote_average: number
    genres: IGenre[]
    videos: Videos
}

export interface Videos {
  results: Result[]
}

export interface Result {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}