import {ClientContext, ClientProvider} from "../provider/ClientProvider.jsx";
import {useContext, useState} from "react";
import {DefaultPage} from "../../../shared/components/pages/DefaultPage.jsx";
import {Box, Button, IconButton, Typography} from "@mui/joy";
import {CustomTable} from "../../../shared/components/tables/CustomTable.jsx";
import {Pagination, TableBody, TableHead, Tooltip} from "@mui/material";
import {CustomRowTable} from "../../../shared/components/tables/CustomRowTable.jsx";
import {CustomTableCell} from "../../../shared/components/tables/CustomTableCell.jsx";
import {CustomTableContainer} from "../../../shared/components/tables/CustomTableContainer.jsx";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import {ClientModalRegister} from "../components/ClientModalRegister.jsx";
import {VipTypeList} from "../components/VipTypeList.jsx";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {TextInput} from "../../../shared/components/inputs/TextInput.jsx";
import {NewVipType} from "../components/NewVipType.jsx";

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
        width: "25%"
    },
    {
        label: "Document",
        width: "15%"
    },
    {
        label: "Vip type",
        width: "10%"
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

    const {clientList, handleChangePage, pageQuantity, clientQuantity} = useClientProvider;

    const [openVipTypeRegister, setOpenVipTypeRegister] = useState(false);

    const handleOpenRegisterVipType = (open = true) => {
        setOpenVipTypeRegister(open);
    }

    return (
        <DefaultPage>
            <Box sx={{p: 2}}>
                <Box sx={{width: "100%"}}>
                    <Typography color={"neutral"} sx={{fontSize: "20pt", fontWeight: "bold"}}>Client</Typography>
                </Box>
                <Box sx={{
                    gap: 2,
                    display: "flex",
                    flexDirection: {
                        xl: "row",
                        md: "row",
                        sm: "column"
                    }
                }}>
                    <Box
                        sx={{
                            width: {
                                xl: "80%",
                                md: "60%",
                                sm: "100%"
                            },
                            mt: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            <Typography color={"neutral"} sx={{fontSize: "15pt", fontWeight: "bold"}}>All
                                clients</Typography>
                            <Box sx={{gap: 1, display: "flex"}}>
                                <Button startDecorator={<FilterAltOutlinedIcon/>} size={"sm"}>
                                    Filters
                                </Button>
                                <ClientModalRegister clientCode={0}/>
                            </Box>
                        </Box>
                        <CustomTableContainer height={"700px"}>
                            <CustomTable minWidth={"800px"}>
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
                                                    <CustomTableCell colspan={TABLE_CLIENT_COLUMNS.length}
                                                                     textAlign={"center"}
                                                                     content={"There are no registered clients"}/>
                                                </CustomRowTable>
                                            )
                                    }
                                </TableBody>
                            </CustomTable>
                        </CustomTableContainer>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "end"
                        }}>
                            <Box sx={{gap: 1, display: "flex"}}>
                                <Pagination
                                    count={pageQuantity}
                                    size={"small"}
                                    onChange={(evt, page) => handleChangePage(page)}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: {
                                xl: "20%",
                                md: "40%",
                                sm: "100%"
                            },
                            mt: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                            <Typography color={"neutral"} sx={{fontSize: "15pt", fontWeight: "bold"}}>All vip
                                types</Typography>
                            <Box>
                                <Button onClick={() => handleOpenRegisterVipType()} startDecorator={<AddOutlinedIcon/>}
                                        size={"sm"}>
                                    Register new vip type
                                </Button>
                            </Box>
                        </Box>
                        <VipTypeList/>
                        {openVipTypeRegister ? <NewVipType handleClose={handleOpenRegisterVipType}/> : <></>}
                    </Box>
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
            <CustomTableCell showTooltip={true} content={client.name}/>
            <CustomTableCell showTooltip={true} content={client.fantasyName}/>
            <CustomTableCell content={client.document}/>
            <CustomTableCell content={client.vipType.description} textAlign={"right"}/>
            <CustomTableCell showTooltip={true} content={client.address}/>
            <CustomTableCell
                content={
                    <ClientModalRegister clientCode={client.code}/>
                }
                textAlign={"center"}
            />
        </CustomRowTable>
    )
}