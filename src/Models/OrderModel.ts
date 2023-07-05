
export type Root = OrderModel[]

export interface OrderModel {
  orderId: number
  userId: number
  movieId: number
  movieName: string
  tickets: number
  userFirstName: string
  userLastName: string
  email: string
  movieDate: string
  movie?: any
  user?: any
}