import "../styles/globals.css";
import 'bulma/css/bulma.min.css';

// Components
import Header from '../components/Header'

import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
	return <UserProvider>
		<div>
			<div className="container">
				<Header></Header>
				<Component {...pageProps} />
			</div>
		</div>
	</UserProvider>
}

export default MyApp
