import {QueryClient, QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools";
import Router from "./router";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {updateNavigationState} from "@console/redux";
import {INavigation} from "@console/interfaces";
import {HomeIcon} from "@heroicons/react/20/solid";

const queryClient = new QueryClient()

export default function App() {
  const dispatch = useDispatch()
  const navigation: INavigation[] = [
    { label: 'Accueil', href: '/', icon: HomeIcon as never}
  ]

  useEffect(() => {
    dispatch(updateNavigationState(navigation))
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <Router />
      </div>
    </QueryClientProvider>
  )
}