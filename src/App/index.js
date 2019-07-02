import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../../firebase-config.js'

export const App = () => {
	useEffect(() => {
		firebase.initializeApp(firebaseConfig)
		const createUser = async () => {
			try {
				const result = await firebase.auth().createUserWithEmailAndPassword('vitorbarbosa19@gmail.com','qw1234')		
				console.log(result)
			} catch (error) {
				console.log(error)
				if (error.message)
					console.log(JSON.parse(error.message))
			}
		}
		createUser()
	}, [])
	return <div>Hi</div>
}