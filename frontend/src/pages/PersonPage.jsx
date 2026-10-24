import {ArrowForward, CodeRounded, LightbulbOutlined, PsychologyOutlined, SchoolOutlined} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardContent, Chip, IconButton, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {motion as Motion} from "framer-motion";
import {Link} from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import meImage from "../assets/images/me.jpeg";
import earworms from "../data/earworms.json";

const hobbies = [
    "🔥 Feuerwehr",
    "🎲 DnD-Abenteuer",
    "🖨️ 3D-Druck",
    "🎮 Gaming",
    "🏍️ Motorrad",
    "🌍 Reisen",
    "🐈 Katzen",
    "☕ Kaffee",
];

function OhrwurmPlayer() {
    const [currentSong, setCurrentSong] = useState(0);
    const songs = earworms.filter((song) => song.is_active);

    if (songs.length === 0) {
        return null;
    }

    const song = songs[currentSong % songs.length];

    const changeSong = (direction) => {
        setCurrentSong((previous) => (previous + direction + songs.length) % songs.length);
    };

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1}}>
            {songs.length > 1 && (
                <IconButton aria-label="Vorheriger Ohrwurm" onClick={() => changeSong(-1)} sx={{color: "var(--color-text)"}}>
                    <KeyboardArrowLeft fontSize="large"/>
                </IconButton>
            )}
            <Box sx={{minWidth: 0, textAlign: "center"}}>
                <Typography variant="subtitle1" fontWeight={700} mb={1}>Mein aktueller Ohrwurm</Typography>
                <iframe
                    title={`Spotify-Player: ${song.name}`}
                    src={`https://open.spotify.com/embed/track/${song.spotify_id}?utm_source=generator`}
                    width="300"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{maxWidth: "100%", borderRadius: "12px"}}
                />
            </Box>
            {songs.length > 1 && (
                <IconButton aria-label="Nächster Ohrwurm" onClick={() => changeSong(1)} sx={{color: "var(--color-text)"}}>
                    <KeyboardArrowRight fontSize="large"/>
                </IconButton>
            )}
        </Box>
    );
}

const profileCards = [
    {
        icon: <CodeRounded/>,
        title: "Beruf",
        text: "Als Softwareentwickler arbeite ich vor allem mit Java und Spring Boot. Mein Schwerpunkt liegt auf Backend-Anwendungen, die Kreditentscheidungen und Risikobewertungen unterstützen. Auch mit React setze ich moderne Weboberflächen um.",
    },
    {
        icon: <PsychologyOutlined/>,
        title: "Was mich antreibt",
        text: "Knifflige Probleme wecken meinen Ehrgeiz – ob im Arbeitsalltag oder bei Advent of Code. Ich bin neugierig, bleibe hartnäckig an einer Lösung dran und freue mich, wenn daraus etwas entsteht, das Menschen wirklich weiterhilft.",
    },
    {
        icon: <SchoolOutlined/>,
        title: "Jugendarbeit",
        text: "Die Feuerwehr-Jugendarbeit liegt mir besonders am Herzen. Auf Stadtebene treten wir gemeinsam als Team unter dem Motto „Next Generation“ auf. Es bedeutet mir viel, junge Menschen zu begleiten, ihre Begeisterung für die Feuerwehr zu stärken und gemeinsam mit dem Team einen Ort zu schaffen, an dem sie sich entwickeln und dazugehören können.",
    },
];

