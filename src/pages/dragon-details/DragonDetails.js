import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import {
	Container,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Link,
	Box,
	CircularProgress,
} from '@mui/material'
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { getDragonDetails } from '../../store/dragonDetailsSlice'
import { addDragon } from '../../store/chosenSlice'

const DragonDetails = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const { dragonDetails, isLoading } = useSelector((state) => state.dragonDetails)
	const items = useSelector((state) => state.chosen.chosenItems)
	const isItemInChosen = items.some((item) => item.id === dragonDetails.id)

	useEffect(() => {
		dispatch(getDragonDetails(id))
	}, [dispatch, id])

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
				<CircularProgress />
			</Box>
		)
	}
	const handleAddChosen = () => {
		dispatch(addDragon(dragonDetails))
	}
	return (
		dragonDetails && (
			<>
				<Container maxWidth='sm'>
					<Card sx={{ mb: 5 }}>
						<Swiper
							slidesPerView={1}
							spaceBetween={30}
							loop
							grabCursor
							keyboard={{ enabled: true }}
							pagination={{ clickable: true }}
							navigation
							modules={[Navigation, Pagination]}
						>
							{dragonDetails.flickr_images.map((image, index) => (
								<SwiperSlide key={index}>
									<CardMedia
										style={{ height: 0, paddingTop: '100%', objectFit: 'cover' }}
										image={image}
										alt='Flickr images'
									/>
								</SwiperSlide>
							))}
						</Swiper>

						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								sx={{ fontWeight: 600 }}>
								{dragonDetails.name}
							</Typography>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{ display: 'flex', flexDirection: 'column' }}>
								<Typography
									variant='overline'
									sx={{ fontWeight: 600, fontSize: 18 }}>
									Description:
								</Typography>
								{dragonDetails.description}

								<Typography
									variant='overline'
									sx={{ fontWeight: 600, fontSize: 18 }}>
									Wikipedia:
								</Typography>
								<Link
									href={dragonDetails.wikipedia}
									underline='hover'>
									{dragonDetails.wikipedia}
								</Link>

								<Typography
									variant='overline'
									sx={{ fontWeight: 600, fontSize: 18 }}>
									Height(meters):
								</Typography>
								{dragonDetails.height_w_trunk.meters}

								<Typography
									variant='overline'
									sx={{ fontWeight: 600, fontSize: 18 }}>
									Mass(kg):
								</Typography>
								{dragonDetails.dry_mass_kg}

								<Typography
									variant='overline'
									sx={{ fontWeight: 600, fontSize: 18 }}>
									First flight:
								</Typography>
								{dragonDetails.first_flight}
							</Typography>
						</CardContent>
						<CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button
								variant='text'
								startIcon={<KeyboardBackspaceTwoToneIcon />}
								onClick={() => navigate(-1)}
							>
								Back
							</Button>
							<Button
								variant='text'
								startIcon={<FavoriteIcon />}
								onClick={handleAddChosen}
								disabled={isItemInChosen}>
								Chosen
							</Button>
						</CardActions>
					</Card>
				</Container>
				<Outlet />
			</>
		)
	)
}

export default DragonDetails
