import {IUser} from "./user.interface";

export * from './user.interface'

export interface AuthenticationState {
  user: IUser | null
}