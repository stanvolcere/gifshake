import * as uuid from 'uuid'

import { PostItem } from '../models/PostItem'
import { PostAccess } from '../dataLayer/postsAccessLayer'
import { CreatePostRequest } from '../requests/CreatePostRequest'
import { PostUpdate } from '../models/PostUpdate'

import { createLogger } from '../utils/logger'
const logger = createLogger('todos')

const postAccess = new PostAccess();

export async function getAllPosts(): Promise<PostItem[]> {
	logger.info('getting todos')
	return postAccess.getAllPosts()
}

export async function getAllUserPosts(userId: string): Promise<PostItem[]> {
	logger.info('getting todos')
	return postAccess.getAllUserPosts(userId)
}

export async function getPost(postId: string): Promise<PostItem[]> {
	logger.info('getting post')
	return postAccess.getPost(postId)
}

export async function deletePost(postId: string, userId: string): Promise<Boolean> {
	logger.info('deleting todo')
	return postAccess.deletePost(postId, userId)
}

export async function createPost(
	createPostRequest: CreatePostRequest,
	userId: string
): Promise<PostItem> {
	logger.info('generate unique id')
	const postId = uuid.v4()

	logger.info('create todo')
	return await postAccess.createPost({
		postId: postId,
		userId: userId,
		caption: createPostRequest.caption,
		url: createPostRequest.url,
		tags: createPostRequest.tags,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	})
}

export async function updatePost(postId: string, userId: string, updatedPost: PostUpdate): Promise<Boolean> {
	logger.info('update todo')
	return postAccess.updatePost(postId, userId, { caption: updatedPost.caption, tags: updatedPost.tags, updatedAt: new Date().toISOString() })
}