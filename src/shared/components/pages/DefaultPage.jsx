import {Box} from "@mui/joy";

// eslint-disable-next-line react/prop-types
export const DefaultPage = ({children}) => {
    return (
        <Box sx={{width: "100%", height: "100%", backgroundColor: "#F3F3F3"}}>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                {children}
            </Box>
        </Box>
    )
}