import {createAction} from "@reduxjs/toolkit";
import {INavigation} from "@console/interfaces";

export const updateNavigationState = createAction<INavigation[]>('navigation/update-state')