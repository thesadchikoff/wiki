import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar'
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
		<Menubar ref={rootRef}>
			<MenubarMenu>
				<MenubarTrigger
					onClick={() => setState(!state)}
					className={cn('select-none cursor-pointer')}
				>
					{email}
				</MenubarTrigger>
				{state && (
					<MenubarContent
						className={cn(
							' z-50 flex flex-col gap-2 rounded shadow-xl  bg-light dark:bg-dark-foreground transition-all duration-200'
						)}
					>
						{children}
					</MenubarContent>
				)}
			</MenubarMenu>
		</Menubar>
	)
}
