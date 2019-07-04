import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export const App = () => {
	const [user, setUser] = useState(null)
	const [userName, setUserName] = useState(null)
	useEffect(() => db.auth().onAuthStateChanged(userObject => {
		setUser(userObject)
		if (userObject)
			setUserName(userObject.displayName)
	}), [])
	const signIn = async () => {
		try {
			const result = await db.auth().signInWithEmailAndPassword('vitorbarbosa19@gmail.com', 'qw1234')
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const updateProfile = async () => {
			console.log('user',user)
			try {
				await user.updateProfile({ displayName: userName })
				setUser(Object.create(user))
			} catch (error) {
				console.log(error)
			}
		}
		console.log('userName',userName)
		if (userName)
			updateProfile()
	}, [userName])
	return (
		<div>
			{user
				?
					<div>
						<p>Logged in</p>
						<p>{user.displayName}</p>
						<p>{user.email}</p>
						<p>{user.emailVerified}</p>
						<p>{user.metadata.lastSignInTime}</p>					
					</div>
				:
					<p>Logged out</p>
			}
			<input type='submit' value='signIn' onClick={signIn} />
			<input type='submit' value='signOut' onClick={() => db.auth().signOut()} />
			<input type='submit' value='updateProfile' onClick={() => setUserName('Vitor S.')} />
		</div>
	)
}