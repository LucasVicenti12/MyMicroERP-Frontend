import {TableContainer} from "@mui/material";

// eslint-disable-next-line react/prop-types
export const CustomTableContainer = ({height, children}) => {
    return (
        <TableContainer
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
                maxHeight: height,
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                    width: 5,
                    height: 7,
                    backgroundColor: "rgba(106,165,254,0)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#1c74ff",
                    borderRadius: 2,
                },
            }}>
            {children}
        </TableContainer>
    )
}