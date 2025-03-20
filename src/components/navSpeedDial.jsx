import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import {useNavigate} from "react-router"

const actions = [
    {icon: <PersonIcon/>, name: 'Über Mich', id: 1, route: '/person'},
    {icon: <DashboardIcon/>, name: 'Projekte', id: 2, route: '/projects'}, //Programmierungsprojekte, Game Jam Projekte, Ehrenamtliche Projekte
    {icon: <AutoAwesomeIcon/>, name: 'Skills', id: 3, route: '/skills'},
    {icon: <SportsEsportsIcon/>, name: 'Gaming-Bereich', id: 4, route: '/gaming'},
    {icon: <ContactEmergencyIcon/>, name: 'Kontakt', id: 5, route: '/contact'},
    {icon: <ReceiptLongIcon/>, name: 'Lebenslauf', id: 6, route: '/cv'},

];
export default function NavSpeedDial() {
    const navigate = useNavigate();
    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{position: 'absolute', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
        >
            {actions.sort((a, b) => b.id - a.id).map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => navigate(action.route)}
                />
            ))}
        </SpeedDial>
    );

}