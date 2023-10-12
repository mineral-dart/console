import {useQuery} from "react-query";
import {useApiClient} from "@console/api-client";
import {OrganizationsResponse} from "@console/interfaces";
import {useAuth} from "../hooks/use-auth";
import {ReactNode, useEffect} from "react";
import {updateUserState} from "@console/redux";
import {useDispatch} from "react-redux";

interface Props {
  children: ReactNode
}

export default function Default ({ children }: Props) {
  const dispatch = useDispatch()
  const apiClient = useApiClient()
  const { data: organizations } = useQuery('organizations', async () => {
    const resp = await apiClient.get<OrganizationsResponse>('/organizations').build()
    return resp.data
  })

  const { useMe } = useAuth()
  const { data: user } = useMe()

  useEffect(() => {
    if (user) {
      dispatch(updateUserState(user))
    }
  }, [user])

  return (
    <div>
      { children }
    </div>
  )
}