import { createAction } from "@reduxjs/toolkit"
import { INavigation, INavigationSettings } from "@console/interfaces"

type State = {
    navigation: INavigation[],
    settingsNavigation: INavigationSettings[]
}
export const updateNavigationState = createAction<State>('navigation/update-navigation-state')
export const updateSettingsNavigationState = createAction<INavigationSettings[]>('navigation/update-settings-navigation-state')