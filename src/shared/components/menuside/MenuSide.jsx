import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {useLocation, useNavigate} from "react-router-dom";
import {Collapse, Tooltip} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useContext, useState} from "react";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import {Button, IconButton} from "@mui/joy";
import {AuthContext} from "../../../core/auth/implementation/AuthProvider.jsx";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
const drawerWidth = 225;

const MenuModules = [
    {
        icon: (color) => (<ConnectWithoutContactOutlinedIcon fontSize="small" sx={{color: color}}/>),
        route: "",
        label: "Client module",
        expanded: true,
        routes: [
            {
                icon: (color) => (<LocalMallOutlinedIcon fontSize="small" sx={{color: color}}/>),
                route: "/web/client",
                label: "Client",
                routes: [],
                expanded: false,
            },
        ],
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(9)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export const CustomMenuSide = () => {
    const [openMenu, setOpenMenu] = useState(
        localStorage.getItem("menu_open") !== null
            ? JSON.parse(localStorage.getItem("drawerOpen"))
            : true
    )
    const handleOpenMenu = () => {
        localStorage.setItem("menu_open", !openMenu);
        setOpenMenu(!openMenu);
    }

    const useAuthProvider = useContext(AuthContext);

    const {handleLogout} = useAuthProvider

    return (
        <Drawer
            variant="permanent"
            open={openMenu}
            PaperProps={{
                sx: {
                    borderTopRightRadius: "15px",
                    borderBottomRightRadius: "15px",
                    backgroundColor: "#404EEB",
                    "&::-webkit-scrollbar": {
                        width: 5,
                        height: 7,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: 2,
                    },
                    overflowX: "hidden",
                },
            }}
            sx={{
                "& .MuiDrawer-paper": {
                    display: "grid",
                    gridTemplateRows: "auto 1fr auto",
                    gridTemplateAreas: "'header' 'main' 'footer'",
                },
                maxHeight: 10,
            }}
        >
            <DrawerHeader
                sx={{
                    gridArea: "header",
                    display: "flex",
                    justifyContent: openMenu ? "space-between" : "center",
                    alignItems: "center",
                }}
            >
                {openMenu ? <Box sx={{display: "flex"}}></Box> : <></>}
                <IconButton onClick={() => handleOpenMenu()} sx={{
                    ":hover": {
                        backgroundColor: "rgba(0,0,0,0.06)",
                        transition: "background-color 100ms linear"
                    }
                }}>
                    {openMenu ? <SortOutlinedIcon sx={{color: "#ffffff"}}/> :
                        <MoreVertOutlinedIcon sx={{color: "#ffffff"}}/>}
                </IconButton>
            </DrawerHeader>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    borderRadius: "10px",
                    maxHeight: "90vh",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                        width: 5,
                        height: 7,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#FFFFFF",
                        borderRadius: 2,
                    },
                    overflowX: "hidden",
                }}
            >
                {
                    MenuModules.map((item, index) =>
                        openMenu ?
                            (<MenuItemOpen item={item} key={index}/>)
                            :
                            (<MenuItemClose item={item} key={index}/>)
                    )
                }
            </List>
            <IconButton onClick={() => handleLogout()}
                sx={{":hover": {
                    backgroundColor: "rgba(0,0,0,0.06)",
                    transition: "background-color 100ms linear"
                }}}
            >
                <ExitToAppOutlinedIcon sx={{color: "#FFFFFF"}} />
            </IconButton>
        </Drawer>
    );
}

const MenuItemOpen = ({item}) => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const navigate = useNavigate();
    const selectedPage = useLocation().pathname;

    const handleNavigate = (route) => {
        if (route !== "") {
            navigate(route);
        }
    };

    return (
        <>
            <Tooltip title={item.label}>
                <ListItemButton
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        maxHeight: "2.5rem",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "::before": item.route === selectedPage ? {
                            content: "''",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "5px",
                            height: "100%",
                            backgroundColor: "#FFFFFF",
                            borderTopRightRadius: "2px",
                            borderBottomRightRadius: "2px",
                        } : {}
                    }}
                    onClick={() => {
                        setOpenSubMenu(!openSubMenu);
                        handleNavigate(item?.route ?? "");
                    }}
                >
                    <ListItemText sx={{color: "#FFFFFF"}}>{item.label}</ListItemText>
                    <>
                        {item.expanded ? (
                            openSubMenu ? (
                                <ExpandLess fontSize="small" sx={{color: "#FFFFFF"}}/>
                            ) : (
                                <ExpandMore fontSize="small" sx={{color: "#FFFFFF"}}/>
                            )
                        ) : (
                            item.icon("#FFFFFF")
                        )}
                    </>
                </ListItemButton>
            </Tooltip>
            <Collapse
                in={openSubMenu}
                timeout="auto"
                unmountOnExit
                sx={{width: "100%"}}
            >
                <List component="div" disablePadding sx={{width: "100%"}}>
                    {
                        item.routes.map((subitem, index) => (
                            <MenuItemOpen item={subitem} key={index}/>
                        ))
                    }
                </List>
            </Collapse>
        </>
    )
}

const MenuItemClose = ({item}) => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const navigate = useNavigate();
    const selectedPage = useLocation().pathname;

    const handleNavigate = (route) => {
        if (route !== "") {
            navigate(route);
        }
    };

    return (
        <>
            <Tooltip title={item.label} placement={"right"}>
                <ListItemButton
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        maxHeight: "2.5rem",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        "::before": item.route === selectedPage ? {
                            content: "''",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "5px",
                            height: "100%",
                            backgroundColor: "#FFFFFF",
                            borderTopRightRadius: "2px",
                            borderBottomRightRadius: "2px",
                        } : {}
                    }}
                    onClick={() => {
                        setOpenSubMenu(!openSubMenu);
                        handleNavigate(item?.route ?? "");
                    }}
                >
                    <>
                        {item.expanded ? (
                            openSubMenu ? (
                                item.icon("#FFFFFF")
                            ) : (
                                item.icon("#FFFFFF")
                            )
                        ) : (
                            item.icon("#FFFFFF")
                        )}
                    </>
                </ListItemButton>
            </Tooltip>
            <Collapse
                in={openSubMenu}
                timeout="auto"
                unmountOnExit
                sx={{width: "100%"}}
            >
                <List component="div" disablePadding sx={{width: "100%"}}>
                    {
                        item.routes.map((subitem, index) => (
                            <MenuItemClose item={subitem} key={index}/>
                        ))
                    }
                </List>
            </Collapse>
        </>
    )
}