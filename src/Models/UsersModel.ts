export type Root = Root[]

export interface UsersModel {
  userId: number
  firstName: string
  lastName?: string
  email?: string
  passWord?: string
  confirm: string;
  orders: any[]
}