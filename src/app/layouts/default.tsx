import {ReactNode} from "react";
import {useLocation} from "react-router";
import SideBar from "../components/side-bar";
import {classNames} from "@console/utils";

interface Props {
  children: ReactNode

  layout: {
    label: string
    noBackground?: boolean
    location?: string[]
    navigation: any[]
  }
}

export default function Layout ({ children, layout }: Props) {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col lg:flex-row lg:flex-shrink-0 min-h-screen dark:bg-[#151B2B] bg-[#E2E9F3]">
      <SideBar />
      <div className="flex flex-col w-full max-h-screen">
        <div className={classNames(
          'mx-auto w-full h-full flex',
          pathname.split('/').includes('logs') ? '' : 'p-2'
        )}>
          { layout.noBackground
            ? <div className="w-full">{ children }</div>
            :
            <div className="bg-white w-full mn-h-full rounded-md shadow-md overflow-hidden">
              <div className="w-full">
                { children }
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  )
}