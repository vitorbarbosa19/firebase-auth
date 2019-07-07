import React from 'react'
import { useRoutes } from 'hookrouter'
import { Home } from './Home'
import { New } from './New'
import { Path } from './Path' // provider
import { Name } from './Name' // provider

const routes = {
	'/': () => <Home />,
	'/new': () => <Path><Name><New /></Name></Path>
}

export const App = () => {
	return useRoutes(routes) || <div>Not found</div>
}