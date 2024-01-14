import {TableCell, Tooltip} from "@mui/material";

export const CustomTableCell = (
    // eslint-disable-next-line react/prop-types
    {content, width, colspan, textAlign, showTooltip = false}
) => {
    return (

        <TableCell
            colSpan={colspan ? colspan : 1}
            align={textAlign ? textAlign : "left"}
            size={"small"}
            sx={{
                width: width + " !important",
                overflowX: "hidden !important",
                textOverflow: "ellipsis !important",
                textWrap: "nowrap !important",
                maxHeight: "10px !important"
            }}
        >
            {
                showTooltip ? (
                    <Tooltip title={content}>
                        <span style={{cursor: "pointer"}}>
                            {content}
                        </span>
                    </Tooltip>
                ) : content
            }
        </TableCell>
    )
}