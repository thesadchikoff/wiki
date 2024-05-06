import { Badge } from '@/components/ui/badge'
type RenderUserBadge = Pick<User, 'isAdmin' | '_count'>
const RenderUserBadge = ({ isAdmin, _count }: RenderUserBadge) => {
	console.log(_count)
	if (isAdmin)
		return (
			<Badge className='text-white bg-red-500'>Администратор платформы</Badge>
		)
	if (_count.moderatedContent > 0)
		return <Badge className='text-white bg-green-500'>Модератор раздела</Badge>
	return <Badge>Пользователь</Badge>
}

export default RenderUserBadge
