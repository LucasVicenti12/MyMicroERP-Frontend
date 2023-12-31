import {TableCell} from "@mui/material";

export const CustomTableCell = (
    // eslint-disable-next-line react/prop-types
    {content, width, colspan, textAlign}
) => {
    return (
        <TableCell
            colSpan={colspan ? colspan : 1}
            align={textAlign ? textAlign : "left"}
            size={"small"}
            sx={{
                maxWidth: width + " !important",
                overflowX: "hidden !important",
                textOverflow: "ellipsis !important",
                textWrap: "nowrap !important",
                maxHeight: "10px !important"
            }}
        >
            {content}
        </TableCell>
    )
}