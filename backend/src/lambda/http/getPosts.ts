import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getAllPosts } from '../../businessLogic/posts'

import { getToken, parseUserId } from '../../auth/utils';

import { createLogger } from '../../utils/logger'
const logger = createLogger('getTodosLambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		// Auth related
		logger.info('authurising user');
		const authorization = event.headers.Authorization
		const token = getToken(authorization)
		const userId = parseUserId(token);

		logger.info('get todos for user' + userId);
		const posts = await getAllPosts()

		// TODO: Get all TODO items for a current user
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				items: posts
			})
		}
	} catch (err) {
		logger.error(err.message);
		if (err.errorCode === 401) {
			return {
				statusCode: err.errorCode,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({
					message: err.message
				})
			}
		}
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
