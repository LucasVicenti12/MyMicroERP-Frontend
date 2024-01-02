import {createContext, useEffect, useState} from "react";
import {clientUsecase} from "../usecase/ClientUsecase.js";

export const ClientContext = createContext();

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({children}) => {
    const [clientList, setClientList] = useState([]);
    const [vipTypeList, setVipTypeList] = useState([]);
    const [change, setChange] = useState(false);

    const getClientList = async () => {
        return clientUsecase.getClientList();
    }
    const getVipTypeList = async () => {
        return clientUsecase.getAllVipType();
    }
    const handleGetDocumentTypeList = async () => {
        return clientUsecase.getAllDocumentType();
    }

    const handleRegisterClient = (client) => {
        const saveClient = () => {
            return clientUsecase.saveClient(client)
        }
        saveClient().then((response) => {
            if (response.error === null) {
                setChange(!change)
            }
        })
    }
    const handleGetClientByCode = async (code) => {
        return clientUsecase.getClientByCode(code);
    }

    useEffect(() => {
        getClientList().then((response) => {
            if (response.error === null) {
                setClientList(response.clients);
            }
        })
        getVipTypeList().then((response) => {
            if (response.error === null) {
                setVipTypeList(response.vipTypes);
            }
        })
    }, [change]);

    return (
        <ClientContext.Provider
            value={{
                handleRegisterClient,
                handleGetClientByCode,
                handleGetDocumentTypeList,
                vipTypeList,
                clientList
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}