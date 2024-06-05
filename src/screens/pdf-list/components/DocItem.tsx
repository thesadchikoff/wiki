import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/router/routes'
import { formatBytesToMB } from '@/utils/formatToMb'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
const DocItem = (doc: Doc) => {
	const navigate = useNavigate()
	return (
		<Card
			className='w-full h-[150px] flex flex-col justify-between cursor-pointer'
			onClick={() => navigate(ROUTES.PDF_VIEW + doc.id)}
		>
			<CardHeader className='flex flex-row items-center justify-between '>
				<CardTitle>{doc.fileName}</CardTitle>
				<BsFileEarmarkPdfFill className='w-[24px] h-[24px] text-brand' />
			</CardHeader>
			<CardFooter className='flex items-center justify-between'>
				<span className='text-xs font-semibold opacity-80'>
					{doc.author.email}
				</span>
				<span className='text-xs font-bold'>{formatBytesToMB(doc.size)}</span>
			</CardFooter>
		</Card>
	)
}

export default DocItem
