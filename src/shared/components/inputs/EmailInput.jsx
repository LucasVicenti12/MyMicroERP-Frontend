import {FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";
import {Controller} from "react-hook-form";

const emailPatern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// eslint-disable-next-line react/prop-types
export const EmailInput = ({placeholder, name, error, label, control, required, fullwidth, width}) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={required ?
                {
                    required: required,
                    pattern: {
                        value: emailPatern,
                        message: "Inform an valid email"
                    }
                } : {
                    pattern: {
                        value: emailPatern,
                        message: "Inform an valid email"
                    }
                }
            }
            render={({field}) => (
                <FormControl error={error} sx={fullwidth ? {width: "100%"} : width ? {width: width} : {}}>
                    {label ? <FormLabel>{label}</FormLabel> : <></>}
                    <Input
                        {...field}
                        placeholder={placeholder ?? ""}
                        size={"md"}
                        variant="soft"
                        fullWidth={!!fullwidth}
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
                </FormControl>
            )}
        />
    )
}