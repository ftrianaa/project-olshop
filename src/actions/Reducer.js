let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : ""

export const initialState = {
    user: '' || user,
    isLogin: false,
    cart: "" || cart

}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "SUCCESS_LOGIN":
            return {
                ...initialState,
                user: action,
                isLogin: true
            }
        case "LOGOUT":
            return {
                user:'',
                isLogin:false,
                cart:''
            }
        case "ADD_CART":
            return{
                ...initialState,
                cart: action,
            }
        default:
            return {
                user:'',
                isLogin:false,
                cart:''
            }
    }
}