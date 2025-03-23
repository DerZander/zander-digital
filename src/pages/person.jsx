import {Avatar, Box, Typography} from "@mui/material";
import meImage from "../assets/images/me.jpeg";

function ShortPersonPage() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                padding: 4,
            }}
        >
            <Avatar
                src={meImage}
                sx={{width: 200, height: 200, border: "5px solid #fff", boxShadow: 4, mb: 3}}
            />
            <Typography variant="h3" gutterBottom>
                Timo Zander
            </Typography>
            <Typography variant="h6" gutterBottom>
                Softwareentwickler & Jugendwart
            </Typography>
            <Typography variant="body1" align="center" maxWidth="600px">
                Leidenschaftlicher Fullstack-Entwickler mit Fokus auf React, Spring Boot und Datenanalyse.
                Nebenberuflich Jugendwart bei der Feuerwehr und begeistert von DnD, 3D-Druck, Gaming und Teamarbeit.
            </Typography>
        </Box>
    );
}


export default function PersonPage() {
    return (<ShortPersonPage/>);
}