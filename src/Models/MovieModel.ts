
export type Root = MovieModel[]

export interface MovieModel {
  movieId: number
  name: string
  director: string
  genre: string
  length_Minutes?: number
  description?: string
  image?: string
  orders: any[]
}


