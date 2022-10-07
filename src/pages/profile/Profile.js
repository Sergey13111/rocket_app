import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Typography,
	Container,
	Button,
	Dialog,
	DialogTitle,
	Box,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const Profile = () => {
	const { user } = useSelector((state) => state.auth)
	const [[profile], setProfile] = useState([])
	const [isDialogOpen, setDialogOpen] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid
				const queryDoc = query(collection(db, 'users'), where('userId', '==', uid))
				getDocs(queryDoc).then((res) => setProfile(res.docs.map((user) => user.data())))
			} else {
				console.log('')
			}
		})
	}, [user.uid])

	const handleEditing = (id) => {
		setDialogOpen(true)
	}
	const handleDialogClose = () => {
		setDialogOpen(false)
	}

	return (
		profile && (
			<>
				<Container maxWidth='sm'>
					<Typography
						sx={{ mt: 2 }}
						variant='h3'
						component='h1'
						align='center'>
						Profile
					</Typography>
					<TableContainer
						sx={{ mt: 3 }}
						component={Paper}>
						<Table>
							<TableBody>
								<TableRow
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell sx={{ fontSize: 24, fontWeight: 600 }}>Nick name:</TableCell>
									<TableCell
										align='right'
										sx={{ fontSize: 16 }}>
										{profile.name}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
										fontSize: 18,
										fontWeight: 600,
									}}>
									<TableCell sx={{ fontSize: 24, fontWeight: 600 }}>Email:</TableCell>
									<TableCell
										align='right'
										sx={{ fontSize: 16 }}>
										{profile.email}
									</TableCell>
								</TableRow>
								<TableRow
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell sx={{ fontSize: 24, fontWeight: 600 }}>Phone:</TableCell>
									<TableCell
										align='right'
										sx={{ fontSize: 16 }}>
										{profile.phone}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ textAlign: 'center', mt: 4 }}>
						<Button
							variant='contained'
							endIcon={<EditIcon />}
							onClick={handleEditing}>
							Editing
						</Button>
					</Box>
					<Dialog
						open={isDialogOpen}
						onClose={handleDialogClose}>
						<DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>Editing</DialogTitle>
						{/* <Edit id={selectedId} /> */}
					</Dialog>
				</Container>
			</>
		)
	)
}

export default Profile
