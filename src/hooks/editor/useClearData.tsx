interface ClearData {
	setStateContent: React.Dispatch<React.SetStateAction<string>>
	setStateTitle: React.Dispatch<React.SetStateAction<string>>
	localStorageKey: string
}
export const useClearData = ({
	localStorageKey,
	setStateContent,
	setStateTitle,
}: ClearData) => {
	const clear = () => {
		setStateContent('')
		setStateTitle('')
		localStorage.removeItem(localStorageKey)
	}
	return {
		clear,
	}
}
