import { Cog6ToothIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import Layout from "../../layouts/standard";
import { INavigation, INavigationSettings } from "@console/interfaces";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ReactElement, classNames } from "@console/utils";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Disclosure } from '@headlessui/react'
import SettingsLayout from "../../layouts/settings";


export default function SettingHome () {

	const location = useLocation()
  const { organizationId = '' } = useParams()
  
  

  useEffect(() => {
    console.log(location);
    console.log(organizationId);
  }, [location, organizationId])

	
  return (
		<Layout layout={{
			label: 'Settings',
			navigation: []
		}}>
			<SettingsLayout>
				<div className="p-8  w-full">
					<h5 className="h5">General</h5>

					<div className="border w-full flex rounded-sm border-neutral-200 flex-col divide-y bg-neutral-100">
						<div className="px-4 py-2">
							<span className="text-sm text-neutral-4600">Organization profile</span>
						</div>
					

						<div className="px-4 py-3">
							PDP Organisation
						</div>

						<div className="px-4">
							daz
						</div>
					</div>
				</div>
			</SettingsLayout>
		</Layout>
	
	)
}
