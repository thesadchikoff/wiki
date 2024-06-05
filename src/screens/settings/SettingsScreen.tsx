import { Input } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { cn } from '@/lib/utils'
import userService from '@/services/user/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaTelegram, FaTrash } from 'react-icons/fa6'
import { toast } from 'sonner'
interface ChangePasswordForm {
	oldPassword: string
	newPassword: string
}
const SettingsScreen = () => {
	const queryClient = useQueryClient()
	const connectTelegramNotifyMutation = useMutation({
		mutationKey: [QUERIES.CONNECT_TELEGRAM_NOTIFY],
		mutationFn: userService.connectTelegramNotify,
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
			queryClient.invalidateQueries({ queryKey: [QUERIES.PROFILE] })
		},
		onError(error) {
			toast.error(error.message)
		},
	})
	const disconnectTelegramNotifyMutation = useMutation({
		mutationKey: [QUERIES.DISCONNECT_TELEGRAM_NOTIFY],
		mutationFn: userService.disconnectTelegramNotify,
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
			queryClient.invalidateQueries({ queryKey: [QUERIES.PROFILE] })
		},
		onError(error) {
			toast.error(error.message)
		},
	})
	const toggleTelegramNotifyMutation = useMutation({
		mutationKey: [QUERIES.TOGGLE_TELEGRAM_NOTIFY],
		mutationFn: userService.toggleTelegramNotify,
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
			queryClient.invalidateQueries({ queryKey: [QUERIES.PROFILE] })
		},
		onError(error) {
			toast.error(error.message)
		},
	})
	const toggleEmailNotification = useMutation({
		mutationKey: [QUERIES.TOGGLE_EMAIL_NOTIFICATION],
		mutationFn: userService.toggleEmailNotification,
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
			queryClient.invalidateQueries({ queryKey: [QUERIES.PROFILE] })
		},
		onError(error) {
			toast.error(error.message)
		},
	})
	const changePasswordForm = useForm<ChangePasswordForm>({ mode: 'onChange' })
	const [telegramId, setTelegramId] = useState('')
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
			<section className='z-10 grid flex-1 w-full grid-cols-1 gap-10 p-5 overflow-y-auto bg-white shadow lg:grid-cols-2 lg:p-10 rounded-xl dark:bg-foreground'>
				<fieldset className='flex flex-col w-full gap-10'>
					<span className='text-xl font-semibold'>Смена пароля</span>
					<form className='flex flex-col gap-5' onSubmit={handlePasswordChange}>
						<Input
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
				<fieldset className='flex flex-col w-full gap-10 '>
					<span className='text-xl font-semibold'>Уведомления</span>
					<div className='flex flex-col gap-5'>
						<div className='flex items-center justify-between w-full'>
							<Label htmlFor='email-notification'>Уведомления по почте</Label>
							<Switch
								id='email-notification'
								checked={user?.emailNotification}
								onCheckedChange={() =>
									// @ts-ignore
									toggleEmailNotification.mutate(!user?.emailNotification)
								}
							/>
						</div>
						<div className='flex items-center justify-between w-full'>
							<Label htmlFor='telegram-notification'>
								Уведомления в{' '}
								<article className='inline-block h-4 font-semibold text-transparent bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text'>
									Telegram
								</article>
							</Label>
							{user?.TelegramAccount ? (
								<Switch
									id='telegram-notification'
									checked={user.telegramNotification}
									onCheckedChange={() =>
										toggleTelegramNotifyMutation.mutate(
											// @ts-ignore
											!user?.telegramNotification
										)
									}
								/>
							) : (
								<Popover>
									<PopoverTrigger>
										<HoverBorderGradient
											containerClassName='rounded-full'
											as='button'
											className='flex items-center space-x-2 text-xs text-black bg-white dark:bg-black dark:text-white'
										>
											<span>Подключить</span>
										</HoverBorderGradient>
									</PopoverTrigger>
									<PopoverContent className='m-5 w-80'>
										<div className='grid gap-4'>
											<div className='flex flex-col gap-3'>
												<h4 className='font-medium leading-none'>
													Подключение Telegram аккаунта
												</h4>
												<span className='text-sm text-muted-foreground'>
													Перейдите в бота{' '}
													<a
														href='https://t.me/getmyid_bot'
														className='mr-1.5 text-brand hover:underline'
														target='_blank'
													>
														ID Bot
													</a>
													для того, чтобы узнать ваш telegram ID и укажите его в
													поле ниже
												</span>
												<Input
													onChange={event => setTelegramId(event.target.value)}
													type='number'
													placeholder='Укажите ваш Telegram ID'
												/>
												<Button
													onClick={() =>
														connectTelegramNotifyMutation.mutate({
															telegramId,
														})
													}
													className='flex items-center gap-1'
												>
													<FaTelegram size={16} />
													Connect
												</Button>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							)}
						</div>
						{user?.TelegramAccount && (
							<div className='flex flex-col gap-5'>
								<Label>Подключенный Telegram аккаунт</Label>
								<div className='flex items-center justify-between gap-5 p-2 text-xs font-semibold border rounded lg:p-5 lg:text-[15px]  dark:border-dark'>
									<div className='flex items-center gap-5'>
										<Avatar className='border dark:border-dark'>
											<AvatarImage
												src={user?.TelegramAccount.avatarUrl}
												alt='tg_avatar'
											/>
											<AvatarFallback className='dark:text-neutral-600'>
												{user?.TelegramAccount.username[0]}
											</AvatarFallback>
										</Avatar>
										<span className='opacity-60'>
											@{user?.TelegramAccount.username}
										</span>
									</div>
									<Button
										onClick={() => disconnectTelegramNotifyMutation.mutate()}
										size={'icon'}
									>
										<FaTrash />
									</Button>
								</div>
							</div>
						)}
					</div>
				</fieldset>
			</section>
		</div>
	)
}

export default SettingsScreen
