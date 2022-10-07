import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Button,
	Container,
	Typography,
} from '@mui/material'
import { removeChosenItems } from '../../store/chosenSlice'

const Chosen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { chosenItems } = useSelector((state) => state.chosen)

	const handleDetail = (id) => () => {
		navigate(`/v4/dragons/${id}`)
	}

	const handleDelete = (id) => () => {
		dispatch(removeChosenItems(id))
	}

	return (
		<>
			<Container maxWidth='sm'>
				{chosenItems.length > 0 ? (
					<List
						dense
						sx={{ width: '100%', bgcolor: 'background.paper' }}>
						{chosenItems.map(({ id, name, flickr_images }) => {
							return (
								<ListItem
									key={id}
									disablePadding
									sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
									<ListItemButton
										sx={{ mr: 2, fontSize: 24 }}
										onClick={handleDetail(id)}>
										<ListItemAvatar>
											<Avatar
												alt='Flickr images'
												src={flickr_images[0]}
												sx={{ width: 80, height: 80 }}
											/>
										</ListItemAvatar>
										<ListItemText>
											<Typography sx={{ fontSize: 24, ml: 4 }}>{name}</Typography>
										</ListItemText>
									</ListItemButton>
									<Button
										edge='end'
										variant='outlined'
										onClick={handleDelete(id)}>
										Remove
									</Button>
								</ListItem>
							)
						})}
					</List>
				) : (
					<Typography variant='h3'>Empty. Add dragons to your favorites</Typography>
				)}
			</Container>
			<Outlet />
		</>
	)
}
export default Chosen
