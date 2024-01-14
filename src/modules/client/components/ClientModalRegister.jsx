import {DefaultModal} from "../../../shared/components/modal/DefaultModal.jsx";
import {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    TabPanel,
    Tabs,
    Typography
} from "@mui/joy";
import {Tooltip} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useFieldArray, useForm} from "react-hook-form";
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Swal from "sweetalert2";

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

// eslint-disable-next-line no-unused-vars,react/prop-types
export const ClientModalRegister = ({clientCode}) => {
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        clearErrors,
        setValue,
        control,
        formState,
        reset,
        watch
    } = useForm({
        defaultValues: {
            contacts: [
                {"contactType": 1, "contact": ""}
            ]
        }
    });

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "contacts"
    })

    const {errors} = formState;

    const useClientProvider = useContext(ClientContext)

    const {handleRegisterClient, handleGetClientByCode, handleUpdateProvider} = useClientProvider

    const handleCloseModal = () => {
        setOpen(false)
        reset()
    }

    const handleSubmitForm = (values) => {
        handleRegisterClient(values).then((response) => {
            if (response.error === null) {
                handleUpdateProvider()
                handleCloseModal()
                return Toast.fire({
                    icon: "success",
                    title: "Successfully"
                })
            } else {
                return Toast.fire({
                    icon: "error",
                    title: response.error
                })
            }
        })
    }

    useEffect(() => {
        if (clientCode !== 0 && open === true) {
            handleGetClientByCode(clientCode).then((response) => {
                if (response.error === null) {
                    setValue("code", response.client.code)
                    setValue("uuid", response.client.uuid)
                    setValue("name", response.client.name)
                    setValue("fantasyName", response.client.fantasyName)
                    setValue("documentType", response.client.documentType.code)
                    setValue("document", response.client.document)
                    setValue("vipCode", response.client.vipType.code)
                    setValue("address", response.client.address)
                    setValue("zipCode", response.client.zipCode)
                    if (response.client.contacts.length > 0) {
                        response.client.contacts.map((contact, index) => {
                            if (index !== 0) {
                                append({"contactType": contact.contactType.code, "contact": contact.contact})
                            } else {
                                setValue("contacts[0].contactType", contact.contactType.code);
                                setValue("contacts[0].contact", contact.contact);
                            }
                        })
                    }
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
                        <Typography>{clientCode !== 0 ? "Edit client - " + clientCode : "Register client"}</Typography>
                        <IconButton onClick={() => handleCloseModal()}>
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <ClientModalTabs
                        control={control}
                        errors={errors}
                        formWatch={watch}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        fields={fields}
                        append={append}
                        remove={remove}
                    />
                </DialogContent>
                <DialogActions>
                    <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2, p: 2}}>
                        <Button fullWidth={true} onClick={() => handleCloseModal()} color={"danger"}>Close
                        </Button>
                        <Button fullWidth={true} type={"submit"}>Confirm</Button>
                    </Box>
                </DialogActions>
            </DefaultModal>
        </>
    )
}

const ClientModalTabs = ({control, errors, formWatch, setValue, clearErrors, append, remove, fields}) => {
    return (
        <Tabs defaultValue={0}>
            <CustomTabList>
                <CustomTab label={"Client form"} icon={<InsertDriveFileOutlinedIcon fontSize={"15pt"}/>}/>
                <CustomTab label={"Contacts"} icon={<ContactPageOutlinedIcon fontSize={"15pt"}/>}/>
            </CustomTabList>
            <TabPanel value={0}>
                <ClientForm control={control} errors={errors} formWatch={formWatch} setValue={setValue}/>
            </TabPanel>
            <TabPanel value={1}>
                <ClientContactsForm
                    control={control}
                    errors={errors}
                    formWatch={formWatch}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    fields={fields}
                    append={append}
                    remove={remove}
                />
            </TabPanel>
        </Tabs>
    )
}

const ClientForm = ({control, errors, formWatch, setValue}) => {
    const documentType = parseInt(formWatch("documentType") ?? 1)

    const useClientProvider = useContext(ClientContext);
    const {handleGetDocumentTypeList, vipTypeList} = useClientProvider

    const [documentTypeOptions, setDocumentTypeOptions] = useState([
        {label: "CNPJ", value: 1},
        {label: "CPF", value: 2}
    ]);

    const vipTypeOptions = vipTypeList.map((vipType) => ({
        label: vipType.description,
        value: vipType.code
    }))

    useEffect(() => {
        handleGetDocumentTypeList().then((response) => {
            if (response.error === null) {
                setDocumentTypeOptions(response.documentTypes.map((value) => ({
                    label: value.description,
                    value: value.code
                })));
            }
        })
    }, []);

    return (
        <Box sx={{p: 2, minHeight: "370px", maxHeight: "370px"}}>
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
                    <SelectInput
                        name={"vipCode"}
                        label={"Vip type"}
                        control={control}
                        placeholder={"Select the vip type"}
                        error={errors?.vipCode ? errors?.vipCode.message ?? false : false}
                        options={vipTypeOptions}
                        setValue={setValue}
                        width={"30%"}
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

const ClientContactsForm = ({control, errors, formWatch, setValue, clearErrors, append, remove, fields}) => {
    return (
        <Box sx={{
            p: 2, minHeight: "370px", maxHeight: "370px", overflow: "scroll",
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
            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                {fields && fields.map((item, index) => (
                    <ContactComponent
                        key={index}
                        index={index}
                        control={control}
                        errors={errors}
                        formWatch={formWatch}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        remove={remove}
                    />
                ))}
            </Box>
            <Button
                size={"sm"}
                startDecorator={<AddOutlinedIcon/>}
                onClick={() => append({"contactType": 1, "contact": ""})}
            >Add contact</Button>
        </Box>
    )
}

const ContactComponent = ({index, control, errors, setValue, formWatch, clearErrors, remove}) => {

    const contactType = formWatch(`contacts[${index}].contactType`) ?? 1

    useEffect(() => {
        clearErrors()
        setValue(`contacts[${index}].contactType`, contactType)
    }, [contactType]);

    const errorContactType = errors?.contacts ? errors?.contacts[index]?.contactType : null
    const errorContact = errors?.contacts ? errors?.contacts[index]?.contact : null

    return (
        <Box sx={{display: "flex", flexDirection: "row", width: "100%", gap: 2, alignItems: "center"}}>
            <SelectInput
                name={`contacts[${index}].contactType`}
                label={"Contact type"}
                control={control}
                placeholder={"Select the contact type"}
                error={errorContactType ? errorContactType.message ?? false : false}
                options={[
                    {label: "Phone", value: 1},
                    {label: "Email", value: 2}
                ]}
                setValue={setValue}
                width={"30%"}
            />
            {
                contactType === 1 ?
                    <PhoneInput
                        name={`contacts[${index}].contact`}
                        label={"Phone"}
                        control={control}
                        placeholder={"Type the phone of client"}
                        error={errorContact ? errorContact.message ?? false : false}
                        width={"70%"}
                    />
                    :
                    <EmailInput
                        name={`contacts[${index}].contact`}
                        label={"Email"}
                        control={control}
                        placeholder={"Type the email of client"}
                        error={errorContact ? errorContact.message ?? false : false}
                        width={"70%"}
                    />
            }
            {
                index !== 0 ? (
                    <IconButton variant={"solid"} color={"primary"} onClick={() => {
                        remove(index)
                    }}>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                ) : <></>
            }
        </Box>
    )
}