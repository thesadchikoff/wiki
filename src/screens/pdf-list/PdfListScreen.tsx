import { BackLink } from '@/components/back-link/BackLink'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import docsService from '@/services/docs/docs.service'
import { cn } from '@/utils/classnames'
import { formatBytesToMB } from '@/utils/formatToMb'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, DragEventHandler, useRef, useState } from 'react'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { FaFileImport } from 'react-icons/fa6'
import { toast } from 'sonner'
import DocsList from './components/DocsList'

const PdfListScreen = () => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [fileData, setFile] = useState<string | Blob | null>(null)
	const fileRef = useRef<HTMLInputElement>(null)
	const [isSmall, setIsSmall] = useState(false)
	const [dragActive, setDragActive] = useState(false)
	const clickFileInput = () => {
		console.log(fileRef)
		fileRef.current?.click()
	}

	function handleFile() {
		const formData = new FormData()
		if (fileData) {
			formData.append('file', fileData)
			docsMutation.mutate(formData)
			setFile(null)
			setPreviewUrl(null)
		}
	}
	const handleDrag: DragEventHandler<HTMLDivElement> = function (e) {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			console.log('darg enter')
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			console.log('darg leave')
			setDragActive(false)
		}
	}
	const handleDrop: React.DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		const file = e.dataTransfer.files[0]
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			if (file.type !== 'application/pdf')
				return toast.warning('Невозможно загрузить файл', {
					description: 'Файл должен быть формата PDF',
				})
			setIsSmall(true)
			const fileUrl = URL.createObjectURL(file)
			setPreviewUrl(fileUrl)
			setFile(file)
		}
	}

	const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault()
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files?.[0]
			if (file.type !== 'application/pdf') {
				toast.warning('Невозможно загрузить файл', {
					description: 'Файл должен быть формата PDF',
				})
				if (fileRef.current) {
					fileRef.current.value = ''
				}
				return
			}
			setIsSmall(true)
			const fileUrl = URL.createObjectURL(file)
			setPreviewUrl(fileUrl)
			setFile(file)
		}
	}

	const onClose = () => {
		setFile(null)
		setPreviewUrl(null)
	}
	const queryClient = useQueryClient()
	const docsMutation = useMutation({
		mutationKey: [QUERIES.DOC_CREATE],
		mutationFn: docsService.create,
		onSuccess(data) {
			toast.success(data.message.title, {
				description: data.message.description,
			})
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_DOCS] })
		},
		onError(error) {
			// @ts-ignore
			toast.error(error?.message ? error.message : error?.response.data.message)
		},
	})

	return (
		<Drawer>
			<div className='flex flex-col w-full gap-10 prose-h1:prose-2xl'>
				<BackLink title='Назад' url={ROUTES.CATEGORIES} />
				<div className='flex items-center justify-between'>
					<span className='text-lg lg:text-2xl'>PDF Хранилище</span>
					<div className='flex items-center gap-5'>
						<DrawerTrigger>
							<Button>Добавить документ</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Добавление документа</DrawerTitle>
								<DrawerDescription>
									Поместите в центр файл формата PDF.
								</DrawerDescription>
							</DrawerHeader>
							<Card className='border-0 shadow-none'>
								<CardContent className='p-6 space-y-4'>
									<div className='flex items-center justify-center'>
										{!fileData ? (
											<div
												onDragEnter={handleDrag}
												onDragOver={handleDrag}
												onDragLeave={handleDrag}
												onDrop={handleDrop}
												className={cn(
													'flex flex-col items-center gap-1 p-6 border-2  rounded-lg cursor-pointer w-full',
													[
														{
															'border-solid border-brand': dragActive,
															'border-gray-200 border-dashed dark:border-dark':
																!dragActive,
														},
													]
												)}
												onClick={clickFileInput}
											>
												<FaFileImport className='w-12 h-12 text-brand' />
												<span className='text-sm font-medium text-center text-gray-500'>
													Переместите файл или кликните по форме
												</span>
												<span className='text-xs text-center text-gray-500'>
													Принимаются только PDF файлы
												</span>
											</div>
										) : (
											<a
												href={previewUrl!}
												target='_blank'
												className={cn(
													'flex flex-col items-center border-solid border-brand gap-1 p-6 border-2  rounded-lg w-full transition-all duration-300',
													[
														{
															'w-full lg:w-1/4': isSmall,
														},
													]
												)}
											>
												<BsFileEarmarkPdfFill className='w-12 h-12 text-brand' />
												<span className='text-sm text-center text-gray-500'>
													{/* @ts-ignore */}
													{fileData?.name}
												</span>
												<span className='text-xs font-bold text-center text-gray-500'>
													{/* @ts-ignore */}
													{formatBytesToMB(fileData?.size)}
												</span>
											</a>
										)}
									</div>
									<div className='space-y-2 text-sm'>
										<input
											type='file'
											ref={fileRef}
											onChange={handleChange}
											className='hidden'
										/>
									</div>
								</CardContent>
								<CardFooter></CardFooter>
							</Card>
							<DrawerFooter className='gap-10'>
								<div className='w-full'>
									<p className='text-xs text-center opacity-50'>
										При загрузке документа он отправится на проверку
										модераторам, по итогам которой документ либо попадет в общую
										ленту, либо будет удален.
									</p>
								</div>

								<DrawerClose className='flex flex-col gap-5'>
									{fileData && (
										<Button onClick={handleFile} className='w-full'>
											Загрузить
										</Button>
									)}
									<Button
										variant='outline'
										onClick={onClose}
										className='w-full'
									>
										Отмена
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</div>
				</div>

				<div className='flex w-full'>
					<DocsList />
				</div>
			</div>
		</Drawer>
	)
}

export default PdfListScreen
