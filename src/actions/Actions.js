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
    const status = 'Anda berhasil logout'
    dispatch({
        type: 'LOGOUT',

    })
    localStorage.setItem('user', JSON.stringify(status))
}