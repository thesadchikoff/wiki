import { Badge } from '@/components/ui/badge'
type RenderUserBadge = Pick<User, 'isAdmin' | '_count'>
const RenderUserBadge = ({ isAdmin, _count }: RenderUserBadge) => {
	console.log(_count)
	if (isAdmin)
		return <Badge variant={'destructive'}>Администратор платформы</Badge>
	if (_count.moderatedContent > 0) return <Badge>Модератор раздела</Badge>
	return <Badge variant={'secondary'}>Пользователь</Badge>
}

export default RenderUserBadge
