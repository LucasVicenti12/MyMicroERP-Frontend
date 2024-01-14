import {Table} from "@mui/joy";

export const CustomTable = ({children, minWidth}) => {
    return (
        <Table stickyHeader={true} sx={{tableLayout: "fixed", minWidth: minWidth}}>
            {children}
        </Table>
    )
}