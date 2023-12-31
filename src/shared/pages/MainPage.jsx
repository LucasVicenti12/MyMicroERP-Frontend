import {Box} from "@mui/joy";
import {Outlet} from "react-router-dom";
import {CustomMenuSide} from "../components/menuside/MenuSide.jsx";

export const MainPage = () => {
    document.querySelector("body").style.backgroundColor = "#F3F3F3"

    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
            <CustomMenuSide />
            <Box sx={{ display: "column", width: "100%", height: "100%" }}>
                {/*<AppBarDefault/>*/}
                <Outlet />
            </Box>
        </Box>
    );
}