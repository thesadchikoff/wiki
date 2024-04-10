import { ResponseNote } from '@/@types/note'

export const isEdited = (note: ResponseNote) => {
	return note.createdAt !== note.updatedAt
}
