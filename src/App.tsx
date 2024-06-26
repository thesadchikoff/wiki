import { Toaster } from '@/components/ui/sonner'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QUERIES } from './constants/query.constants'
import { UserProvider } from './context'
import {
	OnlyAdmin,
	OnlyAuth,
	OnlyMod,
	OnlyUnAuth,
} from './hoc/protected-component'
import { PrivateLayout } from './layouts/private-layout'
import { PublicLayout } from './layouts/public-layout'
import { routerList } from './router/router.list'
import { LoadingScreen } from './screens/loading'
import userService from './services/user/user.service'

function App() {
	const [user, setUser] = useState<User | null>(null)
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: [QUERIES.PROFILE],
		queryFn: userService.getProfile,
		retry: false,
		refetchOnWindowFocus: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
	})

	const initModalShowStateInLocalStorage = () => {
		const isShow = localStorage.getItem('isShowUpdateModal')
		if (!isShow) {
			localStorage.setItem('isShowUpdateModal', 'true')
		}
		return null
	}
	useEffect(() => {
		initModalShowStateInLocalStorage()
	}, [])
	useEffect(() => {
		if (isSuccess) {
			setUser(data)
		}
		if (isError) {
			setUser(null)
		}
	}, [data, isSuccess, isError])
	if (isLoading) {
		return <LoadingScreen />
	}

	return (
		<UserProvider user={user} setUser={setUser}>
			<Toaster
				style={{ zIndex: 1000, color: 'black !important' }}
				className='!text-red-500'
			/>

			<BrowserRouter>
				<Routes>
					{routerList.map(page => {
						if (page.isProtected) {
							return (
								<Route
									key={page.path}
									path={page.path}
									errorElement={
										<div className='absolute top-0 left-0 w-full h-full text-white bg-orange-500'>
											ERROR!
										</div>
									}
									element={
										<OnlyAuth
											component={
												<PrivateLayout>
													<page.component />
												</PrivateLayout>
											}
										/>
									}
								/>
							)
						}
						if (page.isAdmin) {
							return (
								<Route
									key={page.path}
									path={page.path}
									errorElement={
										<div className='absolute top-0 left-0 w-full h-full text-white bg-orange-500'>
											ERROR!
										</div>
									}
									element={
										<OnlyAdmin
											component={
												<PrivateLayout>
													<page.component />
												</PrivateLayout>
											}
										/>
									}
								/>
							)
						}
						if (page.isMod) {
							return (
								<Route
									key={page.path}
									path={page.path}
									errorElement={
										<div className='absolute top-0 left-0 w-full h-full text-white bg-orange-500'>
											ERROR!
										</div>
									}
									element={
										<OnlyMod
											component={
												<PrivateLayout>
													<page.component />
												</PrivateLayout>
											}
										/>
									}
								/>
							)
						}
						return (
							<Route
								key={page.path}
								path={page.path}
								errorElement={
									<div className='absolute top-0 left-0 w-full h-full text-white bg-orange-500'>
										ERROR!
									</div>
								}
								element={
									<OnlyUnAuth
										component={
											<PublicLayout>
												<page.component />
											</PublicLayout>
										}
									/>
								}
							/>
						)
					})}
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
