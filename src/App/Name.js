import React, { createContext } from 'react'

const NameContext = createContext('')

const Name = ({ children }) =>
	<NameContext.Provider value={'Vitor B.'}>
		{children}
	</NameContext.Provider>

export { NameContext, Name }