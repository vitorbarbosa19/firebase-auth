import React, { createContext } from 'react'
import { usePath } from 'hookrouter'

const PathContext = createContext('')

const Path = ({ children }) =>
	<PathContext.Provider value={usePath(false)}>
		{children}
	</PathContext.Provider>

export { PathContext, Path }