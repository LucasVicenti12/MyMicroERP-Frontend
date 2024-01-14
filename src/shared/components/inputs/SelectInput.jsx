import {FormControl, FormHelperText, FormLabel, Input, Option, Select} from "@mui/joy";
import {Controller} from "react-hook-form";

export const SelectInput = ({placeholder, name, error, label, control, required, fullwidth, options, setValue, width}) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={required ? {required: required} : {}}
            render={({field}) => (
                <FormControl error={error} sx={fullwidth ? {width: "100%"} : width ? {width: width} : {}}>
                    {label ? <FormLabel>{label}</FormLabel> : <></>}
                    <Select
                        {...field}
                        onChange={(e, newValue) => {
                            setValue(name, newValue)
                        }}
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
                        slotProps={{
                            listbox: {
                                sx: {
                                    zIndex: 99999
                                }
                            }
                        }}
                    >
                        {
                            options.map((item, index) => (
                                <Option value={item.value} key={index}>{item.label}</Option>
                            ))
                        }
                    </Select>
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