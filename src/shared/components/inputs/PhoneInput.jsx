import {forwardRef} from "react";
import {IMaskInput} from "react-imask";
import {Controller} from "react-hook-form";
import {FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";

const PhoneMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="(+55) ** * ****-****"
            definitions={{
                "*": /[0-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

export const PhoneInput = (
    {
        placeholder,
        name,
        error,
        label,
        control,
        required,
        fullwidth,
        width
    }
) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={required ? {required: required} : {}}
            render={({field}) => (
                <FormControl error={error} sx={fullwidth ? {width: "100%"} : width ? {width: width} : {}}>
                    {label ? <FormLabel>{label}</FormLabel> : <></>}
                    <Input
                        {...field}
                        placeholder={placeholder ?? ""}
                        size={"md"}
                        variant="soft"
                        fullWidth={!!fullwidth}
                        slotProps={{
                            input: {
                                component: PhoneMaskCustom
                            }
                        }}
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
    );
};