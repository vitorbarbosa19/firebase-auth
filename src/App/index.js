import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../firebase'

export const App = () => {
	const user = db.auth().currentUser // no need for useState or useRef, cause currentUser persists
	const readyToUpdateDb = useRef(false)
	const [isLoggedIn, setIsLoggedIn] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [userIsVerified, setUserIsVerified] = useState(null)
	const [userLastSignIn, setUserLastSignIn] = useState(null)
	const [inputName, setInputName] = useState('')
	useEffect(() => db.auth().onAuthStateChanged(userObject => {
		setIsLoggedIn(!!userObject)
		if (userObject) {
			setUserName(userObject.displayName)
			setUserEmail(userObject.email)
			setUserIsVerified(userObject.emailVerified ? 'Is verified' : 'Is not verified')
			setUserLastSignIn(userObject.metadata.lastSignInTime)
		}
	}), [])
	useEffect(() => {
		const updateProfile = async () => {
			try {
				await user.updateProfile({ displayName: inputName })
				setUserName(user.displayName)
			} catch (error) {
				console.log(error)
			}
		}
		if (readyToUpdateDb.current)
			updateProfile()
		if (!readyToUpdateDb.current)
			readyToUpdateDb.current = true
	}, [inputName])
	const signIn = async () => {
		try {
			const result = await db.auth().signInWithEmailAndPassword('vitorbarbosa19@gmail.com', 'qw1234')
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			{isLoggedIn
				?
					<div>
						<p>Logged in</p>
						<p>{userName}</p>
						<p>{userEmail}</p>
						<p>{userIsVerified}</p>
						<p>{userLastSignIn}</p>
					</div>
				:
					<p>Logged out</p>
			}
			<input type='submit' value='signIn' onClick={signIn} />
			<input type='submit' value='signOut' onClick={() => db.auth().signOut()} />
			<input type='submit' value='updateName1' onClick={() => setInputName('Almeida')} />
			<input type='submit' value='updateName2' onClick={() => setInputName('Barbosa')} />
		</div>
	)
}