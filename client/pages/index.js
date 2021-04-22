import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

import React from 'react';
import Posts from "../components/Posts";
import { getPosts } from '../api/posts-api'
import { getUserFavourites } from '../api/favourites-api'

export default function Home(props) {

	return (
		<React.Fragment>
			<div className="container is-widescreen">
			</div>
			<br />
			<Posts {...props}></Posts>
		</React.Fragment>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async (context) => {
		let idToken = '';
		let posts = [];
		let favourites = [];

		try {
			const session = getSession(context.req, context.res);
			idToken = session.idToken;

			posts = await getPosts(idToken);
			favourites = await getUserFavourites(idToken);

		} catch (e) {
			console.log(e.message)
		}

		console.log(favourites)
		return {
			props: { idToken, posts, favourites }, // will be passed to the page component as props
		}

	}
})
