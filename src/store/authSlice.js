import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		createUser: (state, action) => {
			state.user = action.payload
		},
		loginUser: (state, action) => {
			state.user = action.payload
		},
		logout: (state) => {
			state.user = null
			state.isAuth = false
		},
	},
})

export const selectIsAuth = (state) => Boolean(state.auth.user)
// export const selectEmail = (state) => state.auth.email
// export const selectUseName = (state) => state.auth.useName
// export const selectUserId = (state) => state.auth.userId

export const authReducer = authSlice.reducer
export const { createUser, loginUser, logout } = authSlice.actions

export default authSlice.reducer
