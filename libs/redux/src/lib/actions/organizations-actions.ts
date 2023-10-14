import { IOrganization } from "@console/interfaces";
import { createAction } from "@reduxjs/toolkit";

export const updateOrganizationsState = createAction<IOrganization[]>('organizations/update-organizations');