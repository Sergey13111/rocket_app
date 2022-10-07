export const loadState = () => {
	try {
		const dataFromStorage = localStorage.getItem('state')
		if (dataFromStorage === null) {
			return undefined
		}
		return JSON.parse(dataFromStorage)
	} catch (error) {
		return undefined
	}
}

export const saveState = (state) => {
	const newState = JSON.stringify(state)
	localStorage.setItem('state', newState)
}
