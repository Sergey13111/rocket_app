import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {
	Container,
	Card,
	CardMedia,
	CardActionArea,
	Pagination,
	Stack,
	Box,
	CircularProgress,
} from '@mui/material'
import { getDragons } from '../../store/dragonsSlice'
import { useState } from 'react'

const Dragons = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const { dragons, isLoading } = useSelector((state) => state.dragons)

	const handleChange = (_, NumPage) => {
		setPage(NumPage)
	}

	useEffect(() => {
		dispatch(getDragons(page))
	}, [dispatch, page])

	const handleDetail = (id) => () => {
		navigate(`/v4/dragons/${id}`)
	}

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<>
			<Container
				maxWidth='md'
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{dragons &&
					dragons.docs.map(({ id, flickr_images }) => (
						<Card
							key={id}
							sx={{ maxWidth: 800, mb: 5 }}>
							<CardActionArea>
								<CardMedia
									component='img'
									image={flickr_images[0]}
									alt='Flickr images'
									onClick={handleDetail(id)}
								/>
							</CardActionArea>
						</Card>
					))}

				<Stack>
					<Pagination
						shape='rounded'
						count={dragons?.totalPages}
						page={page}
						onChange={handleChange}
					/>
				</Stack>
			</Container>

			<Outlet />
		</>
	)
}

export default Dragons
