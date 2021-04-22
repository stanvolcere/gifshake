import react, { Component, useContext, useState, useEffect } from 'react';
import { getPosts } from '../api/posts-api'
import { createFavourite, deleteFavourite } from '../api/favourites-api'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/router'

const Posts = (props) => {
	const router = useRouter()
	const { idToken, favourites, favouritesPage } = props;
	const [posts, setPosts] = useState([...props.posts])

	console.log();
	useEffect(() => {
		if (favouritesPage) {
			let favouritePosts = posts.filter((post) => {
				const found = favourites.find((f) => {
					return f.postId == post.postId
				})

				return !!found;
			})

			setPosts([...favouritePosts])
		}
	}, [])


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

	const renderStar = (item) => {
		let found = false;
		if (favourites.length > 0) {
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

	return (
		<div className="" style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-evenly'
		}}>
			{posts && posts.length > 0 && posts.map((item, i) => {
				return <Link href={`/posts/${item.postId}`} key={i}>
					<div style={{ width: '70%', margin: '5%' }} key={i}>
						<div className="card">
							<div className="card-image">
								<figure className="image">
									<img style={{ width: '100%', height: 'auto' }} src={item.url} alt="not working"></img>
								</figure>
							</div>
							<div className="card-content">
								<div className="content" style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between'
								}}>
									{item.caption}
									{renderStar(item)}
								</div>
							</div>
						</div>
					</div></Link>
			})}
			{posts.length == 0 && <div>
				No posts found!
				</div>}
		</div >
	);
};
export default Posts;