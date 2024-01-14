import {Box, IconButton} from "@mui/joy";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {useForm} from "react-hook-form";
import {TextInput} from "../../../shared/components/inputs/TextInput.jsx";
import {useContext} from "react";
import {ClientContext} from "../provider/ClientProvider.jsx";
import Swal from "sweetalert2";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Tooltip} from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const NewVipType = ({handleClose}) => {

    const useClientProvider = useContext(ClientContext);

    const {handleRegisterVipType, handleUpdateProvider} = useClientProvider;

    const {
        control,
        formState,
        handleSubmit,
        reset
    } = useForm();

    const {errors} = formState;

    const handleSubmitForm = (values) => {
        handleRegisterVipType(values.description).then(() => {
            reset();
            handleClose(false);
            handleUpdateProvider();
            return Toast.fire({
                icon: "success",
                title: "Successfully"
            })
        }).catch(() => {
            return Toast.fire({
                icon: "error",
                title: 'An unexpected error has occurred'
            })
        })
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "start",
                gap: 1
            }}
            component={"form"}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <TextInput
                name={"description"}
                required={"Inform the vip type"}
                control={control}
                placeholder={"Type the vip type"}
                error={errors?.description ? errors?.description?.message ?? false : false}
                fullwidth={true}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 0.5
                }}
            >
                <Tooltip title={"Cancel register"}>
                    <IconButton color={"danger"} variant={"solid"} onClick={() => handleClose(false)}>
                        <CloseOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Register"}>
                    <IconButton color={"primary"} variant={"solid"} type={"submit"}>
                        <CheckOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}