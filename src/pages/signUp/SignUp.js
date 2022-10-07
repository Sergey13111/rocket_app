import { useState } from 'react'
import { TextField, Container, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import 'yup-phone-lite'
import * as yup from 'yup'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { createUser } from '../../store/authSlice'
import { AuthGoogle } from '../../components/authGoogle'

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)

	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
			nickName: yup.string().required(),
			phoneNumber: yup.string().phone().required(),
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
			nickName: '',
			phoneNumber: '',
		},
	})

	const handleSignUp = (values) => {
		setIsLoading(true)

		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(({ user }) => {
				user.displayName = values.nickName
				user.phoneNumber = values.phoneNumber
				setIsLoading(false)
				dispatch(createUser(user))

				addDoc(collection(db, 'users'), {
					name: values.nickName,
					email: values.email,
					phone: values.phoneNumber,
					userId: user.uid,
				})
					.then(() => {
						console.log('success')
					})
					.catch((error) => {
						console.log(error)
					})
				localStorage.setItem('token', JSON.stringify(user.accessToken))
				navigate('/dragons')
			})
			.catch((error) => {
				const errorMessage = error.message
				alert(errorMessage)
				console.log(`bad request ${error}`)
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
					<h1>registrtation</h1>

					<form onSubmit={handleSubmit(handleSignUp)}>
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
											helperText={errors.pasword?.message}
										/>
									)}
								/>
							</Box>
							<Box my={2}>
								<Controller
									name='nickName'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Nickname'
											error={errors.nickName}
											helperText={errors.nickName?.message}
										/>
									)}
								/>
							</Box>

							<Box my={2}>
								<Controller
									name='phoneNumber'
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Phone number'
											error={errors.phoneNumber}
											helperText={errors.phoneNumber?.message}
										/>
									)}
								/>
							</Box>

							<Button
								variant='contained'
								type='submit'>
								Registration
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

export default SignUp
