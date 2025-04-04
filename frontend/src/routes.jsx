import PersonIcon from "@mui/icons-material/Person";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderIcon from '@mui/icons-material/Folder';
import * as React from "react";
import PersonPage from "./pages/PersonPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SkillPage from "./pages/SkillPage.jsx";
import ProjectsPage from "./pages/ProjectPage.jsx";
import SignpostIcon from '@mui/icons-material/Signpost';
import TimelineTreePage from "./pages/TimelinePage.jsx";

export const routes = [
    {icon: <PersonIcon/>, name: 'Über Mich', id: 1, route: '/person', component: <PersonPage/>},
    {icon: <PsychologyIcon/>, name: 'Skills', id: 2, route: '/skills', component: <SkillPage/>},
    {icon: <FolderIcon/>, name: 'Projekte', id: 3, route: '/projects', component: <ProjectsPage/>},
    {icon: <ContactEmergencyIcon/>, name: 'Kontakt', id: 5, route: '/contact', component: <ContactPage/>},
    {icon: <SignpostIcon/>, name: 'Werdegang', id: 5, route: '/achivements', component: <TimelineTreePage/>},

    // {icon: <DashboardIcon/>, name: 'Projekte', id: 2, route: '/projects', component: <Projects/>}, //Programmierungsprojekte, Game Jam Projekte, Ehrenamtliche Projekte
    // {icon: <SportsEsportsIcon/>, name: 'Gaming-Bereich', id: 4, route: '/gaming', component: <Gaming/>},
    // {icon: <ReceiptLongIcon/>, name: 'Lebenslauf', id: 6, route: '/cv', component: <CV/>},
];


