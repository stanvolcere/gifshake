import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteFavourite } from '../../businessLogic/favourites'
import { getToken, parseUserId } from '../../auth/utils';

import { createLogger } from '../../utils/logger'
const logger = createLogger('deleteTodosLambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		logger.info('Getting user')
		const favouriteId = event.pathParameters.favouriteId
		const authorization = event.headers.Authorization
		const token = getToken(authorization)
		const userId = parseUserId(token)

		logger.info('Deleting todo with id' + favouriteId)
		await deleteFavourite(favouriteId, userId)

		// TODO: Remove a TODO item by id
		return {
			statusCode: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				message: "todo deleted"
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
