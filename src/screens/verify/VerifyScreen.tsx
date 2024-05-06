import { Button } from '@/components'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import userService from '@/services/user/user.service'
import { decodeBase64 } from '@/utils/decodeBase64'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const VerifyScreen = () => {
	const params = useParams()
	const navigate = useNavigate()
	const [verifyCode, setVerifyCode] = useState('')
	const { mutate } = useMutation({
		mutationKey: [QUERIES.CHECK_VERIFY],
		mutationFn: userService.verifyCheck,
		onSuccess(data) {
			navigate(ROUTES.AUTH)
			toast.success(data.message.title, {
				description: data.message.description,
			})
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data ? error?.response?.data.message : error.message
			)
		},
	})
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate(verifyCode)
	}
	useEffect(() => {
		setVerifyCode(decodeBase64(params.code!))
	}, [])
	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<div className='flex flex-col gap-5 p-5 rounded shadow dark:bg-dark-foreground w-96 bg-light'>
				<h1 className='text-lg font-medium'>Подтверждение почты</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col items-center justify-center gap-3'
				>
					{/* <Input
						value={verifyCode}
						placeholder='Укажите код'
						onChange={event => setVerifyCode(event.target.value)}
					/> */}
					<InputOTP
						maxLength={6}
						value={verifyCode}
						onChange={value => setVerifyCode(value)}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					{/* @ts-ignore */}
					<Button className='w-full' onClick={handleSubmit}>
						Подтвердить
					</Button>
				</form>
			</div>
		</div>
	)
}

export default VerifyScreen
