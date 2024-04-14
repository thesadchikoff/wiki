import { Button } from '@/components'
import { useTheme } from '@/hooks/useTheme'
import { ROUTES } from '@/router/routes'
import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const COLORS = [
	'#13FFAA',
	'#1E67C6',
	'#CE84CF',
	'#DD335C',
	'#FF4444',
	'#FFD844',
]

export const HomeScreen = () => {
	const { theme } = useTheme()
	const navigate = useNavigate()
	const color = useMotionValue(COLORS[0])
	const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, ${
		theme === 'dark' ? '#000' : '#fff'
	} 50%, ${color})`
	useEffect(() => {
		animate(color, COLORS, {
			ease: 'easeInOut',
			duration: 10,
			repeat: Infinity,
			repeatType: 'mirror',
		})
	}, [])
	return (
		<motion.section
			style={{ backgroundImage }}
			className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-5'
		>
			<div className='flex flex-col items-center gap-10'>
				<h1 className='w-full text-2xl font-bold text-center lg:w-2/3 xl:text-6xl lg:text-4xl'>
					Добро пожаловать в базу знаний – ваш личный оазис информации!{' '}
				</h1>
				<p className='w-full text-center opacity-50 lg:w-1/2'>
					Здесь вы найдете все необходимое для организации, хранения и обмена
					знаниями. Наш функционал, вдохновленный концепцией вики, предоставляет
					вам возможность создавать, редактировать и совместно использовать
					содержание в удобном формате.{' '}
				</p>
				<div className='flex flex-col items-center gap-10 lg:flex-row'>
					<Button
						variant={'ghost'}
						className='w-full px-10 border rounded lg:w-max backdrop-blur-sm bg-white/20 dark:border-dark'
						onClick={() => navigate(ROUTES.CATEGORIES)}
					>
						Начать
					</Button>
				</div>
			</div>
		</motion.section>
	)
}
