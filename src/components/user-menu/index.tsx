import { cn } from '@/utils/classnames'
import { PropsWithChildren, useEffect, useRef } from 'react'

interface UserMenu extends PropsWithChildren {
	email: string
	state: boolean
	setState: React.Dispatch<React.SetStateAction<boolean>>
}
export const UserMenu = ({ email, setState, state, children }: UserMenu) => {
	const rootRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			// @ts-ignore
			if (rootRef.current && !rootRef.current.contains(event.target!)) {
				setState?.(false)
			}
		}
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setState?.(false)
			}
		}

		window.addEventListener('click', handleWrapperClick)
		window.addEventListener('keydown', handleEscapePress)

		return () => {
			window.removeEventListener('click', handleWrapperClick)
			window.removeEventListener('keydown', handleEscapePress)
		}
	}, [setState])
	return (
		<div ref={rootRef}>
			<span
				onClick={() => setState(!state)}
				className={cn('select-none cursor-pointer')}
			>
				{email}
			</span>
			{state && (
				<div
					className={cn(
						'absolute z-50 flex flex-col rounded shadow-xl top-8 bg-light dark:bg-dark-foreground transition-all duration-200'
					)}
				>
					{children}
				</div>
			)}
		</div>
	)
}
