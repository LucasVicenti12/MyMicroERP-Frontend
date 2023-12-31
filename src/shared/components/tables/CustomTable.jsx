import {Table} from "@mui/joy";

export const CustomTable = ({children}) => {
    return (
        <Table stickyHeader={true} sx={{tableLayout: "auto"}}>
            {children}
        </Table>
    )
}