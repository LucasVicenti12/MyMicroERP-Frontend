import {Controller} from "react-hook-form";
import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/joy";
import {FormControlLabel} from "@mui/material";
import List from "@mui/joy/List";

export const RadioInput = ({name, label, control, options, width, defaultValue}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <FormControl sx={width ? {width: width} : {}}>
                    {label ? <FormLabel>{label}</FormLabel> : <></>}
                    <RadioGroup {...field} dir={"horizontal"} defaultValue={defaultValue}>
                        <List orientation={"horizontal"} sx={{gap: 4}}>
                        {
                            options.map((item, index) => (
                                <FormControlLabel control={<Radio size={"sm"} variant={"soft"}/>} label={item.label} value={item.value}/>
                            ))
                        }
                        </List>
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}
