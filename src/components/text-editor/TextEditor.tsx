import { Editor, EditorState } from 'draft-js'
import React from 'react'

export const TextEditor = () => {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	)

	return <Editor editorState={editorState} onChange={setEditorState} />
}
