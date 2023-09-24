import { Cog6ToothIcon, CreditCardIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import { INavigation, INavigationSettings } from "@console/interfaces";
import { NavLink, useLocation } from "react-router-dom";
import { ReactElement, classNames } from "@console/utils";
import { useState, ReactNode, useEffect } from "react";
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Disclosure } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateSettingsNavigationState } from "@console/redux";

interface Props {
    children: ReactNode
}
export default function SettingsLayout ({ children }: Props) {
	return (
		<div className="flex min-h-screen">
			<div className="w-72 border-r min-h-screen p-9">
					<div>
						<span className="px-3 text-[11px] text-gray-700 uppercase">Organisation</span>
					</div>

					<div className="mt-4">
						<NavigationStories />
					</div>
			</div>

			<div className="w-full">
				{ children }
			</div>
		</div>
	)
}


function NavigationStories () {
	const dispatch = useDispatch()
	const navigation = useSelector((root: RootState) => root.navigation)

	// const navigation: INavigationSettings[] = [
	// 	{ label: 'General', icon: Cog6ToothIcon as never, href: '/settings/general', children: []},
	// 	{ label: 'Team', icon: UsersIcon as never, href: '#', children: [
	// 		{ label: 'Members', href: '/settings/members'},
	// 		{ label: 'Roles & Permissions', href: '/settings/roles'}
	// 	]},
	// 	{ label: 'Billing & Plans', icon: CreditCardIcon as never, href: '#', children: [
	// 		{ label: 'Summary', href: '/settings/billing-summary'},
	// 		{ label: 'Billing details', href: '/settings/billing-detail'}
	// 	]}
	// ]

	// useEffect(() => {

	// })

	return (
		<div>
			<>
				{ navigation.settingsNavigation.map((item) => {
					if (item.children.length) {
						return <DropDownItem item={item} />
					}

					return <Item item={item} />
				})}
			</>
			
		</div>
	)
}

interface ItemProps {
	item: INavigationSettings
}

function DropDownItem ({ item }: ItemProps) {
	const location = useLocation()
	const dispatch = useDispatch()
	const navigationState = useSelector((root: RootState) => root.navigation)

	const [isOpen, setIsOpen] = useState<boolean>(() => {
		if (location.pathname) {
			const li = item.children.map((i) => i.href)

			if (li.includes(location.pathname)) return true
			return false
		}
		return false
	})

	function handleClick (open: boolean) {
		const li = navigationState.settingsNavigation.map((i) => {
			if (i.label === item.label) {
				return {
					...i,
					open
				}
			}
			return i
		})

		dispatch(updateSettingsNavigationState(li))



		
	}
	
	return (
		<div className="w-full">
			<Disclosure defaultOpen={item.open}>
				{({ open }) => (
					<>
						<Disclosure.Button className="w-full" onClick={() => handleClick(!open)}>
							<div className="flex items-center px-3 py-2 justify-between w-full text-gray-500">
								<div className="flex items-center gap-4">
									<ReactElement 
										tag={item.icon}
										className={classNames('w-4')}
									/>
									<span className="text-sm">{ item.label }</span>
								</div>

								<ChevronUpIcon
									className={`${
										open ? 'rotate-180' : ''
									} h-5 w-5 transform duration-200`}
								/>
							</div>
						
						</Disclosure.Button>
						<Disclosure.Panel>
							<div className="flex flex-col">
								{ item.children?.map((subitem) => (
									<NavLink
										to={subitem.href}
									>
										{({ isActive }) => {
											
											
											return (
												<div className={classNames(
													'px-10 text-sm text-gray-600 rounded-[4px] py-2',
													isActive ? 'bg-indigo-50 text-indigo-500' : ''
												)}>
													<span>{ subitem.label }</span>
												</div>
											)
										}}
									</NavLink>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	)
}

function Item ({ item }: ItemProps) {
	const [clicked, setClicked] = useState<boolean>(false)

	function onClick () {
		setClicked(!clicked)
	}

	return (
		<div>
			<NavLink
				to={item.href}
			>
				{({ isActive }) => (
					
					<div className={classNames(
						isActive ? 'bg-indigo-50' : '',
						'relative flex items-center justify-between text-gray-600 px-3 py-2  rounded-[4px]'
					)}>
						<div className="flex items-center gap-4">
							<ReactElement 
								tag={item.icon}
								className={classNames('w-4', isActive ? 'text-indigo-500 dark:text-gray-100' : '')}
							/>
							<span className={classNames(
								'text-sm',
								isActive ? 'text-indigo-500' : ''
							)}>{ item.label }</span>
						</div>
					
					</div>
				)}
			</NavLink>
		</div>
	)
}