export interface INavigation {
  label: string
  href: string
  icon: (...props: unknown[]) => JSX.Element
  children?: INavigation
}

export interface NavigationState {
  navigation: INavigation[]
}