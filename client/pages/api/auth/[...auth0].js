import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';
//import auth0 from '../../utils/auth0';

export default handleAuth({
	async logout(req, res) {
		// You don't strictly need to sanitise `req.query.returnTo` because it has to be in Auth0's "Allowed Logout URLs"
		// But if you ever added a local logout option you should sanitise it, like we do with the login `returnTo`
		// eg https://github.com/auth0/nextjs-auth0/blob/beta/src/handlers/login.ts#L70-L72
		try {
			await handleLogout(req, res, {
				returnTo: `http://localhost:3000`
			});
		} catch (error) {
			res.status(error.status || 400).end(error.message);
		}
	}
});