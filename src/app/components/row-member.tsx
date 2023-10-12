import { TableFilterProps, TableRowFilter, type MenuData, Menu, Icon, MenuItemProps, ButtonIconAction } from '@console/ui'
import {classNames, upperCaseFirstLetter} from "@console/utils"
import {IconAwesomeEnum, MemberRoleEnum} from "@console/enums";


export interface RowMemberProps {
	member: any
	loading: boolean
	columnsWidth: string
	filter: TableFilterProps[]
}

export const RolesIcons: { [key: string]: string } = {
	ADMIN: IconAwesomeEnum.USER_CROWN,
	BILLING: IconAwesomeEnum.WALLET,
	DEVOPS: IconAwesomeEnum.WHEEL,
	VIEWER: IconAwesomeEnum.EYE
}

const availablesRoles = [
	{ id: "1", name: "admin" },
	{ id: "2", name: "billing" },
	{ id: "3", name: "devops" },
	{ id: "4", name: "viewer" },
]

export function RowMember ({ member, loading, columnsWidth, filter }: RowMemberProps) {


	const isOwner = member.role_name?.toUpperCase() === MemberRoleEnum.OWNER

	const menuItem = (role: { id: string, name: string}, customRole: boolean) => ({
		name: upperCaseFirstLetter(role.name) || '',
		contentLeft: (
			<Icon
				name={customRole ? IconAwesomeEnum.USER : RolesIcons[role.name?.toUpperCase() || '']}
				className='text-brand-500'
			/>
		),
		onClick: () => console.log(role)
	})

	const itemsBasicRoles = availablesRoles
		? (availablesRoles
				.map((role) => Object.values(MemberRoleEnum).includes(role.name?.toUpperCase() as MemberRoleEnum) && menuItem(role, false))
				.filter(Boolean) as MenuItemProps[]
			)
		: []

	const itemsCustomRoles = availablesRoles
			? (availablesRoles
					.map((role) => !Object.values(MemberRoleEnum).includes(role.name.toUpperCase() as MemberRoleEnum) && menuItem(role, true))
					.filter(Boolean) as MenuItemProps[]
				)
			: []
	
	const menus: MenuData = [
		{
			items: itemsBasicRoles
		},
		{
			items: itemsCustomRoles
		},
		{
			items: [
				{
					name: 'Create new role',
					onClick: () => console.log('CREATE ROLE'),
					contentLeft: <Icon name={IconAwesomeEnum.CIRCLE_PLUS} className='text-brand-500' />
				}
			]
		}
	]

	const buttonActionMember = [
		{
			iconLeft: <Icon name={IconAwesomeEnum.ELLIPSIS_V} />,
			menus: [
				{
					items: isOwner
            ? [
                {
                  name: 'Transfer ownership',
                  onClick: () => console.log(""),
                  contentLeft: <Icon name={IconAwesomeEnum.RIGHT_LEFT} className="text-sm text-brand-500" />,
                },
              ]
            : [],
				},
				{
					items: [
						{
							name: "Delete member",
							onClick: () => console.log('DELETE MEMBER'),
							contentLeft: <Icon name={IconAwesomeEnum.BAN} className="text-sm text-red-600" />,
							containerClassName: 'text-red-600'
						}
					]
				}
			]
		}
	]
	const input = (role?: string) => (
		<div
			data-testid="input"
			className={classNames(
				'flex relative px-3 py-2 border rounded select-none w-44',
				role?.toUpperCase() === MemberRoleEnum.OWNER || !member.last_activity_at
					? 'bg-neutral-100 border-neutral-250 text-neutral-350'
					: 'border-neutral-300 text-neutral-400 cursor-pointer'
			)}
		>
			<span className="text-sm block max-w-[130px]">{ upperCaseFirstLetter(role) }</span>
		</div>
	)
	
	return (
		<TableRowFilter data={member} filter={filter}>
			<div
				className="grid grid-cols-4 border-b border-neutral-200 last:border-0"
				style={{ gridTemplateColumns: columnsWidth }}						
			>
				<div className="flex items-center justify-between pr-4 border-r border-neutral-200 h-full">
					<div>
						pdp
					</div>
					<div className="flex items-center px-4 py-3">
						<div className="ml-3 text-xs truncate">
							<p className="text-neutral-400 font-medium truncate">{ member.name }</p>
							<span className="text-neutral-400 truncate">{ member.email }</span>
						</div>
					</div>

					{ !isOwner &&
						<div>
							<ButtonIconAction actions={buttonActionMember} />
						</div>
					
					}
				</div>

				<div data-testid="row-member-menu" className="flex items-center px-4 w-[500px]">
						{ !isOwner && member.last_activity_at ? (
							<Menu menus={menus} trigger={input(member.role_name)} />
							)
							: (
								input(member.role_name)
							)
						}
				</div>
				
				<div className="flex items-center px-4 text-neutral-400 text-xs font-medium">
					<span>{ member.last_activity_at}</span>
				</div>
			</div>
		</TableRowFilter>
	)
}