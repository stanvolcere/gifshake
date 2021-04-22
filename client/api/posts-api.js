import { apiEndpoint } from '../config/config'
import axios from 'axios'

export const getPosts = async (idToken) => {
	try {
		const response = await axios.get(`${apiEndpoint}/posts`, {
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

export const getMyPosts = async (idToken) => {
	try {
		const response = await axios.get(`${apiEndpoint}/posts/me`, {
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

export const getPost = async (idToken, postId) => {
	try {
		const response = await axios.get(`${apiEndpoint}/posts/${postId}`, {
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

export const createPost = async (idToken, newPost) => {
	try {
		const response = await axios.post(`${apiEndpoint}/posts`, newPost, {
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

export const updatePost = async (idToken, postId, updatedPost) => {
	try {
		const response = await axios.patch(`${apiEndpoint}/posts/${postId}`, updatedPost, {
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

export const deletePost = async (idToken, postId) => {
	try {
		const response = await axios.delete(`${apiEndpoint}/posts/${postId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${idToken}`
			},
		});
		return response.data
	} catch (e) {
		console.log(e)
		return [];
	}

	return response.data
}

export const getUploadUrl = async (idToken) => {
	try {
		const response = await axios.post(`${apiEndpoint}/posts/attachment`, {}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${idToken}`
			}
		})

		return response.data
	} catch (e) {
		console.log(e)
		return [];
	}
}

export const uploadFile = async (uploadUrl, file) => {
	try {
		await axios.put(uploadUrl, file, {
			headers: {
				'Content-Type': file.type
			}
		});
	} catch (e) {
		console.log(e)
		return [];
	}
}
