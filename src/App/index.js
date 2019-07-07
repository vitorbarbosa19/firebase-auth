import React from 'react'
import { useRoutes } from 'hookrouter'
import { Home } from './Home'
import { New } from './New'
import { ComponentWithContext } from './ComponentWithContext'

const routes = {
	'/': () => <Home />,
	'/new': () => <ComponentWithContext><New /></ComponentWithContext>
}

export const App = () => {
	return useRoutes(routes) || <div>Not found</div>
}