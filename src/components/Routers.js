import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { DragonDetails } from '../pages/dragon-details'
import { Dragons } from '../pages/dragons'
import { Login } from '../pages/login'
import { SignUp } from '../pages/signUp'
import { Chosen } from '../pages/chosen'
import { Profile } from '../pages/profile'
import { NotFound } from '../pages/notFound'

const Routers = () => {
	return (
		<Routes>
			<Route
				path='SignUp'
				element={<SignUp />}
			/>
			<Route
				path='Login'
				element={<Login />}
			/>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='dragons'
				element={<Dragons />}
			/>
			<Route
				path='/v4/dragons/:id'
				element={<DragonDetails />}
			/>
			<Route
				path='profile'
				element={<Profile />}
			/>
			<Route
				path='dragons/chosen'
				element={<Chosen />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	)
}

export default Routers
