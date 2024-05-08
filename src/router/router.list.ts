import { AuthScreen, HomeScreen } from '@/screens'
import { CategoriesScreen } from '@/screens/categories/CategoriesScreen'
import { CreateCategory } from '@/screens/create-category/CreateCategory'
import { CreateNoteScreen } from '@/screens/create-note/CreateNoteScreen'
import { FullNote } from '@/screens/full-note/FullNote'
import { AcceptOrDeclineScreen } from '@/screens/moders-screens/accept-or-decline-screen/AcceptOrDeclineScreen'
import { ModPanel } from '@/screens/moders-screens/mod-panel/ModPanel'
import NotFound from '@/screens/not-found/NotFound'
import { NoteListScreen } from '@/screens/note-list/NoteListScreen'
import SettingsScreen from '@/screens/settings/SettingsScreen'
import VerifyScreen from '@/screens/verify/VerifyScreen'
import { ROUTES } from './routes'

export const routerList = [
	{
		path: ROUTES.HOME,
		component: HomeScreen,
		isProtected: true,
	},
	{
		path: ROUTES.CATEGORY + ':id' + ROUTES.CREATE_NOTE,
		component: CreateNoteScreen,
		isProtected: true,
	},
	{
		path: ROUTES.CATEGORY + ':id',
		component: NoteListScreen,
		isProtected: true,
	},
	{
		path: `${ROUTES.CATEGORY}:id/note/:id`,
		component: FullNote,
		isProtected: true,
	},
	{
		path: ROUTES.CATEGORIES,
		component: CategoriesScreen,
		isProtected: true,
	},
	{
		path: ROUTES.CREATE_CATEGORY,
		component: CreateCategory,
		isAdmin: true,
	},
	{
		path: ROUTES.MOD_PANEL,
		component: ModPanel,
		isMod: true,
	},
	{
		path: `${ROUTES.MOD_ACCEPT_NOTES}:id`,
		component: AcceptOrDeclineScreen,
		isMod: true,
	},
	{
		path: ROUTES.SETTINGS,
		component: SettingsScreen,
		isProtected: true,
	},
	{
		path: ROUTES.AUTH,
		component: AuthScreen,
		isProtected: false,
		isAdmin: false,
	},
	{
		path: ROUTES.VERIFY + ':code',
		component: VerifyScreen,
		isProtected: false,
		isAdmin: false,
	},
	{
		path: '*',
		component: NotFound,
		isProtected: false,
		isAdmin: false,
	},
]
