import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
	clientId: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_SECRET,
	redirectUri: 'http://localhost:3000/api/auth/callback',
	postLogoutRedirectUri: 'http://localhost:3000/',
	scope: 'openid profile'
});