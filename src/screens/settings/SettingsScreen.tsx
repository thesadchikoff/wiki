import { Input } from '@/components'
import { Button } from '@/components/ui/button'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { cn } from '@/lib/utils'
import userService from '@/services/user/user.service'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
interface ChangePasswordForm {
	oldPassword: string
	newPassword: string
}
const SettingsScreen = () => {
	const changePasswordForm = useForm<ChangePasswordForm>({ mode: 'onChange' })
	const { user } = useUser()
	const { mutate } = useMutation({
		mutationFn: userService.changePassword,
		mutationKey: [QUERIES.CHANGE_USER_PASSWORD],
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data ? error.response.data.message : error.message
			)
		},
	})
	const handlePasswordChange = changePasswordForm.handleSubmit(data => {
		mutate(data)
	})
	return (
		<div
			className={cn('flex-1 flex flex-col  gap-5 lg:gap-10  overflow-hidden')}
		>
			<h1 className={cn('text-xl p-0 m-0 w-full lg:text-2xl')}>
				Настройки профиля {user!.email}
			</h1>
			<section className='z-10 flex-1 p-5 bg-white shadow lg:p-10 rounded-xl dark:bg-foreground'>
				<fieldset className='flex flex-col w-full gap-10 lg:w-1/3'>
					<span className='text-xl font-semibold'>Смена пароля</span>
					<form className='flex flex-col gap-5' onSubmit={handlePasswordChange}>
						<Input
							label='Старый пароль'
							{...changePasswordForm.register('oldPassword', {
								required: {
									value: true,
									message: 'Поле обязательно к заполнению',
								},
							})}
							{...(changePasswordForm.formState.errors.oldPassword && {
								error:
									!!changePasswordForm.formState.errors.oldPassword.message,
								helperText:
									changePasswordForm.formState.errors.oldPassword.message,
							})}
							id='old-password'
							type='password'
							placeholder='Укажите старый пароль'
						/>
						<Input
							label='Новый пароль'
							{...changePasswordForm.register('newPassword', {
								required: {
									value: true,
									message: 'Поле обязательно к заполнению',
								},
							})}
							{...(changePasswordForm.formState.errors.newPassword && {
								error:
									!!changePasswordForm.formState.errors.newPassword.message,
								helperText:
									changePasswordForm.formState.errors.newPassword.message,
							})}
							id='new-password'
							type='password'
							placeholder='Укажите новый пароль'
						/>
					</form>
					<Button size={'lg'} onClick={handlePasswordChange}>
						Сохранить
					</Button>
				</fieldset>
			</section>
		</div>
	)
}

export default SettingsScreen
