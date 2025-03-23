import PersonIcon from "@mui/icons-material/Person";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PsychologyIcon from '@mui/icons-material/Psychology';
import * as React from "react";
import PersonPage from "./pages/PersonPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SkillPage from "./pages/SkillPage.jsx";


export const routes = [
    {icon: <PersonIcon/>, name: 'Über Mich', id: 1, route: '/person', component: <PersonPage/>},
    // {icon: <DashboardIcon/>, name: 'Projekte', id: 2, route: '/projects', component: <Projects/>}, //Programmierungsprojekte, Game Jam Projekte, Ehrenamtliche Projekte
    {icon: <PsychologyIcon/>, name: 'Skills', id: 3, route: '/skills', component: <SkillPage/>},
    // {icon: <SportsEsportsIcon/>, name: 'Gaming-Bereich', id: 4, route: '/gaming', component: <Gaming/>},
    {icon: <ContactEmergencyIcon/>, name: 'Kontakt', id: 5, route: '/contact', component: <ContactPage/>},
    // {icon: <ReceiptLongIcon/>, name: 'Lebenslauf', id: 6, route: '/cv', component: <CV/>},
];


