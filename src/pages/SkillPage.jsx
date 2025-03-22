import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography,} from "@mui/material";
import {useState} from "react";
import skills from "../data/skills.json";

import CropDinIcon from '@mui/icons-material/CropDin';
import {AccountTree as AccountTreeIcon, Build as BuildIcon, Cloud as CloudIcon, Code as CodeIcon, ExpandMore as ExpandMoreIcon, Storage as StorageIcon, Terminal as TerminalIcon,} from "@mui/icons-material";

const skillIcon = (category) => {
    switch (category) {
        case "Code":
            return <CodeIcon/>;
        case "CropDinIcon":
            return <CropDinIcon/>;
        case "ExpandMoreIcon":
            return <ExpandMoreIcon/>;
        case "Tool":
            return <BuildIcon/>;
        case "Terminal":
            return <TerminalIcon/>;
        case "CloudIcon":
            return <CloudIcon/>;
        case "Framework":
            return <AccountTreeIcon/>;
        case "Database":
            return <StorageIcon/>;
        default:
            return <CodeIcon/>;
    }
}

function FlippingSkillCard({skill}) {
    const [flipped, setFlipped] = useState(false);

    return (
        <Box
            sx={{
                perspective: "1000px",
                width: "250px",
                height: "200px",
                margin: "20px"
            }}
            onClick={() => setFlipped(!flipped)}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
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
                        borderRadius: 3
                    }}
                >
                    <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Avatar sx={{bgcolor: "#fff", color: skill.color, mb: 2}}>
                            {skillIcon(skill.category)}
                        </Avatar>
                        <Typography variant="h5" textAlign="center">{skill.name}</Typography>
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
                        bgcolor: "#f5f5f5",
                        borderRadius: 3
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{skill.name}</Typography>
                        <Typography variant="body2" mt={1}>Seit: {skill.since}</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={skill.level}
                            sx={{
                                height: 10, borderRadius: 5, "& .MuiLinearProgress-bar": {
                                    backgroundColor: skill.color,
                                },
                            }}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Typography variant="body2" color="text.secondary">
                                {skill.level}%
                            </Typography>
                        </Box>
                        {skill.projects.length > 0 && (
                            <>
                                <Typography variant="subtitle2" mt={1}>Projekte:</Typography>
                                {skill.projects.map((project, i) => (
                                    <Typography key={i} variant="body2">- {project}</Typography>
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
        <Box p={4}>
            <Typography variant="h3" gutterBottom>
                🛠 Meine Skills
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {skills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} display="flex" justifyContent="center">
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
