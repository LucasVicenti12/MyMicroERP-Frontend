import {DefaultModal} from "../../../shared/components/modal/DefaultModal.jsx";
import {useState} from "react";
import {Box, Button, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography} from "@mui/joy";
import {Tooltip} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useForm} from "react-hook-form";
import {TextInput} from "../../../shared/components/inputs/TextInput.jsx";
import {RadioInput} from "../../../shared/components/inputs/RadioInput.jsx";
import {CnpjInput} from "../../../shared/components/inputs/CnpjInput.jsx";
import {CpfInput} from "../../../shared/components/inputs/CpfInput.jsx";
import {ZipCodeInput} from "../../../shared/components/inputs/ZipCodeInput.jsx";

// eslint-disable-next-line no-unused-vars,react/prop-types
export const ClientModalRegister = ({clientUUID}) => {
    const [open, setOpen] = useState(false);

    const {handleSubmit, control, formState, reset, watch} = useForm();

    const {errors} = formState;

    const handleCloseModal = () => {
        setOpen(false)
        reset()
    }

    const handleSubmitForm = (values) => {
        console.log(values);
    }

    return (
        <>
            {
                clientUUID !== "" ?
                    <Tooltip title={"Edit client"} placement={"left"}>
                        <IconButton color={"neutral"} onClick={() => setOpen(true)}>
                            <EditNoteOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    :
                    <Button startDecorator={<AddOutlinedIcon/>} size={"sm"} onClick={() => setOpen(true)}>
                        Register new client
                    </Button>
            }
            <DefaultModal handleClose={handleCloseModal} open={open} form={handleSubmit(handleSubmitForm)}>
                <DialogTitle>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        p: 2,
                        alignItems: "center",
                        width: "100%"
                    }}
                    >
                        <Typography>{clientUUID !== "" ? "Edit client" : "Register client"}</Typography>
                        <IconButton onClick={() => handleCloseModal()}>
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <ClientForm control={control} errors={errors} formWatch={watch}/>
                </DialogContent>
                <DialogActions>
                    <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2, p: 2}}>
                        <Button fullWidth={true} onClick={() => handleCloseModal()} color={"danger"}>Close
                            modal</Button>
                        <Button fullWidth={true} type={"submit"}>Confirm</Button>
                    </Box>
                </DialogActions>
            </DefaultModal>
        </>
    )
}

const ClientForm = ({control, errors, formWatch}) => {

    const documentType = formWatch("documentType") ?? 1

    return (
        <Box sx={{p: 2}}>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                <TextInput
                    name={"name"}
                    label={"Name"}
                    required={"Inform the name"}
                    control={control}
                    placeholder={"Type the name of client"}
                    error={errors?.name ? errors?.name?.message ?? false : false}
                />
                <TextInput
                    name={"fantasyName"}
                    label={"Fantasy name"}
                    required={"Inform the fantasy name"}
                    control={control}
                    placeholder={"Type the fantasy name of client"}
                    error={errors?.fantasyName ? errors?.fantasyName?.message ?? false : false}
                />
                <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2}}>
                    <RadioInput
                        name={"documentType"}
                        control={control}
                        label={"Document type"}
                        options={[
                            {label: "CNPJ", value: 1},
                            {label: "CPF", value: 2}
                        ]}
                        fullwidth={"50%"}
                        defaultValue={1}
                    />
                    {documentType === 1 ?
                        <CnpjInput
                            name={"document"}
                            label={"Document"}
                            required={"Inform the document"}
                            control={control}
                            placeholder={"Type the document of client"}
                            error={errors?.document ? errors?.document?.message ?? false : false}
                            fullwidth={true}
                        />
                        :
                        <CpfInput
                            name={"document"}
                            label={"Document"}
                            required={"Inform the document"}
                            control={control}
                            placeholder={"Type the document of client"}
                            error={errors?.document ? errors?.document?.message ?? false : false}
                            fullwidth={true}
                        />
                    }
                    <TextInput
                        name={"vipCode"}
                        label={"Vip code"}
                        required={"Inform the vip code"}
                        control={control}
                        placeholder={"Type the vip code of client"}
                        error={errors?.vipCode ? errors?.vipCode?.message ?? false : false}
                        fullwidth={true}
                    />
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2}}>
                    <TextInput
                        name={"address"}
                        label={"Address"}
                        required={"Inform the address"}
                        control={control}
                        placeholder={"Type the address of client"}
                        error={errors?.address ? errors?.address?.message ?? false : false}
                        fullwidth={true}
                    />
                    <ZipCodeInput
                        name={"zipCode"}
                        label={"Zip code"}
                        required={"Inform the zip code"}
                        control={control}
                        placeholder={"Type the zip code of client"}
                        error={errors?.zipCode ? errors?.zipCode?.message ?? false : false}
                        width={"50%"}
                    />
                </Box>
            </Box>
        </Box>
    )
}