// export type Root = OrderModel[]

// export interface OrderModel {
//   OrderID: number
//   OrderDate: string
//   MovieID: number
//   MovieName: string
//   tickets: number
//   UserID: number
//   UserFirstName: string
//   UserFamilyName: string
//   email: string
// }
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