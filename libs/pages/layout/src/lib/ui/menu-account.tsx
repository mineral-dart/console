import { IconAwesomeEnum } from "@console/enums";
import { IOrganization } from "@console/interfaces";
import { LOGOUT_URL, ONBOARDING_PROJECT_URL, ONBOARDING_URL, ORGANIZATION_URL, USER_URL } from "@console/routes";
import { Avatar, Icon, Menu, MenuAlign, MenuData, MenuDirection } from "@console/ui";
import { useNavigate } from "react-router";

export interface MenuAccountProps {
  organizations: IOrganization[]
  currentOrganization?: IOrganization
  user: {
    username?: string
    email?: string
    picture?: string
  }
}

export function MenuAccount ({ organizations, currentOrganization, user }: MenuAccountProps) {
  const navigate = useNavigate()

  const blockOrganization = (organization: IOrganization) => (
    <div data-testid={`content-${organization.id}`} className="flex items-center">
      <Icon
        name={IconAwesomeEnum.CHECK}
        className={`mr-4 ${currentOrganization?.id === organization.id ? 'text-green-500' : 'opacity-0'}`}
      />
      <span className="w-8 h-8 rounded-sm flex items-center justify-center mr-3">
        {organization.logo_url ? (
          <img className="p-1" src={organization.logo_url} alt="Organization logo" />
        ) : (
          <span className="w-full h-full font-medium text-xs text-neutral-350 bg-neutral-200 flex items-center justify-center uppercase rounded">
            {organization.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="text-neutral-400 dark:text-neutral-100 text-sm font-medium">{organization.name}</span>
    </div>
  )

  const menus: MenuData = [
    {
      title: 'Organizations',
      sortAlphabetically: true,
      button: {
        label: <Icon name={IconAwesomeEnum.CIRCLE_PLUS} className="text-brand-500 link !text-base mr-3" />,
        onClick: () => navigate(ONBOARDING_URL + ONBOARDING_PROJECT_URL),
      },
      items: organizations.map((organization: IOrganization) => ({
        name: organization.name,
        itemContentCustom: blockOrganization(organization),
        containerClassName: '!h-14',
        onClick: () => navigate(ORGANIZATION_URL(organization.id)),
      }))
    },
    {
      items: [
        {
          itemContentCustom: (
            <div className="w-full flex items-center justify-between">
              <div className="flex">
                <Avatar 
                   className="mr-3"
                   size={40}
                   url={user?.picture}
                   username={user.username || ''}
                   noTooltip
                />
                <div>
                  <p className="text-neutral-400 dark:text-neutral-100 text-sm font-medium">
                    { user?.username}
                  </p>
                  <span className="text-neutral-350">{ user.email }</span>
                </div>
              </div>

            </div>
          ),
          containerClassName: '!h-14',
          onClick: () => navigate(USER_URL),
        }
      ]
    },
    {
      items: [
        {
          itemContentCustom: (
            <div className="text-neutral-400 dark:text-neutral-100 text-ssm font-medium">
              <Icon name={IconAwesomeEnum.ARROW_RIGHT_FROM_BRACKET} className="text-brand-500 mr-3" />
              Logout
            </div>
          ),
          onClick: () => navigate(LOGOUT_URL),
        }
      ]
    }
  ]


  return (
    <Menu
      trigger={
        <div className="cursor-pointer select-none">
          <Avatar
            size={40}
            username={user?.username || ''}
            url={user?.picture}
            logoUrl={currentOrganization?.logo_url || undefined}
            logoText={!currentOrganization?.logo_url ? currentOrganization?.name.charAt(0) : undefined}
            noTooltip
          />
        </div>
      }
      direction={MenuDirection.RIGHT}
      arrowAlign={MenuAlign.END}
      menus={menus}
    />
  )
}