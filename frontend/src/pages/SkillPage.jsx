import {useMemo} from "react";
import {motion as Motion} from "framer-motion";
import {
    AccountTree as AccountTreeIcon,
    Build as BuildIcon,
    Cloud as CloudIcon,
    Code as CodeIcon,
    Star as StarIcon,
    Storage as StorageIcon,
} from "@mui/icons-material";
import {Box, Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import skills from "../data/skills.json";
import {formatDate} from "../utils/utils.jsx";

const categoryDetails = {
    Language: {label: "Programmiersprachen", icon: <CodeIcon/>},
    Framework: {label: "Frameworks & Bibliotheken", icon: <AccountTreeIcon/>},
    Database: {label: "Datenbanken", icon: <StorageIcon/>},
    Tool: {label: "Tools", icon: <BuildIcon/>},
    Service: {label: "Plattformen & Infrastruktur", icon: <CloudIcon/>},
};

const featuredSkillNames = ["Springboot", "React", "Python"];
const displayNames = {
    Springboot: "Spring Boot",
    JS: "JavaScript",
    Nodered: "Node-RED",
    PostgreSQl: "PostgreSQL",
    MaterialUi: "Material UI",
};

export function SkillCardBackside({skill}) {
    return (
        <Box sx={{color: "var(--color-text)"}}>
            <Typography variant="h6" fontWeight={700} mb={1}>{displayNames[skill.name] || skill.name}</Typography>
            {skill.since && (
                <Typography variant="caption" sx={{display: "block", color: "var(--color-muted)", mb: 1}}>
                    Dabei seit {formatDate(skill.since)}
                </Typography>
            )}
            <Typography variant="body2" sx={{color: "var(--color-muted)", lineHeight: 1.7}}>
                {skill.description || "Weitere Informationen zu diesem Skill folgen."}
            </Typography>
        </Box>
    );
}

function SkillCard({skill, index}) {
    return (
        <Motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35, delay: Math.min(index * 0.04, 0.3)}}
            style={{height: "100%"}}
        >
            <Card
                elevation={0}
                sx={{
                    height: "100%",
                    border: "1px solid rgba(var(--color-border-rgb),0.12)",
                    borderRadius: 3,
                    bgcolor: "rgba(var(--color-surface-rgb),0.76)",
                    color: "var(--color-text)",
                    transition: "border-color 180ms ease, transform 180ms ease, background 180ms ease",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: "rgba(var(--color-accent-rgb),0.3)",
                        bgcolor: "var(--color-surface-raised)",
                    },
                }}
            >
                <CardContent sx={{p: 2.25, "&:last-child": {pb: 2.25}}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} mb={1}>
                        <Typography component="h3" variant="subtitle1" fontWeight={700}>
                            {displayNames[skill.name] || skill.name}
                        </Typography>
                        {skill.is_favorite && (
                            <StarIcon aria-label="Persönlicher Schwerpunkt" sx={{color: "var(--color-accent)", fontSize: 19}}/>
                        )}
                    </Stack>
                    {skill.since && (
                        <Typography variant="caption" sx={{display: "block", color: "var(--color-muted)", opacity: 0.8}}>
                            Seit {formatDate(skill.since)}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Motion.div>
    );
}

