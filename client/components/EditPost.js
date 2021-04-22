import react, { Component, useContext, useState } from 'react';
import { getUploadUrl, updatePost } from '../api/posts-api'
import { useRouter } from 'next/router'
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const EditPost = (props) => {
	const router = useRouter();
	const { user } = useUser();

	const { idToken, post, setEditingPost } = props

	const [postCaption, setPostCaption] = useState(post.caption)
	const [postTags, setPostTags] = useState(post.tags)

	const styles = {
		margin: '5%'
	}

	const submitPost = async (e) => {
		e.preventDefault();

		if (postCaption.length >= 3) {
			if (user.sub == post.userId) {
				// save the 
				const body = { caption: postCaption, tags: postTags, url: post.url }
				const res = await updatePost(idToken, post.postId, body)
			}

			router.push('/')

		} else {
			alert("Your caption must be greater than 3 characters long.")
		}
	}

	const changeCaption = (e) => {
		e.preventDefault();
		setPostCaption(e.target.value);
	}

	const changeTags = (e) => {
		e.preventDefault();
		const tags = e.target.value.split(",");
		setPostTags([...tags])
	}



	return (<div style={styles}>
		<div className="field">
			<label className="label">Caption</label>
			<div className="control">
				<input className="input" type="text" placeholder="" onChange={changeCaption} value={postCaption}></input>
			</div>
		</div>
		<div className="field">
			<label className="label">Tags</label>
			<div className="control">
				<input className="input" type="email" placeholder="" onChange={changeTags} value={postTags.join(',')}></input>
			</div>
		</div>
		<button style={{ marginBottom: '5%', marginTop: '2%' }} className="button is-primary" onClick={submitPost}>Save</button>
		<button style={{ marginBottom: '5%', marginTop: '2%' }} className="button is-outlined" onClick={() => { setEditingPost(false) }}>Cancel</button>
	</div>
	);
};

export default EditPost;