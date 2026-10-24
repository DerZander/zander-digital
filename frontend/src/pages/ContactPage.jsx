import {ArrowForward, Email as EmailIcon} from "@mui/icons-material";
import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {motion as Motion} from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/GitHub";

const socialLinks = [
    {name: "LinkedIn", href: "https://linkedin.com/in/timo-zander-6446a322a", icon: <LinkedInIcon/>},
    {name: "GitHub", href: "https://github.com/DerZander", icon: <GithubIcon/>},
    {name: "Instagram", href: "https://instagram.com/dieser_zander", icon: <InstagramIcon/>},
    {name: "Facebook", href: "https://facebook.com/100008370105149", icon: <FacebookIcon/>},
];

export default function ContactPage() {
    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                minHeight: "calc(100vh - 80px)",
                alignItems: "center",
                justifyContent: "center",
                px: {xs: 2.5, sm: 4},
                py: {xs: 6, md: 8},
                color: "var(--color-text)",
            }}
        >
            <Motion.div
                initial={{opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                style={{width: "100%", maxWidth: 680}}
            >
                <Card
                    elevation={0}
                    sx={{
                        overflow: "hidden",
                        border: "1px solid rgba(var(--color-border-rgb),0.14)",
                        borderRadius: 4,
                        bgcolor: "rgba(var(--color-surface-rgb),0.76)",
                        color: "var(--color-text)",
                    }}
                >
                    <CardContent sx={{p: {xs: 3, sm: 5}, "&:last-child": {pb: {xs: 3, sm: 5}}}}>
                        <Typography
                            sx={{
                                color: "var(--color-accent)",
                                fontSize: "0.78rem",
                                fontWeight: 750,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                mb: 1.5,
                            }}
                        >
                            Kontakt
                        </Typography>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: {xs: "2.5rem", sm: "3.25rem"},
                                fontWeight: 760,
                                letterSpacing: "-0.06em",
                                lineHeight: 1.05,
                                mb: 2,
                            }}
                        >
                            Lass uns ins Gespräch kommen.
                        </Typography>
                        <Typography sx={{color: "var(--color-muted)", fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.8, mb: 3.5}}>
                            Du hast eine Frage, möchtest über ein Projekt sprechen oder dich einfach
                            austauschen? Schreib mir gern eine E-Mail.
                        </Typography>

                        <Button
                            component="a"
                            href="mailto:mail@zander.digital"
                            variant="contained"
                            size="large"
                            startIcon={<EmailIcon/>}
                            endIcon={<ArrowForward/>}
                            sx={{
                                width: {xs: "100%", sm: "auto"},
                                px: 2.5,
                                py: 1.4,
                                mb: 4.5,
                                fontWeight: 700,
                                textTransform: "none",
                            }}
                        >
                            mail@zander.digital
                        </Button>

                        <Box sx={{borderTop: "1px solid rgba(var(--color-border-rgb),0.14)", pt: 3}}>
                            <Typography variant="subtitle2" fontWeight={700} mb={1.75}>
                                Weitere Profile
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1.25}>
                                {socialLinks.map((link) => (
                                    <Button
                                        key={link.name}
                                        component="a"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        startIcon={link.icon}
                                        sx={{
                                            borderColor: "rgba(var(--color-border-rgb),0.2)",
                                            color: "var(--color-text)",
                                            textTransform: "none",
                                            "&:hover": {
                                                borderColor: "var(--color-accent)",
                                                color: "var(--color-accent)",
                                                bgcolor: "rgba(var(--color-accent-rgb),0.06)",
                                            },
                                        }}
                                    >
                                        {link.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Motion.div>
        </Box>
    );
}
