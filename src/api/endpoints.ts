export const enum BACKEND_ENDPOINTS {
	SIGN_IN = '/auth/sign-in',
	SIGN_UP = '/auth/sign-up',
	CHANGE_USER_PASSWORD = '/auth/change-pass',
	VERIFY = 'users/verify',
	VERIFY_CHECK = 'users/verify-check/',
	PROFILE = '/auth/profile',
	LOGOUT = '/auth/logout',
	CREATE_NOTE = '/notes',
	GET_NOTE = '/notes/one/',
	GET_NOTES = '/notes',
	UPDATE_NOTE = '/notes/',
	DELETE_NOTE = '/notes/',
	CATEGORIES = '/categories',
	ADD_CATEGORIES = '/categories',
	GET_CATEGORY = '/categories/',
	SEARCH_NOTES = '/notes/search/',
	MOD_CATEGORY = '/categories/moderation',
	MOD_NOTES = '/notes/moderation/',
	MOD_ACCEPT_NOTE = '/notes/accept-or-decline',
	TOGGLE_ACTUAL_NOTE = '/notes/toggle-actual-note/',
	USEFUL_NOTE = GET_NOTES + '/useful/',
	DIS_USEFUL_NOTE = GET_NOTES + '/dis-useful/',
	NOTE_PINNED_TOGGLE = GET_NOTES + '/note-pinned-toggle/',
}
