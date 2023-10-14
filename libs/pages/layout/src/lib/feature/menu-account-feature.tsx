import { useParams } from "react-router";
import { MenuAccount } from "../ui/menu-account";
import { IOrganization } from "@console/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@console/redux";

export function MenuAccountFeature () {
  const { organizationId = '' } = useParams()
  //const auth = useSelector((state: RootState) => state.auth)


  //console.log(auth);
  

  const organizations: IOrganization[] = []

  return (
    <MenuAccount 
      organizations={organizations}
      currentOrganization={organizations.find((org) => org.id === organizationId)}
      user={{
        username: 'Nathael',
        email: 'pro.nathaelbonnal@gmail.com ',
        picture: '',
      }}
    />
  )
}