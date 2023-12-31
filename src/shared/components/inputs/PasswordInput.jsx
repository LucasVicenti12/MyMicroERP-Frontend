import {Controller} from "react-hook-form";
import {FormControl, FormHelperText, FormLabel, IconButton, Input} from "@mui/joy";
import {useState} from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// eslint-disable-next-line react/prop-types
export const PasswordInput = ({placeholder, name, error, label, control, required}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            rules={{required: required}}
            render={({field}) => (
                <FormControl error={error}>
                    {label ? <FormLabel>{label}</FormLabel> : <></>}
                    <Input
                        {...field}
                        placeholder={placeholder ?? ""}
                        size={"md"}
                        variant="soft"
                        type={showPassword ? "text" : "password"}
                        sx={{
                            '--Input-radius': '3px',
                            borderBottom: '2px solid',
                            borderColor: 'neutral.outlinedBorder',
                            '&:hover': {
                                borderColor: 'neutral.outlinedHoverBorder',
                            },
                            '&::before': {
                                borderBottom: '3px solid var(--Input-focusedHighlight)',
                                transform: 'scaleX(0)',
                                left: 0,
                                right: 0,
                                bottom: '-2px',
                                top: 'unset',
                                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                borderRadius: 0,
                                borderBottomLeftRadius: "5px",
                                borderBottomRightRadius: "5px"
                            },
                            '&:focus-within::before': {
                                transform: 'scaleX(1)',
                            },
                        }}
                    />
                    {error ? (
                        <FormHelperText>
                            {error}
                        </FormHelperText>
                    ) : <FormHelperText>&nbsp;</FormHelperText>}
                    <IconButton
                        size={"sm"}
                        color={error ? "danger" : "neutral"}
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{
                            position: "absolute",
                            right: "0.2rem",
                            top: "1.7rem",
                        }}
                    >
                        {showPassword ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                    </IconButton>
                </FormControl>
            )}
        />
    )
}