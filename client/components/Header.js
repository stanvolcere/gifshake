import react, { Component, useContext, useState } from 'react';
import Link from 'next/link'

import { useUser } from '@auth0/nextjs-auth0';

const Header = () => {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
	console.log(user)

	// if (user) {
	// 	return (
	// 		<div>
	// 			Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
	// 		</div>
	// 	);
	// }
	const renderLogin = () => {
		if (user) {
			return (<div>
				Welcome {user.nickname}! <a href="/api/auth/logout">Logout</a>
			</div>)
		} else {
			return <a href="/api/auth/login">Login</a>
		}
	}

	return (
		<section className="hero">
			<div className="hero-body" style={{ display: 'flex', justifyContent: "space-between" }}>
				<div>
					<p className="title">
						<Link href='/'>Gifshake</Link>
					</p>
					<p className="subtitle">
						Browse random photos
					</p>
				</div>
				<div style={{ display: 'flex', width: '40%', justifyContent: 'space-between' }}>
					<p className="subtitle">
						<Link href='/posts/create'>Add post</Link>
					</p>
					<p className="subtitle">
						<Link href='/posts/me'>Me</Link>
					</p>
					<p className="subtitle">
						<Link href='/favourites'>Favourites</Link>
					</p>
				</div>
				<div>
					{renderLogin()}
				</div>
			</div>
		</section >
	);
};

export default Header;












