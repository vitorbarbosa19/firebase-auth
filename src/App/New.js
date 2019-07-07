import React, { useContext } from 'react'
import { PathContext } from './Path'


export const New = () => {
	const path = useContext(PathContext)
	return (
		<div>{path}</div>
	)
}
