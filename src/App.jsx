import {Root} from "./shared/router/Root.jsx";
import {Typography} from "@mui/joy";

function App() {
    return (
        <>
            <Root/>
            <Typography sx={{position: "absolute", bottom: "1rem", right: "2rem"}}>Made by Lucas Vicenti</Typography>
        </>
    )
}

export default App
