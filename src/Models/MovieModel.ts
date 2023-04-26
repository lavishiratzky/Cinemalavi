
export type Root = MovieModel[]

export interface MovieModel {
  id: number
  name: string
  director: string
  genre: string
  length_minutes: number
  description: string
  image: string
}
