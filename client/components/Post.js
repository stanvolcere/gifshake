import react, { Component, useContext, useState } from 'react';
import Link from 'next/link'

import { deletePost } from '../api/posts-api'
import { createFavourite, deleteFavourite } from '../api/favourites-api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'

import EditPost from './EditPost';

import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0';

const Post = (props) => {
	const { idToken, post, favourites } = props;
	const { user, isLoading } = useUser();
	const router = useRouter()

	const [editingPost, setEditingPost] = useState(false);
	const [postCaption, setPostCaption] = useState(post[0] && post[0].caption || "");
	const [postTags, setPostTags] = useState(post[0] && post[0].tags || "");

	const renderStar = (item) => {
		let found = false;
		if (favourites && favourites.length > 0) {
			found = favourites.find((favourite) => {
				return favourite.postId == item.postId
			});
		}

		if (!!found) {
			return <div><FontAwesomeIcon
				icon={faStar}
				size="lg"
				onClick={(e) => { handleFavourite(e, item) }}></FontAwesomeIcon></div>
		}
		return <div><FontAwesomeIcon
			icon={faStarReg}
			size="lg"
			onClick={(e) => { handleFavourite(e, item) }}></FontAwesomeIcon></div>
	}

	const handleFavourite = async (e, item) => {
		e.stopPropagation();
		console.log(item)

		// 1. find the favourite for that post id
		const found = favourites.find((f) => {
			return f.postId == item.postId;
		});

		// if found send delete request to the api
		if (found) {
			console.log(found)
			await deleteFavourite(idToken, found.favouriteId)
		} else {
			await createFavourite(idToken, item.postId)
		}

		// else create the favourtite on api
		router.reload()
	}

	const handleDeletePost = async (e, item) => {
		e.stopPropagation();

		// 1. find the favourite for that post id
		const found = favourites.find((f) => {
			return f.postId == item.postId;
		});

		// delete the post
		await deletePost(idToken, item.postId)

		// if the favourite was found then delete the favourite
		if (found) {
			await deleteFavourite(idToken, found.favouriteId)
		}

		// else create the favourtite on api
		router.push('/')
	}

	const renderEditPost = () => {
		if (!isLoading && user && post && post.length > 0 && user.sub === post[0].userId && editingPost) {
			return <div>
				<EditPost post={post[0]} idToken={idToken} setEditingPost={setEditingPost}></EditPost>
			</div>
		}
		return;
	}

	const renderDeletePost = (item) => {
		if (!isLoading && user && post && post.length > 0 && user.sub === post[0].userId) {
			return <FontAwesomeIcon
				icon={faTrash}
				size="lg"
				onClick={(e) => { handleDeletePost(e, item) }}></FontAwesomeIcon>
		}
		return;
	}


	return (
		<div className="" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
			{post && post.length > 0 && post.map((item, i) => {
				return <div style={{ width: '70%', margin: '5%' }} key={i}>
					<div className="card" style={{ margin: '5%' }}>
						<div className="card-image">
							<figure className="image">
								<img style={{ width: '100%', height: 'auto' }} src={item.url} alt="not working"></img>
							</figure>
						</div>
						{!editingPost && <div className="card-content">
							<div className="content" style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}>
								{item.caption}
								{renderStar(item)}
							</div>
							{!isLoading && user && post && post.length > 0 && user.sub === post[0].userId &&
								<div style={{
									display: 'flex',
									alignItems: 'center',
								}}><FontAwesomeIcon
										icon={faEdit}
										size="lg"
										onClick={() => { setEditingPost(!editingPost) }}
									/><div style={{ width: "2%" }}></div>{renderDeletePost(item)}</div>
							}
						</div>}
						<div>
							<div>{renderEditPost()}</div>
						</div>
					</div>
				</div>
			})}
			{post && post.length == 0 && <div>404: Post not found!</div>}
		</div >
	);
};

export default Post;












