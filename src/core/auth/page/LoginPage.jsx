import {DefaultPage} from "../../../shared/components/pages/DefaultPage.jsx";
import backgroundImage from "../../../shared/assets/images/login_background_image.svg"
import {Box, Button, Typography} from "@mui/joy";
import {TextInput} from "../../../shared/components/inputs/TextInput.jsx";
import {Paper} from "@mui/material";
import {useForm} from "react-hook-form";
import {PasswordInput} from "../../../shared/components/inputs/PasswordInput.jsx";
import {useContext} from "react";
import {AuthContext} from "../implementation/AuthProvider.jsx";

export const LoginPage = () => {
    return (
        <DefaultPage>
            <Box sx={{display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
                <Box sx={{
                    display: "flex",
                    width: {
                        xl: "50%",
                        lg: "50%",
                        md: "40%",
                        sm: "0%",
                        xs: "0%"
                    },
                    height: "100%",
                    background: `url(${backgroundImage})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px"
                }}
                     component={Paper}
                     elevation={3}
                >
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: {
                        xl: "50%",
                        lg: "50%",
                        md: "60%",
                        sm: "100%",
                        xs: "100%"
                    },
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Paper sx={{
                        width: {
                            xl: "50%",
                            lg: "50%",
                            md: "50%",
                            sm: "60%",
                            xs: "70%"
                        },
                        p: 5,
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column"
                    }}
                           elevation={3}
                    >
                        <Typography color={"neutral"} sx={{fontSize: "20pt", fontWeight: "bold"}}>Hello, welcome
                            back</Typography>
                        <Typography color={"neutral"} sx={{fontSize: "12pt"}}>To keep connect with us, please login with
                            your personal info</Typography>
                        <LoginForm/>
                    </Paper>
                </Box>
            </Box>
        </DefaultPage>
    )
}

const LoginForm = () => {

    const useAuthProvider = useContext(AuthContext);

    const {handleLogin} = useAuthProvider

    const {handleSubmit, control, formState} = useForm();

    const {errors} = formState;

    const handleLoginUser = (values) => {
        handleLogin(values.login, values.password)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                mt: "2rem",
                gap: 2
            }}
            component={"form"}
            onSubmit={handleSubmit(handleLoginUser)}
        >
            <TextInput
                name={"login"}
                placeholder={"Type your username"}
                error={errors?.login ? errors?.login?.message ?? false : false}
                label={"Username"}
                control={control}
                required={"Inform the username"}
            />
            <PasswordInput
                name={"password"}
                placeholder={"Type your password"}
                error={errors?.password ? errors?.password?.message ?? false : false}
                label={"Password"}
                control={control}
                required={"Inform the password"}
            />
            <Button type={"submit"}>Login</Button>
        </Box>
    )
}