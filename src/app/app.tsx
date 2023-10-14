import { useQuery } from "react-query"
import Router from "./router"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { updateNavigationState, updateUserState } from "@console/redux"
import { INavigation, INavigationSettings, OrganizationsResponse } from "@console/interfaces"
import { ClockIcon, Cog6ToothIcon, CreditCardIcon, HomeIcon, UsersIcon } from "@heroicons/react/20/solid"
import { useLocation } from "react-router"
import { useAuth } from "./hooks/use-auth"
import { useApiClient } from "@console/api-client"

export default function App() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()



  const navigation: INavigation[] = [
    { label: 'Accueil', href: '/', icon: HomeIcon as never},
    { label: 'Audit Log', href: '/audit-logs', icon: ClockIcon as never}
  ]

  const settingsNavigation: INavigationSettings[] = [
    { label: 'General', icon: Cog6ToothIcon as never, href: '/settings/general', children: [], open: false},
		{ label: 'Team', icon: UsersIcon as never, href: '#', children: [
			{ label: 'Members', href: '/settings/members'},
			{ label: 'Roles & Permissions', href: '/settings/roles'}
		], open: false},
		{ label: 'Billing & Plans', icon: CreditCardIcon as never, href: '#', children: [
			{ label: 'Summary', href: '/settings/billing-summary'},
			{ label: 'Billing details', href: '/settings/billing-detail'}
		], open: false}
  ]

  useEffect(() => {
    dispatch(updateNavigationState({
      navigation,
      settingsNavigation
    }))
  }, [])


  useEffect(() => {
    if (pathname.split('/').includes('logs')) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  
  return (
    <div>
      <Router />
    </div>
  )
}
