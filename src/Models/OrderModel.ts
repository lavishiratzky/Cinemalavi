export type Root = OrderModel[]

export interface OrderModel {
  OrderID: number
  OrderDate: string
  MovieID: number
  MovieName: string
  tickets: number
  UserID: number
  UserFirstName: string
  UserFamilyName: string
  email: string
}