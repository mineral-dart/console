import { Cog6ToothIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import Layout from "../../../layouts/standard";
import { INavigation, INavigationSettings } from "@console/interfaces";
import { NavLink } from "react-router-dom";
import { ReactElement, classNames } from "@console/utils";
import {useEffect, useState} from "react";
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Disclosure } from '@headlessui/react'
import SettingsLayout from "../../../layouts/settings";
import {Button, Table, type TableFilterProps } from '@console/ui'
import { IconAwesomeEnum } from "@console/enums";
import {RowMember} from "../../../components/row-member";

const membersHead = [
	{
		title: 'Member',
		className: 'px-4 py-2 border-r border-neutral-200 h-full'
	},
	{
		title: 'Roles',
		filter: [
      {
        search: true,
        title: 'Filter by role',
        key: 'role_name',
      },
    ],
	},
	{
		title: 'Last activity',
		className: 'px-4',
		sort: {
			key: 'last_activity_at'
		}
	}
]

type Member = {
	id: string
	created_at: string
	updated_at: string
	last_activity_at: string
	name: string
	nickname: string
	profile_picture_url: string
	email: string
	role: string
	role_name: string
	role_id: string
	invitation_status: string
}

export default function SettingsMembers () {
	const [dataMembers, setDataMembers] = useState<Member[]>([])
	const columnsWidth = '35% 22% 21%'
	const [filterMembers, setFilterMembers] = useState<TableFilterProps[]>([])
	
	const members: Member[] = [
		{
			"id": "github|64804778",
			"created_at": "2022-07-09T21:42:52.349Z",
			"updated_at": "2023-09-18T18:29:39.751Z",
			"last_activity_at": "2023-09-18T18:29:39.751Z",
			"name": "Nathael Bonnal",
			"nickname": "NathaelB",
			"profile_picture_url": "https://avatars.githubusercontent.com/u/64804778?v=4",
			"email": "kirua48000@gmail.com",
			"role": "OWNER",
			"role_name": "Owner",
			"role_id": "11111111-1111-1111-1111-111111111111",
			"invitation_status": "ACCEPTED"
		},
		{
			"id": "github|64804778",
			"created_at": "2022-07-09T21:42:52.349Z",
			"updated_at": "2023-09-18T18:29:39.751Z",
			"last_activity_at": "2022-09-18T18:29:39.751Z",
			"name": "Baptiste Parmantier",
			"nickname": "Baptiste",
			"profile_picture_url": "https://avatars.githubusercontent.com/u/64804778?v=4",
			"email": "kirua48000@gmail.com",
			"role": "OWNER",
			"role_name": "Admin",
			"role_id": "11111111-1111-1111-1111-111111111111",
			"invitation_status": "ACCEPTED"
		}

	]

	useEffect(() => {
		setDataMembers(members)
	}, [])
	

	
  return (
		<Layout layout={{
			label: 'Settings - Members',
			navigation: []
		}}>
			<SettingsLayout>
				<div className="p-8">
					<div className="flex justify-between mb-12">
						<div className="w-2/3">
							<h1 className="h5">Manage your team</h1>
							<p className="text-xs text-neutral-400 pt-2">This sections allow you to manage the members of your organisation (add / remove) and as well assign a role to each of them. You can invite someone to join your organization via email.</p>
						</div>
						<div>
							<Button
								iconRight={IconAwesomeEnum.PLUS}
								iconRightClassName="h-4 w-4  bg-white text-indigo-500 rounded-full"
							>
								Add member
							</Button>
						</div>
					</div>
					
					<div>
						<Table
							className="border border-neutral-200 rounded"
							classNameHead="rounded-t"
							dataHead={membersHead}
							data={members}
							setFilter={setFilterMembers}
							filter={filterMembers}
							setDataSort={setDataMembers}
							columnsWidth={columnsWidth}
						>
							<div>
								{ dataMembers.map((member: Member) => (
									<RowMember
										key={member.id}
										filter={filterMembers}
										member={member}
										loading={false}
										columnsWidth={columnsWidth}
									/>
								))}
							</div>
						</Table>
					</div>

				</div>
			</SettingsLayout>
		</Layout>
	
	)
}
