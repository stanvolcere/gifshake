import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const bucketName = process.env.GIFS_S3_BUCKET
//const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const s3 = new XAWS.S3({
	signatureVersion: 'v4',
	region: 'eu-west-2'
})

/**
 * getUploadUrl
 *
 * @param todoId - Id of the todo to return signedURL for
 */
export function getUploadUrl(gifId: string) {
	return s3.getSignedUrl('putObject', {
		Bucket: bucketName,
		Key: `${gifId}.jpeg`,
		Expires: 500,
		ContentType: 'image/jpeg'
	})
}
