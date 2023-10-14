import {useQuery} from "react-query";
import {useApiClient} from "@console/api-client";
import {OrganizationsResponse} from "@console/interfaces";
import {useAuth} from "../hooks/use-auth";
import {ReactNode, useEffect} from "react";
import {updateUserState} from "@console/redux";
import {useDispatch} from "react-redux";
import { useLocation, useNavigate } from "react-router";

interface Props {
  children: ReactNode
}

export default function Default ({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const apiClient = useApiClient()
  const { data: organizations } = useQuery('organizations', async () => {
    const resp = await apiClient.get<OrganizationsResponse>('/organizations').build()
    return resp.data
  })

  useEffect(() => {
    if (location.pathname === '/') {

   
      if (organizations && organizations.data.length > 0) {
        console.log(organizations.data[0])
        navigate(`/organization/${organizations.data[0].id}/settings/general`)
      }
    }

  }, [organizations])

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