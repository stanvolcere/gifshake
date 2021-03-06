import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreatePostRequest } from '../../requests/CreatePostRequest'
import { createPost } from '../../businessLogic/posts'
import { getToken, parseUserId } from '../../auth/utils';

import { createLogger } from '../../utils/logger'
const logger = createLogger('creteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const newPost: CreatePostRequest = JSON.parse(event.body)
		logger.info("Recieved todo" + JSON.stringify(newPost))

		logger.info("Authenticating user")
		// Auth related
		const authorization = event.headers.Authorization
		const token = getToken(authorization)
		const userId = parseUserId(token)

		logger.info("Creatinng todo")
		const newItem = await createPost(newPost, userId)

		logger.info("Creatinng todo complete")
		return {
			statusCode: 201,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				items: newItem
			})
		}
	} catch (err) {
		logger.error(err)
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				message: err.message
			})
		}
	}
}
