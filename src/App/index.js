import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../../firebase-config.js'

export const App = () => {
	const [userData, setUserData] = useState({})
	useEffect(() => {
		firebase.initializeApp(firebaseConfig)
		// onAuthStateChanged returns the unsubscribe method
		return firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setUserData({
					email: user.email,
					verified: user.emailVerified,
					signIn: user.metadata.lastSignInTime
				})
			}
		})
	}, [])
	// useEffect(() => {
	// 	firebase.initializeApp(firebaseConfig)
	// 	const signIn = async () => {
	// 		try {
	// 			const result = await firebase.auth().signInWithEmailAndPassword('vitorbarbosa19@gmail.com','qw1234')
	// 			console.log(result)
	// 		} catch (error) {
	// 			console.log(error)
	// 			if (error.message)
	// 				console.log(JSON.parse(error.message))
	// 		}
	// 	}
	// 	signIn()
	// }, [])
	return (
		<div>
			<p>{userData.email}</p>
			<p>{userData.verified}</p>
			<p>{userData.signIn}</p>
		</div>
	)
}