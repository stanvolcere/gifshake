import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';
import Posts from "../components/Posts";
import { getPosts } from '../api/posts-api';
import { getUserFavourites } from '../api/favourites-api'

export default function MyFavourites(props) {
	return (
		<div className="container is-half">
			<Posts {...props} userProfile={true} favouritesPage={true}></Posts>
		</div>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async (context) => {
		let posts = [];
		let favourites = [];

		try {
			const { user, idToken } = getSession(context.req, context.res);

			if (user) {
				posts = await getPosts(idToken);
				favourites = await getUserFavourites(idToken);
			}
		} catch (e) {
			console.log(e.message)
		}

		return {
			props: { posts, favourites }, // will be passed to the page component as props
		}

	}
})

// export const getServerSideProps = withPageAuthRequired({
// 	getServerSideProps: async ({ req, res }) => {
// 			const { user } = getSession(req, res);
// 			const postsForUser = // code that fetches users posts from DB // 

// 			return { props: { posts } };
// 	},
// });

// export default function Posts({ user, posts }) {