import {useContext} from "react";
import {ClientContext} from "../provider/ClientProvider.jsx";
import {CustomTableContainer} from "../../../shared/components/tables/CustomTableContainer.jsx";
import {CustomTable} from "../../../shared/components/tables/CustomTable.jsx";
import {TableBody, TableHead} from "@mui/material";
import {CustomRowTable} from "../../../shared/components/tables/CustomRowTable.jsx";
import {CustomTableCell} from "../../../shared/components/tables/CustomTableCell.jsx";

const TABLE_VIP_TYPE_COLUMNS = [
    {
        label: "Code",
        width: "5%"
    },
    {
        label: "Description",
        width: "95%"
    }
]

export const VipTypeList = () => {

    const useClientProvider = useContext(ClientContext)

    const {vipTypeList} = useClientProvider

    return (
        <CustomTableContainer height={"500px"}>
            <CustomTable>
                <TableHead>
                    <CustomRowTable>
                        {
                            TABLE_VIP_TYPE_COLUMNS.map((item, index) => (
                                <CustomTableCell width={item.width} content={item.label} key={index}/>
                            ))
                        }
                    </CustomRowTable>
                </TableHead>
                <TableBody>
                    {
                        vipTypeList.length > 0 ?
                            vipTypeList.map((item, index) => (
                                <VipTypeTableList vipType={item} key={index}/>
                            ))
                            : (
                                <CustomRowTable>
                                    <CustomTableCell colspan={TABLE_VIP_TYPE_COLUMNS.length}
                                                     textAlign={"center"}
                                                     content={"There are no registered vip types"}/>
                                </CustomRowTable>
                            )
                    }
                </TableBody>
            </CustomTable>
        </CustomTableContainer>
    )
}

const VipTypeTableList = ({vipType}) => {
    return (
        <CustomRowTable>
            <CustomTableCell width={TABLE_VIP_TYPE_COLUMNS[0]} content={vipType.code} textAlign={"right"}/>
            <CustomTableCell width={TABLE_VIP_TYPE_COLUMNS[1]} content={vipType.description}/>
        </CustomRowTable>
    )
}