import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { FavouriteItem } from '../models/FavouriteItem'

import { createLogger } from '../utils/logger'
const logger = createLogger('favouritesAccess')


const userIdIndex = process.env.USER_ID_INDEX;

export class FavouriteAccess {
	constructor(
		private readonly docClient: DocumentClient = createDynamoDBClient(),
		private readonly favouritesTable = process.env.FAVOURITES_TABLE) {
	}

	async getUserFavourites(userId: string): Promise<FavouriteItem[]> {
		logger.info('get all favourites' + userId)
		const result = await this.docClient.query({
			TableName: this.favouritesTable,
			IndexName: userIdIndex,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId
			}
		}).promise()

		const items = result.Items
		if (items.length > 0) {
			items.reverse()
			return items as FavouriteItem[]
		}
		return [];
	}

	async createFavourite(favourite: FavouriteItem): Promise<FavouriteItem> {
		logger.info('create favourite for user')
		await this.docClient.put({
			TableName: this.favouritesTable,
			Item: favourite
		}).promise()

		return favourite
	}

	async deleteFavourite(favouriteId: string, userId: string): Promise<Boolean> {
		logger.info('delete todo for user' + userId)

		await this.docClient.delete({
			TableName: this.favouritesTable,
			Key: {
				"favouriteId": favouriteId,
				"userId": userId,
			}
		}).promise()

		return true;
	}

}

function createDynamoDBClient() {
	if (process.env.IS_OFFLINE) {
		logger.info('Creating a local DynamoDB instance')
		return new AWS.DynamoDB.DocumentClient({
			region: 'localhost',
			endpoint: 'http://localhost:8000'
		})
	}

	logger.info('return DynamoDB instance')
	return new AWS.DynamoDB.DocumentClient()
}