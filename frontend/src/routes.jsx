import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PsychologyIcon from '@mui/icons-material/Psychology';
import * as React from "react";
import Person from "./pages/person.jsx";
import Projects from "./pages/projects.jsx";
import Skills from "./pages/skills.jsx";
import Gaming from "./pages/gaming.jsx";
import Contact from "./pages/contact.jsx";
import CV from "./pages/cv.jsx";


export const routes = [
    {icon: <PersonIcon/>, name: 'Über Mich', id: 1, route: '/person', component: <Person/>},
    {icon: <DashboardIcon/>, name: 'Projekte', id: 2, route: '/projects', component: <Projects/>}, //Programmierungsprojekte, Game Jam Projekte, Ehrenamtliche Projekte
    {icon: <PsychologyIcon/>, name: 'Skills', id: 3, route: '/skills', component: <Skills/>},
    {icon: <SportsEsportsIcon/>, name: 'Gaming-Bereich', id: 4, route: '/gaming', component: <Gaming/>},
    {icon: <ContactEmergencyIcon/>, name: 'Kontakt', id: 5, route: '/contact', component: <Contact/>},
    {icon: <ReceiptLongIcon/>, name: 'Lebenslauf', id: 6, route: '/cv', component: <CV/>},
];


