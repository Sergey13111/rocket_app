import { createSlice } from '@reduxjs/toolkit'

const chosenSlice = createSlice({
	name: 'chosen',
	initialState: {
		chosenItems: [],
	},
	reducers: {
		addDragon(state, action) {
			state.chosenItems.push(action.payload)
		},
		removeChosenItems(state, action) {
			state.chosenItems = state.chosenItems.filter((dragon) => dragon.id !== action.payload)
		},
		clearChosenItems(state) {
			state.chosenItems = []
		},
	},
})

export const { addDragon, removeChosenItems, cleaclearChosenItemsrItams } = chosenSlice.actions

export const chosenReducer = chosenSlice.reducer

export default chosenSlice.reducer