function SkillGridPage() {
    const groupedSkills = useMemo(() => {
        const groups = new Map();
        skills.forEach((skill) => {
            const category = skill.category?.name || "Other";
            if (!groups.has(category)) groups.set(category, []);
            groups.get(category).push(skill);
        });

        return [...groups.entries()]
            .sort(([categoryA], [categoryB]) => {
                const order = Object.keys(categoryDetails);
                const indexA = order.indexOf(categoryA);
                const indexB = order.indexOf(categoryB);
                return (indexA < 0 ? order.length : indexA) - (indexB < 0 ? order.length : indexB);
            })
            .map(([category, categorySkills]) => ({
                category,
                ...categoryDetails[category] || {label: category, icon: <BuildIcon/>},
                skills: categorySkills.sort((a, b) => {
                    const favoriteDifference = Number(b.is_favorite) - Number(a.is_favorite);
                    return favoriteDifference || a.name.localeCompare(b.name, "de");
                }),
            }));
    }, []);

    const featuredSkills = useMemo(
        () => featuredSkillNames
            .map((name) => skills.find((skill) => skill.name.toLowerCase() === name.toLowerCase()))
            .filter(Boolean),
        [],
    );

    return (
        <Box component="main" sx={{width: "100%", maxWidth: 1160, mx: "auto", px: {xs: 2.5, sm: 4}, py: {xs: 5, md: 8}, color: "var(--color-text)"}}>
            <Box sx={{maxWidth: 720, mb: {xs: 4, md: 6}}}>
                <Typography sx={{color: "var(--color-accent)", fontSize: "0.78rem", fontWeight: 750, letterSpacing: "0.15em", textTransform: "uppercase", mb: 1.5}}>
                    Werkzeuge & Technologien
                </Typography>
                <Typography component="h1" sx={{fontSize: {xs: "2.8rem", sm: "3.6rem"}, fontWeight: 760, letterSpacing: "-0.065em", lineHeight: 1.04, mb: 2}}>
                    Meine <Box component="span" sx={{color: "var(--color-accent)"}}>Skills.</Box>
                </Typography>
                <Typography sx={{color: "var(--color-muted)", fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.8}}>
                    Von Backend-Entwicklung bis zu modernen Weboberflächen: Hier findest du die
                    Technologien und Werkzeuge, mit denen ich arbeite und Projekte umsetze.
                </Typography>
            </Box>

            <>
                    {featuredSkills.length > 0 && (
                        <Box component="section" aria-labelledby="featured-skills-heading" sx={{mb: {xs: 5, md: 7}}}>
                            <Typography id="featured-skills-heading" component="h2" variant="h5" fontWeight={700} mb={2}>
                                Derzeit im Fokus
                            </Typography>
                            <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "repeat(3, minmax(0, 1fr))"}, gap: 2}}>
                                {featuredSkills.map((skill, index) => (
                                    <SkillCard key={skill.id} skill={skill} index={index}/>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {groupedSkills.map((group, groupIndex) => (
                        <Box component="section" key={group.category} aria-labelledby={`skill-group-${group.category}`} sx={{mb: {xs: 4, md: 5}}}>
                            <Stack direction="row" alignItems="center" gap={1.25} mb={2}>
                                <Box sx={{display: "flex", width: 34, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 1.5, color: "var(--color-accent)", bgcolor: "rgba(var(--color-accent-rgb),0.09)"}}>
                                    {group.icon}
                                </Box>
                                <Typography id={`skill-group-${group.category}`} component="h2" variant="h6" fontWeight={700}>
                                    {group.label}
                                </Typography>
                                <Chip size="small" label={group.skills.length} sx={{height: 23, color: "var(--color-muted)", bgcolor: "rgba(var(--color-border-rgb),0.09)"}}/>
                            </Stack>
                            <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))"}, gap: 1.5}}>
                                {group.skills.map((skill, index) => (
                                    <SkillCard key={skill.id} skill={skill} index={index + groupIndex}/>
                                ))}
                            </Box>
                        </Box>
                    ))}

                    {skills.length === 0 && (
                        <Typography sx={{py: 5, color: "var(--color-muted)", textAlign: "center"}}>
                            Aktuell sind noch keine Skills hinterlegt.
                        </Typography>
                    )}

                    <Typography variant="caption" sx={{display: "block", mt: 4, color: "var(--color-muted)", opacity: 0.8}}>
                        Ein Stern markiert persönliche Schwerpunkte. Die Skills sind bewusst nach Themen
                        statt nach einer künstlichen Punktzahl sortiert.
                    </Typography>
            </>
        </Box>
    );
}

export default function SkillPage() {
    return <SkillGridPage/>;
}
