import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../firebase'

export const App = () => {
	// no need for useState or useRef, cause currentUser persists
	const user = db.auth().currentUser
	// support variable
	const readyToUpdateDb = useRef(false)
	// state for presentational data
	const [isLoggedIn, setIsLoggedIn] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [userIsVerified, setUserIsVerified] = useState(null)
	const [userLastSignIn, setUserLastSignIn] = useState(null)
	// state for user inputs
	const [inputName, setInputName] = useState('')
	const [inputAddress, setInputAddress] = useState('')
	const [inputCNPJ, setInputCNPJ] = useState('')
	// effect to add auth listener
	useEffect(() => db.auth().onAuthStateChanged(userObject => {
		setIsLoggedIn(!!userObject)
		if (userObject) {
			setUserName(userObject.displayName)
			setUserEmail(userObject.email)
			setUserIsVerified(userObject.emailVerified ? 'Is verified' : 'Is not verified')
			setUserLastSignIn(userObject.metadata.lastSignInTime)
		}
	}), [])
	// effect to update to database the userName supplied by the user
	useEffect(() => {
		const updateProfile = async () => {
			try {
				await user.updateProfile({ displayName: inputName })
				setUserName(user.displayName)
			} catch (error) {
				console.log(error)
			}
		}
		// use ref to skip effect on first render
		if (readyToUpdateDb.current)
			updateProfile()
		if (!readyToUpdateDb.current)
			readyToUpdateDb.current = true
	}, [inputName])
	// add simple signin method
	const signIn = async () => {
		try {
			const result = await db.auth().signInWithEmailAndPassword('vitorbarbosa19@gmail.com', 'qw1234')
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	const getAddress = ({ target: { value } }) => setInputAddress(value)
	const getCNPJ = ({ target: { value } }) => setInputCNPJ(value)
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
						<input type='text' value={inputAddress} onChange={getAddress} />
						<input type='text' value={inputCNPJ} onChange={getCNPJ} />
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