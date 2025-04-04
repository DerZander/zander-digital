import {Avatar, Box, Card, CardContent, CircularProgress, Grid, LinearProgress, Typography,} from "@mui/material";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {AccountTree as AccountTreeIcon, Build as BuildIcon, Cloud as CloudIcon, Code as CodeIcon, Star as StarIcon, Storage as StorageIcon, Terminal as TerminalIcon,} from "@mui/icons-material";
import {keyframes} from '@emotion/react';
import {blue, blueGrey} from "@mui/material/colors";
import {API_URL} from "../config.js";
import {formatDate} from "../utils/utils.jsx";

const rainbowAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const blueGlowAnimation = keyframes`
    0% {
        box-shadow: 0 0 10px ${blue[500]};
    }
    50% {
        box-shadow: 0 0 25px ${blue[500]};
    }
    100% {
        box-shadow: 0 0 10px ${blue[500]};
    }
`;

const skillIcon = (category) => {
    switch (category) {
        case "Language":
            return <CodeIcon/>;
        case "Database":
            return <StorageIcon/>;
        case "Framework":
            return <AccountTreeIcon/>;
        case "TerminalIcon":
            return <TerminalIcon/>;
        case "Service":
            return <CloudIcon/>;
        case "Tool":
            return <BuildIcon/>;
        default:
            return <CodeIcon/>;
    }
}

export const calculateLevelFromXP = (xp) => {
    return Math.floor(xp / 100); // Beispiel: 0-99 = Level 0, 100-199 = Level 1, ...
};

const calculateProgressToNextLevel = (xp) => {
    if (!xp || xp < 1) return 0;

    const level = calculateLevelFromXP(xp);
    if (level >= 10) return 100;

    const currentLevelStartXP = level * 100;
    const nextLevelStartXP = (level + 1) * 100;
    const currentProgressXP = xp - currentLevelStartXP;
    const nextLevelXPGap = nextLevelStartXP - currentLevelStartXP;

    const progress = (currentProgressXP / nextLevelXPGap) * 100;
    return progress > 100 ? 100 : progress;
};

export const getLevelColor = (xp) => {
    const level = calculateLevelFromXP(xp);
    if (level >= 10) {
        // Regenbogen-Gradient für maximale Stufe
        return "linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet, red)";
    } else if (level >= 9) {
        // Gold für Level 9
        return "gold";
    } else if (level >= 8) {
        // Silber für Level 8
        return "silver";
    } else if (level >= 6) {
        // Kupferfarben ab Level 6
        return "#b87333";
    } else {
        return "none"; // Kein besonderer Rahmen
    }
};

const cardColor = (color) => {
    const use_color = false;
    return use_color ? color : blueGrey[900];

}

export function SkillCardBackside({skill}) {
    return (
        <>
            {skill.is_favorite && (
                <StarIcon sx={{position: "absolute", top: 8, right: 8, color: "gold", fontSize: 30}}/>
            )}
            <Typography variant="subtitle1" mb={0.5}>{skill.name}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mb={0.5}>
                <Typography variant="caption">
                    Seit: {formatDate(skill.since)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{color: "#fff"}}>Level {calculateLevelFromXP(skill.xp) >= 10 ? "Max." : calculateLevelFromXP(skill.xp)}</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={calculateProgressToNextLevel(skill.xp)}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    animation: `${blueGlowAnimation} 2s infinite alternate`,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: blue[500],
                    },
                }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography variant="caption" color="text.secondary" sx={{color: "#fff"}}>{skill.description}</Typography>
            </Box>
        </>
    );
}

function FlippingSkillCard({skill}) {
    const [flipped, setFlipped] = useState(false);
    const borderStyle = getLevelColor(skill.xp);


    return (
        <Box
            sx={{
                perspective: "1000px",
                width: {xs: "180px", sm: "220px"},
                height: "180px",
                margin: "10px auto",
                position: "relative"
            }}
            onClick={() => setFlipped(!flipped)}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformOrigin: "center center",
                    top: 0,
                    left: 0,
                    willChange: "transform"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: 3,
                        padding: borderStyle.startsWith("linear-gradient") ? "3px" : "0",
                        background: borderStyle.startsWith("linear-gradient") ? borderStyle : "none",
                        backgroundSize: "400% 400%",
                        animation: borderStyle.startsWith("linear-gradient") ? `${rainbowAnimation} 5s ease infinite` : "none",
                        border: !borderStyle.startsWith("linear-gradient") && borderStyle !== "none" ? `3px solid ${borderStyle}` : "none",
                        top: 0,
                        left: 0,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Card
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 3,
                            bgcolor: cardColor(skill.color),
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            position: "relative",
                            boxSizing: "border-box"
                        }}
                    >
                        {skill.is_favorite && (
                            <StarIcon sx={{position: "absolute", top: 8, right: 8, color: "gold", fontSize: 30}}/>
                        )}
                        <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px !important", width: "100%", height: "100%", boxSizing: "border-box"}}>
                            <Avatar sx={{bgcolor: "#fff", color: cardColor(skill.color), mb: 1}}>
                                {skillIcon(skill.category.name)}
                            </Avatar>
                            <Typography variant="h6" textAlign="center">{skill.name}</Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Back Side */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        transformOrigin: "center center",
                        bgcolor: cardColor(skill.color),
                        color: "#fff",
                        borderRadius: 3,
                        padding: 1,
                        top: 0,
                        left: 0,
                        boxSizing: "border-box"
                    }}
                >
                    <CardContent sx={{padding: "8px !important", width: "100%", height: "100%", boxSizing: "border-box"}}>
                        <SkillCardBackside skill={skill}/>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

// erstelle mir einen ladebildschirm. es soll ein fisch um einen kreis schwimmen

function SkillGridPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/skills/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Fehler: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setSkills(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Die Skills konnten nicht geladen werden.");
                setLoading(false);
            });
    }, []);


    const sortedSkills = [...skills]
        .sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0))
        .sort((a, b) => Math.floor(Math.log2(b.xp)) - Math.floor(Math.log2(a.xp)));

    return (
        <Box p={4}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                Skills
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={6}>
                    <CircularProgress color="primary"/>
                </Box>
            ) : error ? (
                <Typography color="error" align="center" mt={4}>
                    {error}
                </Typography>
            ) : (
                <Grid container spacing={1} justifyContent="center">
                    {sortedSkills.map((skill, index) => (
                        <Grid item xs={6} sm={6} md={3} l={2} key={index} display="flex" justifyContent="center">
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                            >
                                <FlippingSkillCard skill={skill} index={index}/>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default function SkillPage() {
    return (
        <SkillGridPage/>
    );
}
