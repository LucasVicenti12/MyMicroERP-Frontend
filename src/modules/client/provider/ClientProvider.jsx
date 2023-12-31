import {createContext, useEffect, useState} from "react";
import {clientUsecase} from "../usecase/ClientUsecase.js";

export const ClientContext = createContext();

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({children}) => {
    const [clientList, setClientList] = useState([]);

    const getClientList = async () => {
        return clientUsecase.getClientList();
    }

    useEffect(() => {
        getClientList().then((response) => {
            console.log(response)
            if (response.error === null) {
                setClientList(response.clients);
            }
        })
    }, []);

    return (
        <ClientContext.Provider value={{clientList}}>
            {children}
        </ClientContext.Provider>
    )
}