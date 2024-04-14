import { cn } from '@/utils/classnames'
import { useState } from 'react'
import { SignIn, SignUp } from './components'

type Scenario = 'sign-in' | 'sign-up'
export const Auth = () => {
	const [scenario, setScenario] = useState<Scenario>('sign-in')
	return (
		<div
			className={cn(
				'shadow w-full lg:w-[500px] h-[400px] p-5 lg:p-10 flex flex-col gap-5 bg-light dark:bg-dark-foreground text-center rounded'
			)}
		>
			<div className='flex items-center justify-between w-full p-2 rounded bg-light-grey dark:bg-dark'>
				<button
					className={cn('w-1/2 rounded py-1', [
						{
							'bg-grey text-white dark:bg-accent-foreground':
								scenario === 'sign-in',
						},
					])}
					onClick={() => setScenario('sign-in')}
				>
					Авторизация
				</button>
				<button
					className={cn('w-1/2 rounded py-1', [
						{
							'bg-grey text-white dark:bg-accent-foreground':
								scenario === 'sign-up',
						},
					])}
					onClick={() => setScenario('sign-up')}
				>
					Регистрация
				</button>
			</div>
			{scenario === 'sign-up' ? <SignUp /> : <SignIn />}
		</div>
	)
}
