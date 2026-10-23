import {ArrowForward, CodeRounded} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../routes.jsx";
import meImage from "../assets/images/me.jpeg";

const landingLinks = [...routes].sort((a, b) => a.id - b.id);

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box component="main" className="landing">
            <Box className="landing-grid">
                <Box className="landing-intro">
                    <Box className="landing-eyebrow">Zander.digital · persönlich & digital</Box>
                    <Typography component="h1" className="landing-title">
                        Hi, ich bin
                        <br/>
                        Timo <span>Zander.</span>
                    </Typography>
                    <Typography className="landing-copy">
                        Softwareentwickler, Problemlöser und kreativer Kopf. Ich entwickle digitale
                        Lösungen mit Neugier, Teamgeist und dem Blick fürs Ganze.
                    </Typography>
                    <Box className="landing-actions">
                        <Button
                            className="landing-primary"
                            variant="contained"
                            endIcon={<ArrowForward/>}
                            onClick={() => navigate("/person")}
                        >
                            Über mich
                        </Button>
                        <Button
                            className="landing-secondary"
                            variant="outlined"
                            startIcon={<CodeRounded/>}
                            onClick={() => navigate("/projects")}
                        >
                            Projekte ansehen
                        </Button>
                    </Box>
                </Box>

                <Box className="landing-portrait-wrap">
                    <img className="landing-portrait" src={meImage} alt="Timo Zander am Wasser" />
                    <Box className="portrait-caption">
                        <strong>Softwareentwickler</strong>
                        <span>und Jugendwart</span>
                    </Box>
                </Box>
            </Box>

            <Box className="landing-links" aria-label="Weitere Seiten">
                {landingLinks.map((item) => (
                    <a key={item.route} href={`#${item.route}`} onClick={(event) => {
                        event.preventDefault();
                        navigate(item.route);
                    }}>
                        {item.icon}
                        {item.name}
                    </a>
                ))}
            </Box>
        </Box>
    );
}
