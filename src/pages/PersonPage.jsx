import {Avatar, Box, Chip, IconButton, Stack, Typography} from "@mui/material";
import meImage from "../assets/images/me.jpeg";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {API_URL} from "../config.js";

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

const const_songs = [
    {name: "Wackelkontakt", spotify_id: "4x7j9ed3FRH6CHj27kiTQ3"},
    {name: "ALL IN (Lieblingslieder)", spotify_id: "3VIEbpdr64a1mNSa8MqBAm"},
    {name: "Immer Wieder", spotify_id: "2SuOdpmDdTk4U0aWH5SQDW"},
];

function OhrwurmPlayer() {
    const [currentSong, setCurrentSong] = useState(0);
    const [dbSongs, setDbSongs] = useState([]);


    useEffect(() => {
        fetch(`${API_URL}/earworms/active`)  // Im Docker ggf. Backend-IP oder Domain
            .then((res) => res.json())
            .then((data) => setDbSongs(data))
            .catch((err) => console.error(err));
    }, []);

    const songs = dbSongs.length > 0 ? dbSongs : const_songs;

    const handleNext = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length);
    };

    const handleBack = () => {
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <IconButton onClick={handleBack} sx={{ml: 2, top: "20px"}}>
                <KeyboardArrowLeft fontSize="large" sx={{color: "#ffffff"}}/>
            </IconButton>

            <Box textAlign="center">
                <Typography variant="h6" mb={1}>Aktueller Ohrwurm:</Typography>
                <iframe
                    src={`https://open.spotify.com/embed/track/${songs[currentSong].spotify_id}?utm_source=generator`}
                    width="300"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{borderRadius: "12px"}}
                ></iframe>
            </Box>

            <IconButton onClick={handleNext} sx={{ml: 2, top: "20px"}}>
                <KeyboardArrowRight fontSize="large" sx={{color: "#ffffff"}}/>
            </IconButton>
        </Box>
    );
}


export default function PersonPage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
                color: "#fff",
                position: "relative"
            }}
        >
            <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 1, type: "spring", stiffness: 120}}
            >
                <Avatar
                    src={meImage}
                    sx={{width: 200, height: 200, border: "5px solid #fff", boxShadow: 4, mb: 3}}
                />
            </motion.div>

            <Typography variant="h3" gutterBottom>
                Timo Zander
            </Typography>
            <Typography variant="h6" gutterBottom>
                Softwareentwickler & Jugendwart
            </Typography>
            <Typography variant="body1" align="center" maxWidth="600px" mb={4}>
                Ich liebe es, Probleme kreativ zu lösen — ob im Code, bei Jugendfeuerwehr-Events oder am Spieltisch.
                Immer dabei: Neugier, Teamgeist und ein kleiner Funken Abenteuerlust.
            </Typography>

            <Typography variant="h5" gutterBottom>Hobbys & Leidenschaften</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" mb={4}>
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={index}
                        whileHover={{scale: 1.1, rotate: 2}}
                        whileTap={{scale: 0.95}}
                    >
                        <Chip label={hobby} color="primary" variant="outlined" sx={{fontSize: '1rem', padding: '8px'}}/>
                    </motion.div>
                ))}
            </Stack>

            <OhrwurmPlayer/>
        </Box>
    );
}
