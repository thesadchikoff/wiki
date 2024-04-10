import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/classnames'
import { FaMoon } from 'react-icons/fa6'
import { FiSun } from 'react-icons/fi'

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme()
	return (
		<div onClick={toggleTheme} className={cn('text-2xl cursor-pointer')}>
			{theme === 'dark' ? (
				<FaMoon />
			) : (
				<FiSun className={cn('text-orange-400')} />
			)}
		</div>
	)
}
