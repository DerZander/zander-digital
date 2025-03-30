import {Box, Button, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import {useCallback} from "react";
import {routes} from "../routes.jsx";

export default function LandingPage() {
    const navigate = useNavigate();

    const particlesInit = useCallback(async (main) => {
        await loadFull(main);
    }, []);

    const navigationButtonStyle = {
        borderRadius: 100,
        m: 1,
        minWidth: 60,
        minHeight: 60,
        position: "relative",
        overflow: "visible",
    };

    return (
        <Box sx={{height: "100vh", width: "100%", overflow: "hidden", position: "relative"}}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    particles: {
                        number: {value: 50, density: {enable: true, area: 800}},
                        color: {value: ["#00c6ff", "#0072ff"]},
                        shape: {type: "circle"},
                        opacity: {value: 0.4, random: true},
                        size: {value: 5, random: true},
                        move: {enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: "out"}
                    },
                    interactivity: {
                        events: {onHover: {enable: true, mode: "repulse"}, resize: true},
                        modes: {repulse: {distance: 100, duration: 0.4}}
                    },
                    detectRetina: true
                }}
                style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
            />

            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "#fff",
                    px: 2,
                }}
            >
                <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
                    <Typography variant="h2" gutterBottom>
                        Willkommen auf Zander.digital
                    </Typography>
                    <Typography variant="h5" mb={4}>
                        Softwareentwicklung. Kreativität. Leidenschaft.
                    </Typography>

                    {routes.sort((a, b) => a.id - b.id).map((action) => (
                        <Box
                            key={action.name}
                            sx={{position: "relative", display: "inline-block", m: 1}}
                        >
                            <Button
                                sx={navigationButtonStyle}
                                variant="contained"
                                size="large"
                                onClick={() => navigate(action.route)}
                            >
                                {action.icon}
                            </Button>
                            <Typography
                                variant="caption"
                                sx={{
                                    position: "absolute",
                                    top: "110%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    whiteSpace: "nowrap",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    pointerEvents: "none",
                                }}
                                className="button-label"
                            >
                                {action.name}
                            </Typography>
                            <style>
                                {`
                                button:hover + .button-label {
                                    opacity: 1;
                                }
                            `}
                            </style>
                        </Box>
                    ))}
                </motion.div>
            </Box>
        </Box>
    );
}
