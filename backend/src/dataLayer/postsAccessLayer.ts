import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { PostItem } from '../models/PostItem'
//import { PostUpdate } from '../models/PostUpdate'

import { createLogger } from '../utils/logger'
const logger = createLogger('postsAccess')

//const XAWS = AWSXRay.captureAWS(AWS)

const userIdIndex = process.env.USER_ID_INDEX;

export class PostAccess {
	constructor(
		private readonly docClient: DocumentClient = createDynamoDBClient(),
		private readonly postsTable = process.env.POSTS_TABLE) {
	}

	async getAllUserPosts(userId: string): Promise<PostItem[]> {
		logger.info('get all posts' + userId)
		const result = await this.docClient.query({
			TableName: this.postsTable,
			IndexName: userIdIndex,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId
			}
		}).promise()

		const items = result.Items
		if (items.length > 0) {
			return items as PostItem[]
		}
		return [];
	}

	async getAllPosts(): Promise<PostItem[]> {
		logger.info('get all posts')
		const result = await this.docClient.query({
			TableName: this.postsTable
		}).promise()

		const items = result.Items
		if (items.length > 0) {
			return items as PostItem[]
		}
		return [];
	}

	async getTodo(todoId: string): Promise<PostItem[]> {
		logger.info('get post')
		const result = await this.docClient.query({
			TableName: this.postsTable,
			KeyConditionExpression: 'todoId = :todoId',
			ExpressionAttributeValues: {
				':todoId': todoId,
			}
		}).promise()

		const items = result.Items
		return items as PostItem[]
	}

	async createTodo(post: PostItem): Promise<PostItem> {
		logger.info('create post for user')
		await this.docClient.put({
			TableName: this.postsTable,
			Item: post
		}).promise()

		return post
	}

	/*
	async deleteTodo(todoId: string, userId: string): Promise<Boolean> {
		logger.info('delete todo for user' + userId)

		await this.docClient.delete({
			TableName: this.postsTable,
			Key: {
				"todoId": todoId,
				"userId": userId,
			}
		}).promise()

		return true;
	}

	async updateTodo(todoId: string, userId: string, updatedTodo: TodoUpdate): Promise<Boolean> {
		logger.info('update todo for user ' + userId)
		await this.docClient.update({
			TableName: this.postsTable,
			Key: {
				"todoId": todoId,
				"userId": userId
			},
			UpdateExpression: "SET attachmentUrl = :attachmentUrl, #n = :name, dueDate = :dueDate, done = :done",
			ExpressionAttributeValues: {
				":attachmentUrl": updatedTodo.attachmentUrl,
				":name": updatedTodo.name,
				":dueDate": updatedTodo.dueDate,
				":done": updatedTodo.done
			},
			ExpressionAttributeNames: {
				"#n": "name"
			}
		}).promise()

		return true;
	}
	*/
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