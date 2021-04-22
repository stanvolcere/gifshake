import * as uuid from 'uuid'

import { FavouriteItem } from '../models/FavouriteItem'
import { FavouriteAccess } from '../dataLayer/favouritesAccessLayer'
import { CreateFavouriteRequest } from '../requests/CreatefavouriteRequest'

import { createLogger } from '../utils/logger'
const logger = createLogger('favourites')

const favouriteAccess = new FavouriteAccess();

export async function getUserFavourites(userId: string): Promise<FavouriteItem[]> {
	logger.info('getting favourites')
	return favouriteAccess.getUserFavourites(userId)
}

export async function deleteFavourite(favouriteId: string, userId: string): Promise<Boolean> {
	logger.info('deleting favourite')
	return favouriteAccess.deleteFavourite(favouriteId, userId)
}

export async function createFavourite(
	createFavouriteRequest: CreateFavouriteRequest,
	userId: string
): Promise<FavouriteItem> {
	logger.info('generate unique id')
	const favouriteId = uuid.v4()

	logger.info('create favourite')
	return await favouriteAccess.createFavourite({
		favouriteId: favouriteId,
		userId: userId,
		postId: createFavouriteRequest.postId,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	})
}