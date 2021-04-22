import { apiEndpoint } from '../config/config'
import axios from 'axios'

export const getUserFavourites = async (idToken) => {
	try {
		const response = await axios.get(`${apiEndpoint}/favourites`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${idToken}`
			},
		});

		return response.data.items
	} catch (e) {
		console.log(e)
		return [];
	}
}

export const createFavourite = async (idToken, postId) => {
	try {
		const response = await axios.post(`${apiEndpoint}/favourites`, { postId }, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${idToken}`
			},
		});

		return response.data.items
	} catch (e) {
		console.log(e)
		return [];
	}
}


export const deleteFavourite = async (idToken, favouriteId) => {
	try {
		await axios.delete(`${apiEndpoint}/favourites/${favouriteId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${idToken}`
			},
		});
	} catch (e) {
		console.log(e.message)
	}
}