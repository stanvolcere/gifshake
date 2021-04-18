import * as uuid from 'uuid'

import { PostItem } from '../models/PostItem'
import { PostAccess } from '../dataLayer/postsAccessLayer'
import { CreatePostRequest } from '../requests/CreatePostRequest'
//import { PostUpdate } from '../models/PostUpdate'

import { createLogger } from '../utils/logger'
const logger = createLogger('todos')

const postAccess = new PostAccess();

export async function getAllPosts(): Promise<PostItem[]> {
	logger.info('getting todos')
	return postAccess.getAllPosts()
}

// export async function getTodo(todoId: string): Promise<PostItem[]> {
// 	logger.info('getting todo')
// 	return PostAccess.getTodo(todoId)
// }

// export async function deleteTodo(todoId: string, userId: string): Promise<Boolean> {
// 	logger.info('deleting todo')
// 	return PostAccess.deleteTodo(todoId, userId)
// }

export async function createPost(
	createPostRequest: CreatePostRequest,
	userId: string
): Promise<PostItem> {
	logger.info('generate unique id')
	const postId = uuid.v4()

	logger.info('create todo')
	return await postAccess.createTodo({
		postId: postId,
		userId: userId,
		caption: createPostRequest.caption,
		url: createPostRequest.url,
		tags: createPostRequest.tags,
		createdAt: new Date().toISOString(),
	})
}

// export async function updateTodo(todoId: string, userId: string, updatedTodo: PostUpdate): Promise<Boolean> {
// 	logger.info('update todo')
// 	return PostAccess.updateTodo(todoId, userId, updatedTodo)
// }