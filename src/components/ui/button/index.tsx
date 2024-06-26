import { cn } from '@/utils/classnames'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	size?: 'xs' | 'md' | 'lg' | 'xl'
	variant?: 'primary' | 'danger' | 'ghost' | 'danger-light' | 'primary-light'
	icon?: React.ReactNode
	fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			title,
			type = 'button',
			disabled,
			size = 'md',
			variant = 'primary',
			icon,
			fullWidth,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				{...props}
				type={type}
				disabled={disabled}
				className={cn(
					'outline-none  rounded-xl disabled:bg-opacity-10 disabled:text-opacity-20 flex items-center gap-3 justify-center',
					{
						'bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed':
							variant === 'primary',
					},
					{
						'bg-primary bg-opacity-30 hover:bg-opacity-100 hover:text-white  transition-colors duration-150 text-primary hover:bg-primary-hover active:bg-primary-pressed':
							variant === 'primary-light',
					},
					{
						'bg-danger hover:bg-danger-hover active:bg-danger-pressed disabled:bg-danger-disabled disabled:text-danger-disabled ':
							variant === 'danger',
					},
					{
						'bg-danger/20 hover:bg-danger-hover active:bg-danger-pressed disabled:bg-danger-disabled disabled:text-danger-disabled text-danger-disabled hover:bg-danger hover:text-white transition-colors duration-150':
							variant === 'danger-light',
					},
					{
						'bg-transparent hover:bg-brand hover:bg-opacity-10 active:bg-primary-800 active:bg-opacity-30 text-brand disabled:bg-transparent':
							variant === 'ghost',
					},
					{
						'px-4 py-2 text-xs font-medium': size === 'xs',
					},
					{
						'px-10 py-3': size === 'md',
					},
					{
						'px-2 py-5 text-lg': size === 'lg',
					},
					{
						'px-3 py-4 text-lg': size === 'xl',
					},
					{
						'w-full': fullWidth,
					},
					className
				)}
			>
				{icon && icon}
				{title}
			</button>
		)
	}
)
