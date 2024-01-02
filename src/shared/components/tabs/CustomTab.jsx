import {Tab} from "@mui/joy";

/**
 * @param {number} value
 * @param {string} label
 * @param {OverridableComponent} icon
 * @returns {JSX.Element}
 */
// eslint-disable-next-line react/prop-types,no-unused-vars
export function CustomTab({value, label, icon}) {
    return (
        <Tab
            variant={"plain"}
            sx={{
                backgroundColor: "transparent !important",
                textAlign: "left !important",
                p: 0
            }}
            color={"primary"}
        >
            {icon}
            {label}
        </Tab>
    )
}