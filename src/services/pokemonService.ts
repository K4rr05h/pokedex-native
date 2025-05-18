import api from '../api/pokeapi'

type PokemonListItem = {
  name: string
  url: string
}

type PokemonListResponse = {
  results: PokemonListItem[]
  next: string | null
  previous: string | null
}

export async function getPokemonDetails(nameOrId: string) {
  const response = await api.get(`pokemon/${nameOrId}`)
  return response.data
}

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`)
  return response.data
}

export function getPokemonIdFromUrl(url: string): string {
  const parts = url.split('/')
  return parts[parts.length - 2]
}

export function formatPokemonNumber(id: string | number): string {
  return `#${String(id).padStart(4, '0')}`
}