import React, { createContext } from 'react'

const Context = createContext('')

const ComponentWithContext = ({ children }) => {
	return (
		<Context.Provider value={'New route'}>
			{children}
		</Context.Provider>
	)
}

export { Context, ComponentWithContext }