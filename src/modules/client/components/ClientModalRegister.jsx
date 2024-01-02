import {DefaultModal} from "../../../shared/components/modal/DefaultModal.jsx";
import {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton, Tab,
    TabList, TabPanel,
    Tabs,
    Typography
} from "@mui/joy";
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
import {ClientContext} from "../provider/ClientProvider.jsx";
import {SelectInput} from "../../../shared/components/inputs/SelectInput.jsx";
import {PhoneInput} from "../../../shared/components/inputs/PhoneInput.jsx";
import {EmailInput} from "../../../shared/components/inputs/EmailInput.jsx";
import {CustomTab} from "../../../shared/components/tabs/CustomTab.jsx";
import {CustomTabList} from "../../../shared/components/tabs/CustomTabList.jsx";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

// eslint-disable-next-line no-unused-vars,react/prop-types
export const ClientModalRegister = ({clientCode}) => {
    const [open, setOpen] = useState(false);

    const {handleSubmit, setValue, control, formState, reset, watch} = useForm();

    const {errors} = formState;

    const useClientProvider = useContext(ClientContext)

    const {handleRegisterClient, handleGetClientByCode} = useClientProvider

    const handleCloseModal = () => {
        setOpen(false)
        reset()
    }

    const handleSubmitForm = (values) => {
        handleRegisterClient(values)
        handleCloseModal()
    }

    useEffect(() => {
        if (clientCode !== 0 && open === true) {
            handleGetClientByCode(clientCode).then((response) => {
                if (response.error === null) {
                    setValue("code", response.client.code)
                    setValue("uuid", response.client.uuid)
                    setValue("name", response.client.name)
                    setValue("fantasyName", response.client.fantasyName)
                    setValue("documentType", response.client.documentType)
                    setValue("document", response.client.document)
                    setValue("vipCode", response.client.vipCode)
                    setValue("address", response.client.address)
                    setValue("zipCode", response.client.zipCode)
                }
            })
        }
    }, [open]);

    return (
        <>
            {
                clientCode !== 0 ?
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
                        <Typography>{clientCode !== 0 ? "Edit client" : "Register client"}</Typography>
                        <IconButton onClick={() => handleCloseModal()}>
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <ClientModalTabs control={control} errors={errors} formWatch={watch} setValue={setValue}/>
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

const ClientModalTabs = ({control, errors, formWatch, setValue}) => {
    return (
        <Tabs defaultValue={0}>
            <CustomTabList>
                <CustomTab label={"Client form"} icon={<InsertDriveFileOutlinedIcon fontSize={"15pt"}/>}/>
                <CustomTab label={"Contacts"} icon={<ContactPageOutlinedIcon fontSize={"15pt"}/>}/>
            </CustomTabList>
            <TabPanel value={0}>
                <ClientForm control={control} errors={errors} formWatch={formWatch}/>
            </TabPanel>
            <TabPanel value={1}>
                <ClientContactsForm control={control} errors={errors} formWatch={formWatch} setValue={setValue}/>
            </TabPanel>
        </Tabs>
    )
}

const ClientForm = ({control, errors, formWatch}) => {
    const documentType = formWatch("documentType") ?? 1

    const useClientProvider = useContext(ClientContext);
    const {handleGetDocumentTypeList} = useClientProvider

    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);

    useEffect(() => {
        handleGetDocumentTypeList().then((response) => {
            if (response.error === null) {
                setDocumentTypeOptions(response.documentTypes.map((value, _) => ({
                    label: value.description,
                    value: value.code
                })));
            }
        })
    }, []);

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
                        options={documentTypeOptions}
                        fullwidth={"50%"}
                        defaultValue={documentType}
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

const ClientContactsForm = ({control, errors, formWatch, setValue}) => {
    const contactType = formWatch("contactType") ?? 1

    return (
        <Box sx={{p: 2, minHeight: "400px"}}>
            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2}}>
                <SelectInput
                    name={"contactType"}
                    label={"Contact type"}
                    required={"Inform the contact type"}
                    control={control}
                    placeholder={"Select the contact type"}
                    error={errors?.contactType ? errors?.contactType?.message ?? false : false}
                    options={[
                        {label: "Phone", value: 1},
                        {label: "Email", value: 2}
                    ]}
                    defaultValue={contactType}
                    setValue={setValue}
                    width={"30%"}
                />
                {
                    contactType === 1 ?
                        <PhoneInput
                            name={"contact"}
                            label={"Phone"}
                            required={"Inform the phone"}
                            control={control}
                            placeholder={"Type the phone of client"}
                            error={errors?.contact ? errors?.contact?.message ?? false : false}
                            width={"70%"}
                        />
                        :
                        <EmailInput
                            name={"contact"}
                            label={"Email"}
                            required={"Inform the email"}
                            control={control}
                            placeholder={"Type the email of client"}
                            error={errors?.contact ? errors?.contact?.message ?? false : false}
                            width={"70%"}
                        />
                }
                </Box>
            </Box>
        </Box>
    )
}