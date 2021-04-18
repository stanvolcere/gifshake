/**
 * Fields in a request to create a single POST item.
 */
export interface CreatePostRequest {
	caption: string
	url?: string
	tags?: string[]
}
