import { Button, Input } from '@/components/ui'
import { useSignIn } from '@/hooks/auth/useSignIn'
import { cn } from '@/utils/classnames'
import { useForm } from 'react-hook-form'

export const SignIn = () => {
	const signInFormData = useForm<AuthData>({
		mode: 'onChange',
	})
	const { mutate, isPending, context } = useSignIn()
	const signInSubmit = signInFormData.handleSubmit(({ email, password }) => {
		mutate({ email, password })
		console.log(context)
	})
	return (
		<form
			className={cn('flex flex-col gap-3 w-full h-full justify-between')}
			onSubmit={signInSubmit}
		>
			<div className='flex flex-col gap-10'>
				<Input
					placeholder='Почта'
					{...signInFormData.register('email', {
						required: {
							value: true,
							message: 'Поле обязательно к заполнению',
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Почта указана некорректно',
						},
					})}
					{...(signInFormData.formState.errors.email && {
						error: !!signInFormData.formState.errors.email.message,
						helperText: signInFormData.formState.errors.email.message,
					})}
				/>
				<Input
					placeholder='Пароль'
					{...signInFormData.register('password', {
						required: {
							value: true,
							message: 'Поле обязательно к заполнению',
						},
					})}
					{...(signInFormData.formState.errors.password && {
						error: !!signInFormData.formState.errors.password.message,
						helperText: signInFormData.formState.errors.password.message,
					})}
				/>
			</div>
			<Button
				onClick={signInSubmit}
				title='Войти'
				disabled={
					(signInFormData.formState.isDirty &&
						!signInFormData.formState.isValid) ||
					isPending
				}
			/>
		</form>
	)
}
