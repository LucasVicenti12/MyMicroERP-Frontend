import {ClientContext, ClientProvider} from "../provider/ClientProvider.jsx";
import {useContext, useState} from "react";
import {DefaultPage} from "../../../shared/components/pages/DefaultPage.jsx";
import {Box, Button, IconButton, Typography} from "@mui/joy";
import {CustomTable} from "../../../shared/components/tables/CustomTable.jsx";
import {TableBody, TableHead, Tooltip} from "@mui/material";
import {CustomRowTable} from "../../../shared/components/tables/CustomRowTable.jsx";
import {CustomTableCell} from "../../../shared/components/tables/CustomTableCell.jsx";
import {CustomTableContainer} from "../../../shared/components/tables/CustomTableContainer.jsx";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import {ClientModalRegister} from "../components/ClientModalRegister.jsx";

const TABLE_CLIENT_COLUMNS = [
    {
        label: "Code",
        width: "5%"
    },
    {
        label: "Name",
        width: "20%"
    },
    {
        label: "Fantasy name",
        width: "30%"
    },
    {
        label: "Document",
        width: "15%"
    },
    {
        label: "Vip code",
        width: "5%"
    },
    {
        label: "Address",
        width: "20%"
    },
    {
        label: "Action",
        width: "5%"
    },
]

export const Client = () => {
    return (
        <ClientProvider>
            <ClientPage/>
        </ClientProvider>
    );
}

const ClientPage = () => {
    const useClientProvider = useContext(ClientContext);

    const {clientList} = useClientProvider;

    return (
        <DefaultPage>
            <Box sx={{p: 2}}>
                <Box sx={{width: "100%"}}>
                    <Typography color={"neutral"} sx={{fontSize: "20pt"}}>Client</Typography>
                </Box>
                <Box sx={{width: "100%", mt: "3rem", display: "flex", flexDirection: "column", gap: 1}}>
                    <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                        <Typography color={"neutral"} sx={{fontSize: "15pt", fontWeight: "bold"}}>All
                            clients</Typography>
                        <ClientModalRegister clientUUID={""}/>
                    </Box>
                    <CustomTableContainer height={"500px"}>
                        <CustomTable>
                            <TableHead>
                                <CustomRowTable>
                                    {
                                        TABLE_CLIENT_COLUMNS.map((item, index) => (
                                            <CustomTableCell width={item.width} content={item.label} key={index}/>
                                        ))
                                    }
                                </CustomRowTable>
                            </TableHead>
                            <TableBody>
                                {
                                    clientList.length > 0 ?
                                        clientList.map((item, index) => (
                                            <ClientList client={item} key={index}/>
                                        ))
                                        : (
                                            <CustomRowTable>
                                                <CustomTableCell colspan={TABLE_CLIENT_COLUMNS.length} textAlign={"center"}
                                                                 content={"There are no registered clients"}/>
                                            </CustomRowTable>
                                        )
                                }
                            </TableBody>
                        </CustomTable>
                    </CustomTableContainer>
                </Box>
            </Box>
        </DefaultPage>
    )
}

// eslint-disable-next-line react/prop-types
const ClientList = ({client}) => {
    return (
        <CustomRowTable>
            <CustomTableCell content={client.code} textAlign={"right"}/>
            <CustomTableCell content={client.name}/>
            <CustomTableCell content={client.fantasyName}/>
            <CustomTableCell content={client.document}/>
            <CustomTableCell content={client.vipCode} textAlign={"right"}/>
            <CustomTableCell content={client.address}/>
            <CustomTableCell
                content={
                    <ClientModalRegister clientUUID={client.uuid}/>
                }
                textAlign={"center"}
            />
        </CustomRowTable>
    )
}