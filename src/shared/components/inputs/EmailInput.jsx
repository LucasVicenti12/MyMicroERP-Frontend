import {FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";
import {Controller} from "react-hook-form";

export const EmailInput = ({placeholder, name, error, label, control, required, fullwidth, width}) => {
    const isValidEmail = email =>
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

    const handleEmailValidation = email => {
        console.log("ValidateEmail was called with", email);

        const isValid = isValidEmail(email);

        const validityChanged =
            (errors.email && isValid) || (!errors.email && !isValid);
        if (validityChanged) {
            console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
        }

        return isValid;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={required ? {required: required, validate: handleEmailValidation} : {}}
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