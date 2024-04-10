import type { UserState } from './UserContext'
import { UserContext } from './UserContext'

interface UserProviderProps extends UserState {
	children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({
	user,
	setUser,
	children,
}) => (
	<UserContext.Provider value={{ user, setUser }}>
		{children}
	</UserContext.Provider>
)
