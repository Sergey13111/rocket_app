import axios from '../../helpers/axios'

const getDragons = async (page) => {
	const dragons = await axios.post('/v4/dragons/query', {
		options: { limit: 1, page: page },
	})
	return dragons
}

const getDragonDetails = async (id) => {
	const dragonDetails = await axios.get(`/v4/dragons/${id}`)
	return dragonDetails
}

const dragonsService = {
	getDragons,
	getDragonDetails,
}

export default dragonsService
