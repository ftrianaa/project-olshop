let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

export const initialState = {
    user: '' || user,
    isLogin: false
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "SUCCESS_LOGIN":
            return {
                ...initialState,
                user: action.user,
                isLogin: true
            }
        case "LOGOUT":
            return {
                ...initialState,
                user:action,
                isLogin: false
            }
        default:
            return {
                ...initialState
            }
    }
}