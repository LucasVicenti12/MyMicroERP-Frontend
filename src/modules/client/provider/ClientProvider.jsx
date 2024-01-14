import {createContext, useEffect, useState} from "react";
import {clientUsecase} from "../usecase/ClientUsecase.js";

export const ClientContext = createContext();

const numberPerPages = 10;

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({children}) => {
    const [clientList, setClientList] = useState([]);
    const [vipTypeList, setVipTypeList] = useState([]);
    const [change, setChange] = useState(false);
    const [page, setPage] = useState(0);
    const [pageQuantity, setPageQuantity] = useState(0);
    const [clientQuantity, setClientQuantity] = useState(0);

    const getClientList = async () => {
        return clientUsecase.getClientList(page, numberPerPages);
    }
    const getVipTypeList = async () => {
        return clientUsecase.getAllVipType();
    }
    const handleRegisterVipType = async (vipType) => {
        return clientUsecase.registerVipType(vipType);
    }
    const handleGetDocumentTypeList = async () => {
        return clientUsecase.getAllDocumentType();
    }

    const handleRegisterClient = (client) => {
        return clientUsecase.saveClient(client)
    }
    const handleGetClientByCode = async (code) => {
        return clientUsecase.getClientByCode(code);
    }
    const handleChangePage = (newPage) => {
        setPage(newPage);
        setChange(!change);
    }

    const handleUpdateProvider = () => {
        setChange(!change);
    }

    useEffect(() => {
        getClientList().then((response) => {
            if (response.error === null) {
                setClientList(response.clients.clients);
                setClientQuantity(response.clients.numberRecords)
                if (response.clients.numberRecordsPerPage === numberPerPages) {
                    let quantityPagination = Math
                        .ceil(response.clients.numberRecords / response.clients.numberRecordsPerPage)
                    setPageQuantity(quantityPagination)
                }
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
                handleUpdateProvider,
                handleChangePage,
                handleRegisterVipType,
                vipTypeList,
                clientList,
                pageQuantity,
                clientQuantity
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}