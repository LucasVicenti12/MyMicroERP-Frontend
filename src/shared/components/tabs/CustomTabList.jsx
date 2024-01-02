import {TabList} from "@mui/joy";

export const CustomTabList = ({children}) => {
    return (
        <TabList sx={{ml: 4, mr: 4, gap: 3, mt: 1, boxShadow: "none"}}>
            {children}
        </TabList>
    )
}