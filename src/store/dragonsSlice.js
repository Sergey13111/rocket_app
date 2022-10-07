import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dragonsService from './services/dragonsService'

export const getDragons = createAsyncThunk('DRAGONS', async (page, thunkAPI) => {
	try {
		return await dragonsService.getDragons(page)
	} catch (error) {
		return thunkAPI.rejectWithValue(error.dragons)
	}
})

const dragonsSlice = createSlice({
	name: 'dragons',
	initialState: {
		dragons: null,
		isError: false,
		isLoading: false,
		message: '',
	},
	extraReducers: (builder) => {
		builder.addCase(getDragons.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getDragons.fulfilled, (state, action) => {
			state.isLoading = false
			state.dragons = action.payload
		})
		builder.addCase(getDragons.rejected, (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload.message
			state.dragons = null
		})
	},
})

export default dragonsSlice.reducer
