import {Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import {motion} from "framer-motion";
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function ContactPage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                backgroundColor: "#000",
                color: "#fff",
                pb: 8
            }}
        >
            <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                style={{textAlign: 'center'}}
            >
                <Typography variant="overline" color="grey.500">GET IN TOUCH</Typography>
                <Typography variant="h3" mb={4} sx={{background: 'linear-gradient(90deg, #ff4e50, #f9d423)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Me</Typography>

                <Paper elevation={3} sx={{p: 4, borderRadius: 3, maxWidth: 500, backgroundColor: '#111'}}>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<EmailIcon/>}
                                sx={{color: '#fff', borderColor: '#fff', '&:hover': {borderColor: '#f9d423', color: '#f9d423'}}}
                                href="mailto:timo.zander@mail.de"
                            >
                                E-Mail
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<WhatsAppIcon/>}
                                sx={{color: '#fff', borderColor: '#fff', '&:hover': {borderColor: '#25D366', color: '#25D366'}}}
                                href="https://wa.me/49123456789"
                                target="_blank"
                            >
                                WhatsApp
                            </Button>
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
                        <IconButton color="primary" href="https://linkedin.com/in/timo-zander-6446a322a" target="_blank">
                            <LinkedInIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" href="https://instagram.com/dieser_zander" target="_blank">
                            <InstagramIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary" href="https://facebook.com/100008370105149" target="_blank">
                            <FacebookIcon fontSize="large"/>
                        </IconButton>
                    </Stack>

                    <Typography variant="body2" align="center" mb={2}>Oder sende mir direkt eine Nachricht</Typography>

                    <TextField
                        label="Your Email"
                        variant="filled"
                        fullWidth
                        sx={{mb: 2, backgroundColor: '#fff', borderRadius: 1}}
                    />
                    <TextField
                        label="Your Message"
                        variant="filled"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{mb: 2, backgroundColor: '#fff', borderRadius: 1}}
                    />
                    <Button variant="contained" color="primary" fullWidth>Send Message</Button>
                </Paper>
            </motion.div>
        </Box>
    );
}
