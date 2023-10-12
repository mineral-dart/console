import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@console/redux";
import {Link, NavLink} from "react-router-dom";
import {INavigation} from "@console/interfaces";
import {classNames, ReactElement} from "@console/utils";
import {Icon} from '@console/ui'
import {IconEnum} from "@console/enums";
import { Cog6ToothIcon, Cog8ToothIcon } from "@heroicons/react/20/solid";
import MenuAccount from "./menu-account";

export default function SideBar () {
  const dispatch = useDispatch()

  const auth = useSelector((root: RootState) => root.auth)
  const [open, setOpen] = useState<boolean>(false)
  const navigationState = useSelector((state: RootState) => state.navigation)

  const subNavigation: INavigation[] = [
    { label: 'Settings', href: '/settings/general', icon: Cog6ToothIcon as never}
  ]

  

  return (
    <div>
      {/** MOBILE NAV DROPDOWN **/}
      <div></div>

      <div className="hidden lg:flex lg:sticky h-screen top-0">
        <div className="flex flex-col justify-between h-full bg-white dark:bg-[#151B2B]">
          <Link to="/" className="inline-flex border-r border-b border-[#E2E9F3] dark:border-[#2A3041]">
            <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
              {/** LOGO **/}
              <div className="flex h-16 w-16 items-center justify-center focus:outline-none">
                <Icon name={IconEnum.CONSOLE} className="w-9 p-4" />
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-between border-r border-[#E2E9F3] dark:border-[#2A3041] h-full py-8">
            { navigationState.navigation.length && 
            <div className="flex flex-col gap-4">
              { navigationState.navigation.map((link) =>  <Item key={link.label} item={link} />)}
            </div>
            }

            <div>
              <div className="flex flex-col gap-4 pb-8">
                { subNavigation.map((item, index) => (
                  <Item item={item} key={index} />
                ))}
                
              </div>
              <div className=" flex border-t pt-4 mx-auto">
                { auth.user &&
                    <MenuAccount />
                }




              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

interface ItemProps {
  item: INavigation
}
function Item ({ item }: ItemProps) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) => classNames('flex text-gray-500 dark:text-gray-400 rounded-md p-3 mx-auto dark:hover:text-gray-100 hover:bg-[#E2E9F3] dark:hover:bg-indigo-500 hover:text-[#5B50D6] ease-in-out duration-200', isActive ? 'bg-[#E2E9F3] dark:bg-indigo-500' : '')}
    >
      {({ isActive }) => (
        <ReactElement
          tag={item.icon}
          className={classNames('w-5', isActive ? 'text-[#5B50D6] dark:text-gray-100' : '')}
        />
      )}
    </NavLink>
  )
}