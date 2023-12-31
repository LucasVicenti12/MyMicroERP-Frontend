import {Dialog, Slide, useMediaQuery, useTheme} from "@mui/material";
import {forwardRef} from "react";

// eslint-disable-next-line react/prop-types
export const DefaultModal = ({open, handleClose, children, form}) => {
    const themeMode = useTheme();
    const fullScreen = useMediaQuery(themeMode.breakpoints.down("sm"));
    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            PaperProps={{
                sx: {position: "fixed", m: 0, right: 0, bottom: 0},
            }}
            sx={{
                "& .MuiBackdrop-root": {
                    backdropFilter: "blur(1px)",
                    backgroundColor: "transparent"
                },
            }}
            TransitionComponent={Transition}
            maxWidth="md"
            fullWidth
            fullScreen={fullScreen}
            component={"form"}
            onSubmit={form}
        >
            {children}
        </Dialog>
    )
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});