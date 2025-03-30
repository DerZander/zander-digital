import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {Outlet, useLocation, useNavigate} from "react-router";
import {routes} from "../routes.jsx";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const showNavigation = location.pathname !== "/";

    return (
        <>
            <style>{`
                body { 
                    overflow-x: hidden; 
                    overflow-y: auto; 
                    margin: 0; 
                    padding: 0;
                }
                html, body, #root {
                    height: 100%;
                    max-width: 100vw;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
            {showNavigation && (
                <SpeedDial
                    ariaLabel="Navigation Menü"
                    sx={{position: 'fixed', bottom: 24, right: 24}}
                    icon={<MenuIcon/>}
                >
                    {routes.sort((a, b) => b.id - a.id).map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => navigate(action.route)}
                        />
                    ))}
                </SpeedDial>
            )}
            <Outlet/>
        </>
    );
}
