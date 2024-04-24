import { cn } from '@/lib/utils'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination'

function PaginationSection({
	totalPages,
	currentPage,
	handlePrevious,
	handleNext,
	handlePageClick,
}: {
	totalPages: number
	currentPage: number
	handlePrevious: () => void
	handleNext: () => void
	handlePageClick: (page: number) => void
}) {
	const pagesToShowBeforeCurrent = 1
	const pagesToShowAfterCurrent = 2
	const pagesToShowBeforeEllipsis = 3

	const visiblePages = []

	if (currentPage !== 1) {
		visiblePages.push(1)
	}

	if (currentPage > pagesToShowBeforeEllipsis) {
		visiblePages.push(null)
	}

	for (let i = currentPage - pagesToShowBeforeCurrent; i < currentPage; i++) {
		if (i > 1) {
			visiblePages.push(i)
		}
	}

	visiblePages.push(currentPage)

	for (
		let i = currentPage + 1;
		i <= currentPage + pagesToShowAfterCurrent;
		i++
	) {
		if (i < totalPages) {
			visiblePages.push(i)
		}
	}

	if (currentPage < totalPages - pagesToShowBeforeEllipsis) {
		visiblePages.push(null)
	}

	if (totalPages > 1 && currentPage !== totalPages) {
		visiblePages.push(totalPages)
	}
	return (
		<Pagination className='max-w-screen'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={cn('cursor-pointer text-xs lg:text-[14px]', [
							{ 'cursor-not-allowed opacity-50': currentPage <= 1 },
						])}
						onClick={handlePrevious}
					/>
				</PaginationItem>

				{visiblePages.map((page, index) => (
					<PaginationItem key={index}>
						{page === null ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								className='cursor-pointer text-xs lg:text-[14px]'
								isActive={page === currentPage}
								onClick={() => handlePageClick(page)}
							>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						className={cn('cursor-pointer text-xs lg:text-[14px]', [
							{
								'cursor-not-allowed opacity-50': currentPage >= totalPages,
							},
						])}
						onClick={handleNext}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export default PaginationSection
