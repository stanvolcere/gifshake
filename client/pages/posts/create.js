import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import CreatePost from "../../components/CreatePost";

export default function Create(props) {
	const { idToken } = props;

	return (
		<div className="container is-half">
			<CreatePost idToken={idToken}></CreatePost>
		</div>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async (context) => {
		let idToken = '';

		try {
			const session = getSession(context.req, context.res);
			idToken = session.idToken;
		} catch (e) {
			console.log(e.message)
		}

		return {
			props: { idToken }, // will be passed to the page component as props
		}

	}
})