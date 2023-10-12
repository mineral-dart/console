import {createAction} from "@reduxjs/toolkit";
import {IUser} from "@console/interfaces";

type State = {
  auth: {
    user: IUser
  }
}

export const updateUserState = createAction<IUser>('auth/update-user')
