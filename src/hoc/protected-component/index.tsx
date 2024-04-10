import { useUser } from '@/context/user'
import { ROUTES } from '@/router/routes'
import { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface IProtectedRoute {
	onlyUnAuth: boolean
	onlyAdmin: boolean
	component: JSX.Element
	onlyMod: boolean
}

const ProtectedRoute = ({
	onlyUnAuth = false,
	component,
	onlyAdmin = false,
	onlyMod = false,
}: IProtectedRoute): JSX.Element => {
	const { user } = useUser()
	const location = useLocation()

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } }
		return <Navigate to={from} />
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to={ROUTES.AUTH} state={{ from: location }} />
	}

	if (onlyAdmin && !user?.isAdmin) {
		return <Navigate to={ROUTES.HOME} state={{ from: location }} />
	}
	if (onlyMod && !user?.moderatedContent.length) {
		console.log(user)
		return <Navigate to={ROUTES.HOME} state={{ from: location }} />
	}
	return component
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyAuth = (props: any) => (
	<ProtectedRoute onlyUnAuth={false} {...props} />
)

export const OnlyAdmin = (props: any) => (
	<ProtectedRoute onlyAdmin={true} {...props} />
)

export const OnlyMod = (props: any) => (
	<ProtectedRoute onlyMod={true} {...props} />
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyUnAuth = (props: any) => (
	<ProtectedRoute onlyUnAuth={true} {...props} />
)
