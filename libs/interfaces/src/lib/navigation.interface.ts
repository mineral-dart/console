export interface INavigation {
  label: string
  href: string
  icon: (...props: unknown[]) => JSX.Element
  children?: INavigation[]
}

export interface INavigationSettings {
  label: string
  href: string
  open: boolean
  icon: (...props: unknown[]) => JSX.Element
  children: {
    label: string, href: string
  }[]
}

export interface NavigationState {
  navigation: INavigation[]
  settingsNavigation: INavigationSettings[]
}

