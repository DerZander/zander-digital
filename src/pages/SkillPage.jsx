import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography,} from "@mui/material";
import {useState} from "react";
import skills from "../data/skills.json";
import {motion} from "framer-motion";
import {AccountTree as AccountTreeIcon, Build as BuildIcon, Cloud as CloudIcon, Code as CodeIcon, Star as StarIcon, Storage as StorageIcon, Terminal as TerminalIcon,} from "@mui/icons-material";

import {keyframes} from '@emotion/react';
import {blue, blueGrey} from "@mui/material/colors";

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
        case "Code":
            return <CodeIcon/>;
        case "Database":
            return <StorageIcon/>;
        case "Framework":
            return <AccountTreeIcon/>;
        case "TerminalIcon":
            return <TerminalIcon/>;
        case "Service":
            return <CloudIcon/>;
        case "Tools":
            return <BuildIcon/>;
        default:
            return <CodeIcon/>;
    }
}

const calculateLevelFromXP = (xp) => {
    if (!xp || xp < 1) return 0;
    const level = Math.floor(Math.log2(xp));
    return level >= 10 ? "Max." : level;
}

const calculateProgressToNextLevel = (xp) => {
    if (!xp || xp < 1) return 0;
    const level = Math.floor(Math.log2(xp));
    if (level >= 10) return 100;
    const currentLevelXP = Math.pow(2, level);
    const nextLevelXP = Math.pow(2, level + 1);
    const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return progress > 100 ? 100 : progress;
}

const getBorderStyle = (level) => {
    if (level >= 10) {
        return "linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet, red)";
    } else if (level >= 8) {
        return "gold";
    } else if (level >= 6) {
        return "silver";
    } else if (level >= 4) {
        return "#b87333"; // Kupferfarbton
    } else {
        return "none";
    }
};

const cardColor = (color) => {
    const use_color = false;
    return use_color ? color : blueGrey[900];

}

function FlippingSkillCard({skill}) {
    const [flipped, setFlipped] = useState(false);
    const level = Math.floor(Math.log2(skill.xp));
    const borderStyle = getBorderStyle(level);

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
                        {level >= 10 && (
                            <StarIcon sx={{position: "absolute", top: 8, right: 8, color: "gold", fontSize: 30}}/>
                        )}
                        <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px !important", width: "100%", height: "100%", boxSizing: "border-box"}}>
                            <Avatar sx={{bgcolor: "#fff", color: skill.color, mb: 1}}>
                                {skillIcon(skill.category)}
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
                        <Typography variant="subtitle1" mb={0.5}>{skill.name}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mb={0.5}>
                            <Typography variant="caption">Seit: {skill.since}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{color: "#fff"}}>Level {calculateLevelFromXP(skill.xp)}</Typography>
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
                        {skill.projects.length > 0 && (
                            <>
                                <Typography variant="caption" mt={0.5}>Projekte: <br/></Typography>
                                {skill.projects.map((project, i) => (
                                    <Typography key={i} variant="caption">- {project} <br/></Typography>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

function SkillGridPage() {
    const sortedSkills = [...skills]
        .sort((a, b) => Math.floor(Math.log2(b.xp)) - Math.floor(Math.log2(a.xp)))
        .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

    return (
        <Box p={3}>
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
        </Box>
    );
}

export default function SkillPage() {
    return (
        <SkillGridPage/>
    );
}
