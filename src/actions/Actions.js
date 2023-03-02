export const LoginUser = (dispatch, payloadLogin) =>{
    const userData={
        email: payloadLogin.email,
        isLogin: payloadLogin.isLogin
    }
    if(userData.email === 'pulu@index.co' && userData.password === '12345'){
        dispatch({
            type: 'SUCCESS_LOGIN',
            payload: userData,
        })
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
    }
}
//^ itu di atas semua action, isinya type dan payload
export const LogoutUser = (dispatch) =>{
    const status = 'Anda berhasil logout'
    dispatch({
        type: 'LOGOUT',
 
    })
    localStorage.setItem('user', JSON.stringify(status))
}