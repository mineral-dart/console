import {useSelector} from "react-redux";
import {RootState} from "@console/redux";
import {Avatar, Menu, MenuAlign, MenuData, MenuDirection} from "@console/ui";

export default function MenuAccount () {
  const auth = useSelector((root: RootState) => root.auth)

  const menus: MenuData = [
    {
      items: [
        {
          itemContentCustom: (
            <div className="w-full flex items-center justify-between">
              <div className="flex">
                <Avatar
                  username={auth.user?.username || ''}
                  className="mr-3"
                  size={40}
                  url={auth.user?.avatar_url}
                />

                <div>
                  <p className="text-neutral-400 dark:text-neutral-100 text-sm font-medium">
                    { auth.user?.username }
                  </p>
                  <span className="text-neutral-350 text-xs">{auth.user?.email}</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ]
  return (
    <Menu
      className=" mx-auto items-center flex"
      trigger={
        <div className="cursor-pointer">
          <Avatar
            size={40}
            username={auth.user?.username || ''}
            url={auth.user?.avatar_url}
            logoUrl={'http://localhost:3000/logo.png'}
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