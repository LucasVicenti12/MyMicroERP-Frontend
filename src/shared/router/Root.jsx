import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "../../core/auth/page/LoginPage.jsx";
import {AuthProvider} from "../../core/auth/implementation/AuthProvider.jsx";
import {MainPage} from "../pages/MainPage.jsx";
import {Client} from "../../modules/client/page/Client.jsx";

export const Root = () => {
    return (
        <BrowserRouter basename={"/erp"}>
            <Routes>
                <Route path={"/web"}>
                    <Route path={"/web/login"}
                           element={
                               <AuthProvider>
                                   <LoginPage/>
                               </AuthProvider>
                           }
                    />
                    <Route path={"/web/"}
                           element={
                               <AuthProvider>
                                   <MainPage/>
                               </AuthProvider>
                           }
                    >
                        <Route path={"client"} element={<Client/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}