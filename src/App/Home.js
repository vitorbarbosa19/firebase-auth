import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export const Home = () => {
	// no need for useState or useRef, cause reference persists
	const user = db.auth().currentUser
	const store = db.firestore()
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
	// effect to add users collection listener
	useEffect(() => store.collection('users').doc('oc2VEpOG6ud7KXybc1bG').onSnapshot(doc => {
		console.log(doc.data())
	}), [])
	// add simple signin method
	const signIn = async () => {
		try {
			const result = await db.auth().signInWithEmailAndPassword('vitorbarbosa19@gmail.com', 'qw1234')
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	// add method to update profile info to database and receive realtime update
	const updateProfile = async (inputValue) => {
		try {
			await user.updateProfile({ displayName: inputValue })
			setUserName(user.displayName)
		} catch (error) {
			console.log(error)
		}
	}
	const getAddress = ({ target: { value } }) => setInputAddress(value)
	const getCNPJ = ({ target: { value } }) => setInputCNPJ(value)
	// add method to update to database inputs from user
	const updateDatabase = async () => {
		try {
			await store.collection('users').doc('oc2VEpOG6ud7KXybc1bG').update({
				address: inputAddress,
				cnpj: inputCNPJ
			})
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
						<input type='text' value={inputAddress} onChange={getAddress} />
						<input type='text' value={inputCNPJ} onChange={getCNPJ} />
						<input type='submit' value='updateDatabase' onClick={updateDatabase} />
					</div>
				:
					<p>Logged out</p>
			}
			<input type='submit' value='signIn' onClick={signIn} />
			<input type='submit' value='signOut' onClick={() => db.auth().signOut()} />
			<input type='submit' value='updateName1' onClick={updateProfile.bind(null,'Almeida')} />
			<input type='submit' value='updateName2' onClick={updateProfile.bind(null,'Barbosa')} />
		</div>
	)
}