import { useState } from 'react'
import { TextField, Container, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { loginUser } from '../../store/authSlice'
import { AuthGoogle } from '../../components/authGoogle'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		})
		.required()

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleLogin = (values) => {
		setIsLoading(true)
		signInWithEmailAndPassword(auth, values.email, values.password)
			.then(({ user }) => {
				setIsLoading(false)
				user.displayName = values.nickName
				dispatch(loginUser(user))
				updateProfile(user, {
					displayName: values.nickName,
				})
				localStorage.setItem('token', JSON.stringify(user.accessToken))
				navigate('/dragons')
			})
			.catch((error) => {
				console.log(`bad request ${error}`)
				alert('Failed to login!')
				setIsLoading(false)
			})
	}

	return (
		<>
			<Container maxWidth='xs'>
				{isLoading && (
					<Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
						<CircularProgress />
					</Box>
				)}
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<h1>LogIn</h1>

					<form onSubmit={handleSubmit(handleLogin)}>
						<Box
							p={3}
							sx={{ textAlign: 'center' }}>
							<Box my={2}>
								<Controller
									name='email'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='email'
											error={errors.email}
											helperText={errors.email?.message}
										/>
									)}
								/>
							</Box>

							<Box my={2}>
								<Controller
									name='password'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='password'
											error={errors.password}
											helperText={errors.password?.message}
										/>
									)}
								/>
							</Box>

							<Button
								variant='contained'
								type='submit'>
								LogIn
							</Button>
						</Box>
						<Box sx={{ textAlign: 'center' }}>
							<Typography variant='h6'>or using google account</Typography>
							<AuthGoogle />
						</Box>
					</form>
				</Box>
			</Container>

			<Outlet />
		</>
	)
}

export default Login
