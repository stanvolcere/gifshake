import 'source-map-support/register'
import * as uuid from 'uuid'

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUploadUrl } from '../../s3/UploadUrl';

const bucketName = process.env.GIFS_S3_BUCKET

import { createLogger } from '../../utils/logger'
const logger = createLogger('generateUploadUrl')

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
	try {
		const uniqueGifId = uuid.v4()

		logger.info('getting presigned url for post with id')
		const presignedUrl = getUploadUrl(uniqueGifId)

		const uploadUrl = `https://${bucketName}.s3.eu-west-2.amazonaws.com/${uniqueGifId}.jpeg`

		// post: Return a presigned URL to upload a file for a post item with the provided id
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				presignedUrl,
				uploadUrl
			})
		}
	} catch (err) {
		logger.error(err.message)
		// post: Return a presigned URL to upload a file for a post item with the provided id
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
