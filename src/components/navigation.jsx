import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {Outlet, useNavigate} from "react-router";
import {routes} from "../routes.jsx";

export default function Navigation() {
    const navigate = useNavigate();

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
            <SpeedDial
                ariaLabel="Navigation Menü"
                sx={{position: 'fixed', bottom: 24, right: 24}}
                icon={<SpeedDialIcon/>}
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
            <Outlet/>
        </>
    );
}
