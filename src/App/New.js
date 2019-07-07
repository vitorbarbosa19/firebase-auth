import React, { useContext } from 'react'
import { Context } from './ComponentWithContext'


export const New = () => {
	const value = useContext(Context)
	return (
		<div>{value}</div>
	)
}
