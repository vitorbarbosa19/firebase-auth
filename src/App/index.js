import React from 'react'
import { useRoutes } from 'hookrouter'
import { Home } from './Home'
import { New } from './New'

const routes = {
	'/': () => <Home />,
	'/new': () => <New />
}

export const App = () => {
	return useRoutes(routes) || <div>Not found</div>
}