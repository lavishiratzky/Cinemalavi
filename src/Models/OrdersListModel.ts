export type Root = OrdersListModel[]

export interface OrdersListModel {
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