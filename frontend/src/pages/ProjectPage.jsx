import {useEffect, useMemo, useState} from "react";
import {motion as Motion} from "framer-motion";
import {Alert, Box, Card, CardContent, Chip, CircularProgress, Modal, Stack, Typography} from "@mui/material";
import {API_URL} from "../config";
import {SkillCardBackside} from "./SkillPage.jsx";
import {formatDate} from "../utils/utils.jsx";

const professionalProjectCopy = {
    1: {
        title: "Bewertungsanwendung",
        description: "Weiterentwicklung einer Anwendung zur Unterstützung von Bewertungs- und Vertragsprozessen.",
    },
    2: {
        title: "Interne Webplattform",
        description: "Ablösung einer bestehenden Plattform durch eine moderne Webanwendung.",
    },
    3: {
        title: "Reporting-Anwendung",
        description: "Webbasierte Auswertung von Kennzahlen und statistischen Daten für interne Berichte.",
    },
    4: {
        title: "Bestellportal",
        description: "Entwicklung eines internen Portals zur Verwaltung und Bestellung von Arbeitsmitteln.",
    },
    5: {
        title: "Bankenrating-Anwendung",
        description: "Konzeption und Full-Stack-Neuentwicklung eines Services zur Bewertung der Bonität von Banken. Dabei wurde ein überladenes Datenmodell in mehrere klar strukturierte Tabellen aufgeteilt.",
    },
    6: {
        title: "Backend-Service zur Datenintegration",
        description: "Entwicklung und Erweiterung eines Spring-Boot-Services, der mehrere Schnittstellen abfragt und ihre Antworten zu einem einheitlichen Ergebnis zusammenführt.",
    },
};

const getPublicProject = (project) => {
    if (project.branch_id === 2) {
        return {
            ...project,
            ...professionalProjectCopy[project.id] || {
                title: "Softwareprojekt im beruflichen Umfeld",
                description: "Umsetzung und Weiterentwicklung einer Softwarelösung im Team.",
            },
            projectType: "Berufliches Projekt",
        };
    }

    return {
        ...project,
        projectType: "Eigenes Projekt",
    };
};