export default function PersonPage() {
    return (
        <Box component="main" sx={{width: "100%", maxWidth: 1160, mx: "auto", px: {xs: 2.5, sm: 4}, py: {xs: 5, md: 8}, color: "var(--color-text)"}}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {xs: "1fr", md: "minmax(0, 1.4fr) minmax(220px, 0.6fr)"},
                    alignItems: "center",
                    gap: {xs: 4, md: 8},
                    mb: {xs: 7, md: 9},
                }}
            >
                <Motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.55}}>
                    <Typography sx={{color: "var(--color-accent)", fontSize: "0.78rem", fontWeight: 750, letterSpacing: "0.15em", textTransform: "uppercase", mb: 1.5}}>
                        Ein bisschen über mich
                    </Typography>
                    <Typography component="h1" sx={{fontSize: {xs: "2.8rem", sm: "3.6rem"}, fontWeight: 760, letterSpacing: "-0.065em", lineHeight: 1.04, mb: 2}}>
                        Neugierig bleiben.
                        <br/>
                        <Box component="span" sx={{color: "var(--color-accent)"}}>Lösungen finden.</Box>
                    </Typography>
                    <Typography sx={{maxWidth: 650, color: "var(--color-muted)", fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.8}}>
                        Ich bin Timo Zander – Softwareentwickler und Jugendwart. Mich motiviert es,
                        mich in knifflige Fragen hineinzudenken, Neues auszuprobieren und aus Ideen
                        funktionierende Lösungen zu machen. Dabei bringe ich gern Motivation,
                        Freundlichkeit und eine gute Portion Hartnäckigkeit mit.
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{mt: 3}}>
                        <Chip icon={<CodeRounded/>} label="Spring Boot" variant="outlined" color="primary"/>
                        <Chip icon={<CodeRounded/>} label="React" variant="outlined" color="primary"/>
                        <Chip icon={<LightbulbOutlined/>} label="Lösungsorientiert" variant="outlined" color="primary"/>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{mt: 3}}>
                        <Button component={Link} to="/projects" variant="contained" endIcon={<ArrowForward/>}>
                            Projekte ansehen
                        </Button>
                        <Button component={Link} to="/contact" variant="outlined" sx={{borderColor: "rgba(var(--color-border-rgb),0.2)", color: "var(--color-text)"}}>
                            Kontakt
                        </Button>
                    </Stack>
                </Motion.div>

                <Motion.div
                    initial={{opacity: 0, scale: 0.96}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.65, delay: 0.1}}
                    style={{justifySelf: "center"}}
                >
                    <Avatar
                        src={meImage}
                        alt="Timo Zander"
                        sx={{
                            width: {xs: 190, sm: 230, md: 260},
                            height: {xs: 190, sm: 230, md: 260},
                            border: "1px solid rgba(var(--color-accent-rgb),0.55)",
                            boxShadow: "14px 14px 0 rgba(var(--color-accent-rgb),0.08), 0 24px 70px rgba(0,0,0,0.12)",
                        }}
                    />
                </Motion.div>
            </Box>

            <Box component="section" aria-labelledby="about-work-heading" sx={{mb: {xs: 7, md: 9}}}>
                <Typography id="about-work-heading" component="h2" variant="h4" sx={{fontWeight: 730, letterSpacing: "-0.04em", mb: 3}}>
                    Was mich beschäftigt
                </Typography>
                <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", md: "repeat(3, minmax(0, 1fr))"}, gap: 2}}>
                    {profileCards.map((card) => (
                        <Card
                            key={card.title}
                            elevation={0}
                            sx={{
                                height: "100%",
                                border: "1px solid rgba(var(--color-border-rgb),0.12)",
                                borderRadius: 3,
                                bgcolor: "rgba(var(--color-surface-rgb),0.76)",
                                color: "var(--color-text)",
                            }}
                        >
                            <CardContent sx={{p: {xs: 2.5, md: 3}, "&:last-child": {pb: {xs: 2.5, md: 3}}}}>
                                <Box sx={{display: "flex", width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: 2, color: "var(--color-accent)", bgcolor: "rgba(var(--color-accent-rgb),0.09)", mb: 2}}>
                                    {card.icon}
                                </Box>
                                <Typography component="h3" variant="h6" fontWeight={700} mb={1}>
                                    {card.title}
                                </Typography>
                                <Typography sx={{color: "var(--color-muted)", lineHeight: 1.75}}>
                                    {card.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Accordion
                    elevation={0}
                    sx={{
                        mt: 2,
                        border: "1px solid rgba(var(--color-border-rgb),0.12)",
                        borderRadius: "12px !important",
                        bgcolor: "rgba(var(--color-surface-rgb),0.76)",
                        color: "var(--color-text)",
                        "&:before": {display: "none"},
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMore sx={{color: "var(--color-text)"}}/>}>
                        <Typography fontWeight={700}>Einblick in meine Bachelorarbeit</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{color: "var(--color-muted)", lineHeight: 1.75}}>
                        Mein Bachelorstudium der Wirtschaftsinformatik habe ich mit dem Bachelor of
                        Science abgeschlossen. In meiner Bachelorarbeit entwickelte ich einen
                        bestehenden Service für Bankenratings mit Spring Boot und React weiter und
                        strukturierte dabei ein umfangreiches Datenbankschema neu.
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box component="section" aria-labelledby="about-personal-heading">
                <Typography id="about-personal-heading" component="h2" variant="h4" sx={{fontWeight: 730, letterSpacing: "-0.04em", mb: 3}}>
                    Und abseits vom Code?
                </Typography>
                <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", md: "1fr 1fr"}, alignItems: "center", gap: 3, p: {xs: 2.5, sm: 4}, border: "1px solid rgba(var(--color-border-rgb),0.12)", borderRadius: 4, bgcolor: "rgba(var(--color-surface-rgb),0.58)"}}>
                    <Box>
                        <Typography sx={{color: "var(--color-muted)", lineHeight: 1.8, mb: 2.5}}>
                            Wenn ich nicht gerade an einer kniffligen Aufgabe tüftle, verbringe ich
                            meine Zeit gern bei der Feuerwehr, am Spieltisch oder mit einem meiner
                            vielen Interessen. Neugier hört für mich nicht beim Programmieren auf.
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            {hobbies.map((hobby) => (
                                <Chip key={hobby} label={hobby} variant="outlined" sx={{borderColor: "rgba(var(--color-border-rgb),0.18)", color: "var(--color-text)"}}/>
                            ))}
                        </Stack>
                    </Box>
                    <OhrwurmPlayer/>
                </Box>
            </Box>
        </Box>
    );
}
