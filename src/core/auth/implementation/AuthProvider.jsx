import {createContext, useState} from "react";
import {authUsecase} from "../usecase/AuthUsecase.js";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState("");
    const navigate = useNavigate()

    const handleLogin = (login, password) => {
        const loginRequest = async () => {
            return authUsecase.login(login, password);
        }
        loginRequest().then((response) => {
            if (response.token !== null) {
                setToken(response.token);
                navigate("/web/client")
            } else {
                setToken("");
            }
        })
    }

    const handleLogout = () => {
        const logoutRequest = async () => {
            return authUsecase.logout()
        }
        logoutRequest()
            .then(() => {
                setToken("")
                navigate("/web/login")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <AuthContext.Provider value={{handleLogin, handleLogout, token}}>
            {children}
        </AuthContext.Provider>
    )
}