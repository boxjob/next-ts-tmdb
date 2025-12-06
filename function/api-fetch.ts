'use server'
import axios from "axios"

export const fetchMovies = async (slug:string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/${slug}`, {
            params: {
                api_key: process.env.API_KEY,
                language: 'en-US',   
            }
        })
        return response.data
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
        throw error
    }
}

export const fetchMoviesByGenre = async (id:string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/discover/movie?with_genres=${ id }`, {
            params: {
                api_key: process.env.API_KEY,
                language: 'en-US',
            }
        })
        return response.data
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
        throw error
    }
}

export const fetchMovieDetail = async (slug:string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/${slug}?append_to_response=videos`, {
            params: {
                api_key: process.env.API_KEY,
                language: 'en-US',
            }
        })
        return response.data
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
        throw error
    }
}

export const fetchMovieSearch = async (slug:string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/search/movie`, {
            params: {
                api_key: process.env.API_KEY,
                language: 'en-US',
                query: slug
            }
        })
        return response.data
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
        throw error
    }
}









