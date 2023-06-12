
// export type Root = MovieModel[]

// export interface MovieModel {
//   id: number
//   name: string
//   director: string
//   genre: string
//   length_minutes: number
//   description: string
//   image: string
// }
export type Root = MovieModel[]

export interface MovieModel {
  movieId: number
  name: string
  director: string
  genre: string
  lengthMinutes?: number
  description?: string
  image?: string
  orders: any[]
}


