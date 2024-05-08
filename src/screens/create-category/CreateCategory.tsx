import { Button, Input } from '@/components'
import { QUERIES } from '@/constants/query.constants'
import { useTheme } from '@/context/theme/ThemeProvider'

import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import { cn } from '@/utils/classnames'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuImagePlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const CreateCategory = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [fileData, setFile] = useState<string | Blob | null>(null)
	const { theme } = useTheme()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationKey: [QUERIES.CREATE_CATEGORY],
		mutationFn: categoryService.createCategory,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_CATEGORIES] })
			toast.success('Категория успешно создана')
			return navigate(ROUTES.CATEGORIES)
		},
		onError(error) {
			console.error(error)
			toast.error('Ошибка создания категории')
		},
	})
	const createCategoryFrom = useForm<CreateCategory>({
		mode: 'onChange',
	})
	const createCategory = createCategoryFrom.handleSubmit(({ title }) => {
		console.log(fileData)
		if (fileData) {
			const formData = new FormData()
			formData.append('title', title)
			if (fileData) formData.append('category_icon', fileData)
			mutate(formData)
			setPreviewUrl(null)
			setFile(null)
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
			// Добавить редирект
		}
	})
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const fileName = file.name.toLowerCase()
			if (/\.(jpg|jpeg|png)$/.test(fileName)) {
				const fileUrl = URL.createObjectURL(file)
				setPreviewUrl(fileUrl)
				setFile(file)
			} else {
				toast.warning(
					'Пожалуйста, выберите изображение в форматах PNG, JPG или JPEG.'
				)
				// Сбросить значение инпута
				if (fileInputRef.current) {
					fileInputRef.current.value = ''
				}
			}
		}
	}

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}
	return (
		<div className='flex flex-col h-full p-10'>
			<div className='container flex flex-col h-full gap-10 p-5 m-auto border rounded bg-light dark:bg-dark-foreground dark:border-dark'>
				<h1 className='text-2xl font-medium'>Создание категории</h1>
				<div className='flex flex-col flex-1 gap-16'>
					<div className='flex flex-col gap-5'>
						{previewUrl ? (
							<img
								src={previewUrl}
								alt=''
								className='w-[100px] h-[100px] rounded-full cursor-pointer object-cover border dark:border-dark'
								onClick={handleClick}
							/>
						) : (
							<div
								style={{
									background: `linear-gradient(${
										theme === 'dark'
											? '225.00deg, rgb(97, 96, 96) 0%,rgb(32, 32, 32) 100%'
											: '225.00deg, rgb(242, 242, 242) 0%,rgb(197, 197, 197) 100%'
									})`,
								}}
								className={cn(
									'w-[100px] h-[100px] border flex items-center justify-center flex-col rounded-full cursor-pointer',
									{
										'border-dark': theme === 'dark',
									}
								)}
								onClick={handleClick}
							>
								<LuImagePlus className='text-3xl' />
							</div>
						)}
						<input
							type='file'
							className='hidden'
							ref={fileInputRef}
							// @ts-ignore
							onClick={handleFileChange}
						/>
						<span>Выберите иконку для категории</span>
					</div>
					<Input
						title='Название категории'
						placeholder='Название категории'
						{...createCategoryFrom.register('title', {
							required: {
								value: true,
								message: 'Поле обязательно к заполнению',
							},
						})}
						{...(createCategoryFrom.formState.errors.title && {
							error: !!createCategoryFrom.formState.errors.title.message,
							helperText: createCategoryFrom.formState.errors.title.message,
						})}
					/>
				</div>
				<Button onClick={createCategory} variant={'outline'}>
					Создать
				</Button>
			</div>
		</div>
	)
}
