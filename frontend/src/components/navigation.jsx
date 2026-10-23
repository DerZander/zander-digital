import {useState} from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../routes.jsx";

const navigationItems = [...routes].sort((a, b) => a.id - b.id);

export default function Navigation({isLight, onToggleTheme}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery("(min-width: 900px)");
    const [menuAnchor, setMenuAnchor] = useState(null);
    const navigateTo = (path) => {
        navigate(path);
        setMenuAnchor(null);
    };

    return (
        <AppBar className="site-header" position="sticky" elevation={0}>
            <Toolbar
                sx={{
                    width: "100%",
                    maxWidth: 1240,
                    minHeight: "72px !important",
                    mx: "auto",
                    px: {xs: 2.5, md: 4},
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Button
                    onClick={() => navigateTo("/")}
                    aria-label="Zur Startseite"
                    sx={{display: "flex", gap: 1.25, minWidth: 0, p: 0, color: "inherit", textTransform: "none"}}
                >
                    <span className="brand-mark">TZ</span>
                    <Typography sx={{fontSize: "0.96rem", fontWeight: 750, letterSpacing: "-0.03em"}}>
                        ZANDER<span style={{color: "var(--color-accent)"}}>.DIGITAL</span>
                    </Typography>
                </Button>

                {isDesktop ? (
                    <Box component="nav" aria-label="Hauptnavigation" sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                        {navigationItems.map((item) => {
                            const active = location.pathname === item.route;
                            return (
                                <Button
                                    key={item.route}
                                    onClick={() => navigateTo(item.route)}
                                    startIcon={item.icon}
                                    sx={{
                                        px: 1.25,
                                        color: active ? "var(--color-accent)" : "var(--color-muted)",
                                        fontSize: "0.84rem",
                                        fontWeight: active ? 700 : 500,
                                        textTransform: "none",
                                        "& .MuiButton-startIcon": {mr: 0.6},
                                        "&:hover": {color: "var(--color-text)", background: "rgba(255,255,255,0.05)"},
                                    }}
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </Box>
                ) : (
                    <>
                        <IconButton
                            aria-label="Navigation öffnen"
                            aria-controls={menuAnchor ? "site-navigation-menu" : undefined}
                            aria-haspopup="true"
                            onClick={(event) => setMenuAnchor(event.currentTarget)}
                            sx={{color: "var(--color-text)"}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="site-navigation-menu"
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={() => setMenuAnchor(null)}
                            slotProps={{paper: {sx: {mt: 1, minWidth: 210, bgcolor: "var(--color-surface)", color: "var(--color-text)"}}}}
                        >
                            {navigationItems.map((item) => (
                                <MenuItem
                                    key={item.route}
                                    selected={location.pathname === item.route}
                                    onClick={() => navigateTo(item.route)}
                                >
                                    <Box sx={{display: "flex", alignItems: "center", gap: 1.5}}>
                                        {item.icon}
                                        {item.name}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
                <Tooltip title={isLight ? "Zum Dunkelmodus wechseln" : "Zum Hellmodus wechseln"}>
                    <IconButton
                        aria-label={isLight ? "Zum Dunkelmodus wechseln" : "Zum Hellmodus wechseln"}
                        onClick={onToggleTheme}
                        sx={{
                            ml: isDesktop ? 1 : 0,
                            color: "var(--color-accent)",
                            border: "1px solid rgba(var(--color-accent-rgb), 0.22)",
                        }}
                    >
                        {isLight ? <DarkModeIcon/> : <LightModeIcon/>}
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
