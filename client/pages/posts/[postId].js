import { withPageAuthRequired, getSession, getAccessToken } from '@auth0/nextjs-auth0';
import Post from "../../components/Post";
import { getPost } from '../../api/posts-api';
import { getUserFavourites } from '../../api/favourites-api'

export default function ViewPost(props) {

	return (
		<div className="container is-half">
			<Post {...props} userProfile={true}></Post>
		</div>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async (context) => {
		const { postId } = context.query;
		let post = [];
		let favourites = [];
		let idToken = "";

		try {
			const session = getSession(context.req, context.res);
			idToken = session.idToken;

			if (idToken) {
				post = await getPost(idToken, postId);
				favourites = await getUserFavourites(idToken);
			}
		} catch (e) {
			console.log(e.message)
		}

		return {
			props: { idToken, post, favourites }, // will be passed to the page component as props
		}

	}
})