import {TableRow} from "@mui/material";

export const CustomRowTable = ({children}) => {
    return (
        <TableRow hover={true}>
            {children}
        </TableRow>
    )
}