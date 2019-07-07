import React, { useContext } from 'react'
import { PathContext } from './Path'
import { NameContext } from './Name'


export const New = () => {
	const path = useContext(PathContext)
	const name = useContext(NameContext)
	return (
		<div>
			<div>{path}</div>
			<div>{name}</div>
		</div>
	)
}
