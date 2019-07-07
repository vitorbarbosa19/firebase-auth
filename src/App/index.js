import React from 'react'
import { useRoutes } from 'hookrouter'
import { Home } from './Home'
import { New } from './New'
import { Path } from './Path'

const routes = {
	'/': () => <Home />,
	'/new': () => <Path><New /></Path>
}

export const App = () => {
	return useRoutes(routes) || <div>Not found</div>
}