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