const formatProjectDate = (date) => date ? formatDate(date) : null;

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("Alle");
    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/projects/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Laden der Projekte: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.map(getPublicProject));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Die Projekte konnten nicht geladen werden. Bitte versuche es später erneut.");
                setLoading(false);
            });
    }, []);

    const filters = useMemo(() => (
        ["Alle", ...new Set(projects.map((project) => project.projectType))]
    ), [projects]);

    const filteredProjects = useMemo(() => projects
        .filter((project) => filter === "Alle" || project.projectType === filter)
        .sort((a, b) => new Date(b.start_date || 0) - new Date(a.start_date || 0)), [filter, projects]);

    return (
        <Box component="main" sx={{width: "100%", maxWidth: 1160, mx: "auto", px: {xs: 2.5, sm: 4}, py: {xs: 5, md: 8}, color: "var(--color-text)"}}>
            <Box sx={{maxWidth: 720, mb: {xs: 4, md: 6}}}>
                <Typography sx={{color: "var(--color-accent)", fontSize: "0.78rem", fontWeight: 750, letterSpacing: "0.15em", textTransform: "uppercase", mb: 1.5}}>
                    Ausgewählte Arbeit
                </Typography>
                <Typography component="h1" sx={{fontSize: {xs: "2.8rem", sm: "3.6rem"}, fontWeight: 760, letterSpacing: "-0.065em", lineHeight: 1.04, mb: 2}}>
                    Projekte, die <Box component="span" sx={{color: "var(--color-accent)"}}>etwas bewegen.</Box>
                </Typography>
                <Typography sx={{color: "var(--color-muted)", fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.8}}>
                    Ein Einblick in Anwendungen und Ideen, an denen ich mitarbeite oder die ich
                    selbst umsetze – von Backend-Services bis zu Full-Stack-Webanwendungen.
                </Typography>
            </Box>

            <Stack direction="row" flexWrap="wrap" gap={1} sx={{mb: 3}}>
                {filters.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        onClick={() => setFilter(item)}
                        variant={filter === item ? "filled" : "outlined"}
                        color={filter === item ? "primary" : "default"}
                        clickable
                    />
                ))}
            </Stack>

            {loading ? (
                <Box role="status" aria-label="Projekte werden geladen" sx={{display: "flex", justifyContent: "center", py: 8}}>
                    <CircularProgress color="primary"/>
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{maxWidth: 700, mx: "auto"}}>{error}</Alert>
            ) : filteredProjects.length > 0 ? (
                <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))"}, gap: 2}}>
                    {filteredProjects.map((project, index) => {
                        const startDate = formatProjectDate(project.start_date);
                        const endDate = formatProjectDate(project.end_date);

                        return (
                            <Motion.div
                                key={project.id}
                                initial={{opacity: 0, y: 18}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.35, delay: Math.min(index * 0.05, 0.3)}}
                                style={{height: "100%"}}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        display: "flex",
                                        height: "100%",
                                        flexDirection: "column",
                                        border: "1px solid rgba(var(--color-border-rgb),0.12)",
                                        borderRadius: 3,
                                        bgcolor: "var(--color-surface)",
                                        color: "var(--color-text)",
                                        transition: "border-color 180ms ease, transform 180ms ease",
                                        "&:hover": {
                                            transform: "translateY(-3px)",
                                            borderColor: "rgba(var(--color-accent-rgb),0.35)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{display: "flex", height: "100%", flexDirection: "column", p: 2.5, "&:last-child": {pb: 2.5}}}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} mb={1.5}>
                                            <Chip
                                                size="small"
                                                label={project.projectType}
                                                sx={{color: "var(--color-accent)", bgcolor: "rgba(var(--color-accent-rgb),0.09)"}}
                                            />
                                            {(startDate || !project.end_date) && (
                                                <Typography variant="caption" sx={{color: "var(--color-muted)", textAlign: "right"}}>
                                                    {startDate || "Laufend"}{project.end_date ? ` – ${endDate}` : startDate ? " – heute" : ""}
                                                </Typography>
                                            )}
                                        </Stack>
                                        <Typography component="h2" variant="h6" fontWeight={720} mb={1}>
                                            {project.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: "var(--color-muted)", lineHeight: 1.75, mb: 2}}>
                                            {project.description || "Ein Projekt, bei dem ich meine technischen Kenntnisse praktisch einsetze."}
                                        </Typography>

                                        {project.skills?.length > 0 && (
                                            <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{mt: "auto"}}>
                                                {project.skills.map((skill) => (
                                                    <Chip
                                                        key={skill.id}
                                                        label={skill.name}
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => setSelectedSkill(skill)}
                                                        sx={{
                                                            borderColor: "rgba(var(--color-border-rgb),0.16)",
                                                            color: "var(--color-text)",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                borderColor: "var(--color-accent)",
                                                                color: "var(--color-accent)",
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        )}
                                    </CardContent>
                                </Card>
                            </Motion.div>
                        );
                    })}
                </Box>
            ) : (
                <Typography sx={{py: 5, color: "var(--color-muted)", textAlign: "center"}}>
                    Für diesen Bereich sind aktuell keine Projekte hinterlegt.
                </Typography>
            )}

            <Modal open={Boolean(selectedSkill)} onClose={() => setSelectedSkill(null)} aria-labelledby="project-skill-title">
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: {xs: "calc(100% - 32px)", sm: 360},
                        maxWidth: 420,
                        transform: "translate(-50%, -50%)",
                        border: "1px solid rgba(var(--color-border-rgb),0.14)",
                        borderRadius: 3,
                        bgcolor: "var(--color-surface)",
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    {selectedSkill && (
                        <Box id="project-skill-title">
                            <SkillCardBackside skill={selectedSkill}/>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
