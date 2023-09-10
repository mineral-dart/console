import {ReactNode} from 'react'

export interface IRouter {
  uid: string
  href: string
  component: ReactNode
}
