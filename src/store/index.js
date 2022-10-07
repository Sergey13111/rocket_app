import { configureStore } from '@reduxjs/toolkit'
import dragonsSlice from './dragonsSlice'
import dragonDetailsSlice from './dragonDetailsSlice'
import { saveState, loadState } from '../helpers/localStorage'
import { authReducer } from './authSlice'
import { chosenReducer } from './chosenSlice'

const persistedState = loadState()
console.log(persistedState)

export const store = configureStore({
	reducer: {
		dragons: dragonsSlice,
		dragonDetails: dragonDetailsSlice,
		auth: authReducer,
		chosen: chosenReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

store.subscribe(() => {
	saveState({ dragons: store.getState().dragonDetails })
})

export default store
