import {Box, Button, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import React from "react";
import {motion} from "framer-motion";
import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GithubIcon from '@mui/icons-material/GitHub';

export default function ContactPage() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Box sx={{position: "relative", minHeight: "100vh", overflow: "hidden"}}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onHover: {enable: true, mode: "repulse"},
                            resize: true
                        },
                        modes: {
                            repulse: {distance: 100, duration: 0.4}
                        }
                    },
                    particles: {
                        number: {value: 50, density: {enable: true, area: 800}},
                        color: {value: ["#f9d423", "#ff4e50"]},
                        shape: {type: "circle"},
                        opacity: {value: 0.3, random: true},
                        size: {value: 4, random: true},
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            random: true,
                            straight: false,
                            outMode: "out"
                        }
                    },
                    detectRetina: true
                }}
                style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0}}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    color: "#fff",
                    pb: 8,
                    minHeight: "100vh"
                }}
            >
                <motion.div
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    style={{textAlign: 'center'}}
                >
                    <Typography variant="overline" color="grey.500">GET IN TOUCH</Typography>
                    <Typography variant="h3" mb={4} sx={{background: 'white', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>
                    <Typography variant="h3" mb={4} sx={{background: 'linear-gradient(90deg, #ff4e50, #f9d423)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>
                    <Typography variant="h3" mb={4} sx={{background: 'linear-gradient(90deg, #00c6ff, #0072ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>
                    <Typography variant="h3" mb={4} sx={{background: 'linear-gradient(90deg, #7b2ff7, #f107a3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>
                    <Typography variant="h3" mb={4} sx={{background: 'linear-gradient(90deg, #ff4e50, #f9d423, #6dd5ed, #2980b9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>

                    <Paper elevation={3} sx={{p: 4, borderRadius: 3, maxWidth: 500, backgroundColor: 'rgba(17, 17, 17, 0.85)', backdropFilter: 'blur(10px)'}}>
                        <Grid container mb={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<EmailIcon/>}
                                sx={{color: '#fff', borderColor: '#fff', '&:hover': {borderColor: '#f9d423', color: '#f9d423'}}}
                                href="mailto:mail@zander.digital"
                            >
                                E-Mail
                            </Button>
                        </Grid>

                        <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
                            <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.9}}>
                                <IconButton color="primary" href="https://linkedin.com/in/timo-zander-6446a322a" target="_blank" title="LinkedIn">
                                    <LinkedInIcon fontSize="large"/>
                                </IconButton>
                            </motion.div>
                            <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.9}}>
                                <IconButton color="primary" href="https://instagram.com/dieser_zander" target="_blank" title="Instagram">
                                    <InstagramIcon fontSize="large"/>
                                </IconButton>
                            </motion.div>
                            <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.9}}>
                                <IconButton color="primary" href="https://github.com/DerZander" target="_blank" title="Github">
                                    <GithubIcon fontSize="large"/>
                                </IconButton>
                            </motion.div>
                            <motion.div whileHover={{scale: 1.2}} whileTap={{scale: 0.9}}>
                                <IconButton color="primary" href="https://facebook.com/100008370105149" target="_blank" title="Facebook">
                                    <FacebookIcon fontSize="large"/>
                                </IconButton>
                            </motion.div>
                        </Stack>
                    </Paper>
                </motion.div>
            </Box>
        </Box>
    );
}
