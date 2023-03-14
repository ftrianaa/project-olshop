import { createContext, useContext, useReducer } from "react";
import { AuthReducer, initialState } from "./Reducer";

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const AuthCartState = createContext()
const AuthCartDispatch = createContext()

export const useAuthState = () => {
    return useContext(AuthStateContext)}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext)

    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within AuthProvider')
    }

    return context
}

export const useCartState = () => {
    const context = useContext(AuthCartState)
    if(context === undefined){
        throw new Error('useCartState must be used within AuthCartProvider')
    }
    return context
}

export const useCartDispatch = () =>{
    const context = useContext(AuthCartDispatch)
    if(context === undefined){
        throw new Error('useCartDispatch must be used within AuthCartProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState)
    // console.log(user, 'ini user di context')
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const AuthCartProvider = ({children}) =>{
    const [cart, dispatch] = useReducer(AuthReducer, initialState)
    // console.log(cart, 'ini cart di context')
    return(
        <AuthCartState.Provider value={cart}>
            <AuthCartDispatch.Provider value={dispatch}>
                {children}
            </AuthCartDispatch.Provider>
        </AuthCartState.Provider>
    )
}