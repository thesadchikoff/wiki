import { Button } from '@/components'
import { Input } from '@/components/ui/input'
import { useSignUp } from '@/hooks/auth/useSignUp'
import { cn } from '@/utils/classnames'
import { useForm } from 'react-hook-form'

export const SignUp = () => {
	const signUpFormData = useForm<AuthData>({
		mode: 'onChange',
	})
	const { mutate, isPending, context } = useSignUp()
	const signUpSubmit = signUpFormData.handleSubmit(({ email, password }) => {
		mutate({ email, password })
		console.log(context)
	})
	return (
		<form
			onSubmit={signUpSubmit}
			className={cn('flex flex-col gap-3 w-full h-full justify-between')}
		>
			{/* <div className='flex flex-col gap-10'> */}
			<Input
				placeholder='Почта'
				{...signUpFormData.register('email', {
					required: {
						value: true,
						message: 'Поле обязательно к заполнению',
					},
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Почта указана некорректно',
					},
				})}
				{...(signUpFormData.formState.errors.email && {
					error: !!signUpFormData.formState.errors.email.message,
					helperText: signUpFormData.formState.errors.email.message,
				})}
			/>
			<Input
				placeholder='Пароль'
				{...signUpFormData.register('password', {
					required: {
						value: true,
						message: 'Поле обязательно к заполнению',
					},
				})}
				{...(signUpFormData.formState.errors.password && {
					error: !!signUpFormData.formState.errors.password.message,
					helperText: signUpFormData.formState.errors.password.message,
				})}
			/>
			{/* </div> */}
			<Button
				onClick={signUpSubmit}
				title='Регистрация'
				disabled={
					(signUpFormData.formState.isDirty &&
						!signUpFormData.formState.isValid) ||
					isPending
				}
			/>
		</form>
	)
}
