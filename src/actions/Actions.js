export const LoginUser = (dispatch, payloadLogin) => {
    const userData = {
        email: payloadLogin.email
    }
    const userPass = {
        password: payloadLogin.password,
    }
    if (userData.email === 'pulu@index.co' && userPass.password === '12345') {
        // console.log(payloadLogin.email, "ini payload login")
        dispatch({
            type: 'SUCCESS_LOGIN',
            payload: userData,
        })
        localStorage.setItem('user', JSON.stringify(userData))
        // console.log(userData, "ini payload login JUGA")

        return userData
    }
}
//^ itu di atas semua action, isinya type dan payload
export const LogoutUser = (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    })
    localStorage.setItem('user', JSON.stringify(''))
    localStorage.setItem('cart', JSON.stringify(''))
}

export const AddCart = (dispatch, payloadCart) => {
    // console.log(payloadCart, "ini Add Cart ACtion");
    dispatch({
        type: 'ADD_CART',
        cart: payloadCart
        // cart: {
        //     name: payloadCart.name,
        //     quantity: payloadCart.quantity
        // }
    })
    // console.log(payloadCart, "ini Add Cart setelah ACtion");

    localStorage.setItem('cart', JSON.stringify(payloadCart))

    // console.log(payloproductdCart, "ini setelah set");
    return payloadCart
}