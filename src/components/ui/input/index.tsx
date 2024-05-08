import { cn } from '@/utils/classnames'
import { forwardRef } from 'react'

export interface InputProps extends React.ComponentProps<'input'> {
	label?: string
	helperText?: string
	error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, helperText, error, className, type, ...nativeProps }, ref) => {
		return (
			<div className={cn('flex flex-col gap-2')}>
				{label && <p className='mb-1.5 text-sm'>{label}</p>}
				<input
					ref={ref}
					type={type}
					{...nativeProps}
					className={cn(
						'flex h-[50px] w-full border dark:border-dark rounded bg-light  dark:bg-dark outline-none dark:focus:border-dark-active focus:border-dark-active px-4'
					)}
				/>
				{helperText && (
					<p
						className={cn(
							'flex-grow-0 text-sm text-tertiary',
							error && '!text-error'
						)}
					>
						{helperText}
					</p>
				)}
			</div>
		)
	}
)
