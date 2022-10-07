import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dragonsService from './services/dragonsService'

export const getDragonDetails = createAsyncThunk('DRAGONDETAILS', async (id, thunkAPI) => {
	try {
		return await dragonsService.getDragonDetails(id)
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response)
	}
})

const dragonDetailsSlice = createSlice({
	name: 'dragonDetails',
	initialState: {
		dragonDetails: null,
		items: [],
		isError: false,
		isLoading: false,
		message: '',
	},
	extraReducers: (builder) => {
		builder.addCase(getDragonDetails.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(getDragonDetails.fulfilled, (state, action) => {
			state.isLoading = false
			state.dragonDetails = action.payload
		})
		builder.addCase(getDragonDetails.rejected, (state, action) => {
			state.isLoading = false
			state.isError = true
			state.message = action.payload.message
			state.dragonDetails = null
		})
	},
})

export default dragonDetailsSlice.reducer
