import react, { Component, useContext, useState } from 'react';
import { createPost, getUploadUrl, uploadFile } from '../api/posts-api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import { isOffline } from '../config/config'

const CreatePost = (props) => {
	const router = useRouter()
	const { idToken } = props;

	const [postCaption, setPostCaption] = useState("")
	const [postTags, setPostTags] = useState([])
	// File upload stuff
	const [fileUploadData, setFileUploadData] = useState({})
	const [isSaving, setIsSaving] = useState(false)

	const submitPost = async (e) => {
		e.preventDefault();


		if (postCaption.length >= 3) {
			if (fileUploadData && Object.keys(fileUploadData).length > 0) {
				setIsSaving(true)

				// get presigned url 
				let signedUploadUrlData = {
					uploadUrl: "https://bulma.io/images/placeholders/128x128.png"
				};

				if (!isOffline) {
					signedUploadUrlData = await getUploadUrl(idToken);

					// upload file 
					await uploadFile(signedUploadUrlData.presignedUrl, fileUploadData.file);
				}

				// save the 
				const body = { caption: postCaption, url: signedUploadUrlData.uploadUrl, tags: postTags };

				const res = await createPost(idToken, body);

				setIsSaving(false)

				router.push('/')
			} else {
				alert("Please select a file.")
			}
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

	const changeFile = (e) => {
		e.preventDefault();
		console.log(e.target.files[0])
		setFileUploadData({ file: e.target.files[0] });
	}

	return (
		<div className="container">
			<div className="file has-name is-boxed">
				<label className="file-label">
					<input className="file-input" type="file" accept="image/*" onChange={changeFile}></input>
					<span className="file-cta">
						<span className="file-icon">
							<FontAwesomeIcon icon={faUpload}
								size="lg"></FontAwesomeIcon>
						</span>
						<span className="file-label">
							Choose a file…
				</span>
					</span>
					{fileUploadData.name && <span className="file-name">
						{fileUploadData.name}
					</span>}
				</label>
			</div>

			<br></br>
			<div className="field">
				<label className="label">Caption</label>
				<div className="control">
					<input className="input" type="text" placeholder="" onChange={changeCaption}></input>
				</div>
			</div>
			<div className="field">
				<label className="label">Tags</label>
				<div className="control">
					<input className="input" type="email" placeholder="" onChange={changeTags}></input>
				</div>
			</div>
			<button className="button is-link is-light" onClick={submitPost}>Post</button>
			{isSaving && <div>Saving post...</div>}
		</div>
	);
};

export default CreatePost;