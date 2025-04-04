import {Box, Card, CardContent, Chip, CircularProgress, Modal, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {API_URL} from "../config";
import {motion} from "framer-motion";
import {SkillCardBackside} from "./SkillPage.jsx";
import {blueGrey} from "@mui/material/colors";
import {formatDate} from "../utils/utils.jsx";


export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Alle");

    const [selectedSkill, setSelectedSkill] = useState(null);
    const handleCloseModal = () => setSelectedSkill(null);

    useEffect(() => {
        fetch(`${API_URL}/projects/`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/branches/`)
            .then(res => res.json())
            .then(data => setBranches(data));
    }, []);

    
    const filters = [
        "Alle",
        ...branches
            .filter(b => b.projects && b.projects.length > 0)
            .sort((a, b) => b.projects.length - a.projects.length)
            .map(b => `${b.name} (${b.projects.length})`)
    ];

    const filtered = (filter === "Alle"
            ? projects
            : projects.filter(p => p.branch.name === filter.split(" (")[0])
    ).sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    return (
        <Box p={4}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                Projekte
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={2} mb={4} flexWrap="wrap">
                {filters.map((f, i) => (
                    <Chip
                        key={i}
                        label={f}
                        onClick={() => setFilter(f)}
                        variant={filter === f ? "filled" : "outlined"}
                        color={filter === f ? "primary" : "secondary"}
                        clickable
                    />
                ))}
            </Stack>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={3}
                    maxWidth="1200px"
                    mx="auto"
                    minHeight="60vh"
                >
                    {filtered.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                        >
                            <Card
                                sx={{
                                    width: 300,
                                    borderRadius: 3,
                                    backgroundColor: blueGrey[900],
                                    color: "#fff",
                                }}
                                elevation={3}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {project.name}
                                    </Typography>
                                    <Typography variant="body2" mb={1}>
                                        {project.description || "Kein Beschreibungstext"}
                                    </Typography>
                                    <Typography variant="caption">
                                        {formatDate(project.start_date)} – {project.end_date ? formatDate(project.end_date) : "heute"}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                                        {project.skills.map((skill, index) => {
                                            return (
                                                <Box key={index} sx={{p: "3px"}}>
                                                    <Chip
                                                        label={skill.name}
                                                        variant="outlined"
                                                        onClick={() => setSelectedSkill(skill)}
                                                        sx={{
                                                            borderRadius: "999px",
                                                            fontWeight: 500,
                                                            color: "#fff",
                                                            backgroundColor: blueGrey[500],
                                                            border: 0,
                                                            cursor: "pointer",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                transform: "scale(1.05)",
                                                                boxShadow: "0 0 5px rgba(255,255,255,0.5)",
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            );
                                        })}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {filtered.length === 0 && (
                        <Typography align="center" mt={4} color="gray">
                            Noch keine Projekte in diesem Bereich.
                        </Typography>
                    )}
                </Box>
            )}

            {/* Skill-Modal */}
            <Modal open={!!selectedSkill} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: blueGrey[900],
                        color: "#fff",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedSkill && (
                        <SkillCardBackside skill={selectedSkill}/>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
