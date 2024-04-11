import { ResponseNote } from './note'

type ModeratorAction = {
	noteId: string
	type: 'ACCEPT' | 'UNACCEPT'
}

type ResponseModeratorCategory = {
	notes: ResponseNote[]
} & CategoryResponse

type ResponseModeratorNotes = {
	category: CategoryResponse
	notes: ResponseNote[]
}
export enum MODERATOR_ACTION {
	ACCEPT = 'ACCEPT',
	UNACCEPT = 'UNACCEPT',
}

export class NoteModeratorAction {
	noteId: string
	type: MODERATOR_ACTION
}
