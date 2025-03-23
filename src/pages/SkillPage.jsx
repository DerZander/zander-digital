import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography,} from "@mui/material";
import {useState} from "react";
import skills from "../data/skills.json";

import CropDinIcon from '@mui/icons-material/CropDin';
import {AccountTree as AccountTreeIcon, Build as BuildIcon, Cloud as CloudIcon, Code as CodeIcon, ExpandMore as ExpandMoreIcon, Star as StarIcon, Storage as StorageIcon, Terminal as TerminalIcon,} from "@mui/icons-material";

const skillIcon = (icon) => {
    switch (icon) {
        case "Code":
            return <CodeIcon/>;
        case "CropDinIcon":
            return <CropDinIcon/>;
        case "StorageIcon":
            return <StorageIcon/>;
        case "ExpandMoreIcon":
            return <ExpandMoreIcon/>;
        case "BuildIcon":
            return <BuildIcon/>;
        case "TerminalIcon":
            return <TerminalIcon/>;
        case "CloudIcon":
            return <CloudIcon/>;
        case "Module":
            return <AccountTreeIcon/>;
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

function FlippingSkillCard({skill}) {
    const [flipped, setFlipped] = useState(false);
    const isMaxLevel = Math.floor(Math.log2(skill.xp)) >= 10;

    return (
        <Box
            sx={{
                perspective: "1000px",
                width: "220px",
                height: "180px",
                margin: "10px",
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
                {/* Front Side */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        bgcolor: skill.color,
                        color: "#fff",
                        borderRadius: 3,
                        padding: 1,
                        top: 0,
                        left: 0
                    }}
                >
                    {isMaxLevel && (
                        <StarIcon sx={{position: "absolute", top: 8, right: 8, color: "gold", fontSize: 30}}/>
                    )}
                    <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "8px !important"}}>
                        <Avatar sx={{bgcolor: "#fff", color: skill.color, mb: 1}}>
                            {skillIcon(skill.icon)}
                        </Avatar>
                        <Typography variant="h6" textAlign="center">{skill.name}</Typography>
                    </CardContent>
                </Card>

                {/* Back Side */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",

                        transform: "rotateY(180deg)",
                        transformOrigin: "center center",
                        bgcolor: "#f5f5f5",
                        borderRadius: 3,
                        padding: 1,
                        top: 0,
                        left: "-8%"
                    }}
                >
                    <CardContent sx={{padding: "8px !important"}}>
                        <Typography variant="subtitle1" mb={0.5}>{skill.name}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mb={0.5}>
                            <Typography variant="caption">Seit: {skill.since}</Typography>
                            <Typography variant="caption" color="text.secondary">Level {calculateLevelFromXP(skill.xp)}</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgressToNextLevel(skill.xp)}
                            sx={{
                                height: 8, borderRadius: 4, "& .MuiLinearProgress-bar": {
                                    backgroundColor: skill.color,
                                },
                            }}
                        />
                        {skill.projects.length > 0 && (
                            <>
                                <Typography variant="caption" mt={0.5}>Projekte: <br/></Typography>
                                {skill.projects.map((project, i) => (
                                    <Typography key={i} variant="caption">- {project}</Typography>
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
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                🛠 Meine Skills
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                {skills.map((skill, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index} display="flex" justifyContent="center">
                        <FlippingSkillCard skill={skill} index={index}/>
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