import { signInWithPopup } from 'firebase/auth'
import { Button } from '@mui/material'
import { brown } from '@mui/material/colors'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GoogleIcon from '@mui/icons-material/Google'
import { createUser } from '../../store/authSlice'
import { auth, provider } from '../../firebase'

const AuthGoogle = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const handleAuthGoogle = () => {
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				dispatch(createUser(user))
				localStorage.setItem('token', JSON.stringify(user.accessToken))
				navigate('/dragons')
			})
			.catch((error) => console.log(error))
	}

	return (
		<>
			<Button
				variant='outlined'
				sx={{ borderRadius: 50, p: 2, color: brown[500], borderColor: brown[500] }}
				onClick={handleAuthGoogle}>
				<GoogleIcon />
			</Button>
			<Outlet />
		</>
	)
}

export default AuthGoogle
