import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserFavourites } from '../../businessLogic/favourites'

import { getToken, parseUserId } from '../../auth/utils';

import { createLogger } from '../../utils/logger'
const logger = createLogger('getFavouritesLambda')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		// Auth related
		logger.info('authurising user');
		const authorization = event.headers.Authorization
		const token = getToken(authorization)
		const userId = parseUserId(token);

		logger.info('get todos for user' + userId);
		const favourites = await getUserFavourites(userId)

		// TODO: Get all TODO items for a current user
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				items: favourites
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
