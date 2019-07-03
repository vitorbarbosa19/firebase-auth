import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export const App = () => {
	const [userData, setUserData] = useState(null)
	useEffect(() => {
		return db.auth().onAuthStateChanged(user => {
			console.log(user)
			if (user)
				setUserData({
					email: user.email,
					verified: user.emailVerified ? 'is verified' : 'is not verified',
					signIn: user.metadata.lastSignInTime
				})
			else
				setUserData(null)
		})
	}, [])
	const signIn = async () => {
		try {
			const result = await db.auth().signInWithEmailAndPassword('vitorbarbosa1@gmail.com', 'qw1234')
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			{userData
				?
					<div>
						<p>Logged in</p>
						<p>{userData.email}</p>
						<p>{userData.verified}</p>
						<p>{userData.signIn}</p>					
					</div>
				:
					<p>Logged out</p>
			}
			<input type='submit' value='signIn' onClick={signIn} />
			<input type='submit' value='signOut' onClick={() => db.auth().signOut()} />
		</div>
	)
}