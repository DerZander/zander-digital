import {useMemo, useState} from "react";
import {motion as Motion} from "framer-motion";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import FlagIcon from "@mui/icons-material/Flag";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import InterestsIcon from "@mui/icons-material/Interests";
import LogoutIcon from "@mui/icons-material/Logout";
import achievementsData from "../data/achievements.json";
import {formatDate} from "../utils/utils.jsx";

const categoryDetails = {
    1: {name: "Ernennung", icon: <StarIcon/>},
    2: {name: "Beförderung", icon: <PersonIcon/>},
    3: {name: "Weiterbildung", icon: <SchoolIcon/>},
    4: {name: "Auszeichnung", icon: <EmojiEventsIcon/>},
    5: {name: "Rücktritt", icon: <SettingsIcon/>},
    6: {name: "Fahrerlaubnis", icon: <DriveEtaIcon/>},
    7: {name: "Persönliches", icon: <EventIcon/>},
    8: {name: "Station", icon: <FlagIcon/>},
    9: {name: "Festanstellung", icon: <WorkOutlineIcon/>},
    10: {name: "Aufgabenerweiterung", icon: <WorkOutlineIcon/>},
    11: {name: "Umfirmierung", icon: <BusinessIcon/>},
    12: {name: "Ausbildungsabschluss", icon: <SchoolOutlinedIcon/>},
    13: {name: "Praktikum", icon: <WorkOutlineIcon/>},
    14: {name: "Duales Studium", icon: <SchoolOutlinedIcon/>},
    15: {name: "Hobby", icon: <InterestsIcon/>},
    16: {name: "Studienabschluss", icon: <SchoolOutlinedIcon/>},
    17: {name: "Schulabschluss", icon: <SchoolOutlinedIcon/>},
    18: {name: "Austritt", icon: <LogoutIcon/>},
};

const formatAchievementDate = (date) => date.length === 4 ? date : formatDate(date);

function AchievementCard({achievement, index}) {
    const category = categoryDetails[achievement.category.id] || {name: "Meilenstein", icon: <StarIcon/>};

    return (
        <Motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.28, delay: Math.min(index * 0.035, 0.25)}}
        >
            <Card
                elevation={0}
                sx={{
                    border: "1px solid rgba(var(--color-border-rgb),0.12)",
                    borderRadius: 3,
                    bgcolor: "rgba(var(--color-surface-rgb),0.72)",
                    color: "var(--color-text)",
                    transition: "border-color 180ms ease, transform 180ms ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        borderColor: "rgba(var(--color-accent-rgb),0.32)",
                    },
                }}
            >
                <CardContent sx={{p: {xs: 2, sm: 2.5}, "&:last-child": {pb: {xs: 2, sm: 2.5}}}}>
                    <Stack direction={{xs: "column", sm: "row"}} justifyContent="space-between" alignItems={{xs: "flex-start", sm: "flex-start"}} gap={1.5}>
                        <Box sx={{display: "flex", gap: 1.5, minWidth: 0}}>
                            <Box
                                aria-hidden="true"
                                sx={{
                                    display: "flex",
                                    width: 38,
                                    height: 38,
                                    flex: "0 0 38px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 2,
                                    color: "var(--color-accent)",
                                    bgcolor: "rgba(var(--color-accent-rgb),0.1)",
                                }}
                            >
                                {category.icon}
                            </Box>
                            <Box sx={{minWidth: 0}}>
                                <Typography component="h3" variant="subtitle1" fontWeight={700} sx={{lineHeight: 1.45}}>
                                    {achievement.name}
                                </Typography>
                                {achievement.description && (
                                    <Typography variant="body2" sx={{mt: 0.5, color: "var(--color-muted)", lineHeight: 1.65}}>
                                        {achievement.description}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Stack direction="row" alignItems="center" gap={1} sx={{flex: "0 0 auto", pl: {xs: "54px", sm: 0}}}>
                            <Chip
                                size="small"
                                label={category.name}
                                sx={{
                                    height: 24,
                                    color: "var(--color-muted)",
                                    bgcolor: "rgba(var(--color-border-rgb),0.08)",
                                    "& .MuiChip-label": {px: 1},
                                }}
                            />
                            <Typography variant="caption" sx={{color: "var(--color-accent)", fontWeight: 700, whiteSpace: "nowrap"}}>
                                {formatAchievementDate(achievement.date)}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Motion.div>
    );
}

function MyTimeline() {
    const [selectedBranch, setSelectedBranch] = useState(0);

    const achievements = useMemo(
        () => [...achievementsData].sort((a, b) => new Date(b.date) - new Date(a.date)),
        [],
    );
    const branches = useMemo(() => {
        const counts = new Map();
        const uniqueBranches = new Map();
        achievements.forEach((achievement) => {
            const branch = achievement.branch;
            counts.set(branch.id, (counts.get(branch.id) || 0) + 1);
            uniqueBranches.set(branch.id, branch);
        });

        return [
            {id: 0, name: "Alle", count: achievements.length},
            ...[...uniqueBranches.values()].map((branch) => ({
                ...branch,
                count: counts.get(branch.id),
            })),
        ];
    }, [achievements]);

    const filteredAchievements = selectedBranch === 0
        ? achievements
        : achievements.filter((achievement) => achievement.branch.id === selectedBranch);

    const yearGroups = useMemo(() => {
        const groups = new Map();
        filteredAchievements.forEach((achievement) => {
            const year = achievement.date.slice(0, 4);
            if (!groups.has(year)) groups.set(year, []);
            groups.get(year).push(achievement);
        });
        return [...groups.entries()];
    }, [filteredAchievements]);

    return (
        <>
            <Stack
                component="nav"
                aria-label="Werdegang nach Bereich filtern"
                direction="row"
                flexWrap="wrap"
                gap={1}
                sx={{mb: 4}}
            >
                {branches.map((branch) => (
                    <Chip
                        key={branch.id}
                        label={`${branch.name} · ${branch.count}`}
                        onClick={() => setSelectedBranch(branch.id === selectedBranch && branch.id !== 0 ? 0 : branch.id)}
                        aria-pressed={selectedBranch === branch.id}
                        variant={selectedBranch === branch.id ? "filled" : "outlined"}
                        color={selectedBranch === branch.id ? "primary" : "default"}
                        clickable
                    />
                ))}
            </Stack>

            {yearGroups.length > 0 ? (
                <Stack spacing={3}>
                    {yearGroups.map(([year, achievementsInYear]) => (
                        <Box
                            component="section"
                            key={year}
                            aria-labelledby={`timeline-year-${year}`}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {xs: "1fr", sm: "88px minmax(0, 1fr)"},
                                alignItems: "start",
                                gap: {xs: 1.5, sm: 2.5},
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1.25} sx={{pt: {sm: 1}}}>
                                <Typography
                                    id={`timeline-year-${year}`}
                                    component="h2"
                                    sx={{color: "var(--color-accent)", fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.03em"}}
                                >
                                    {year}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={achievementsInYear.length}
                                    sx={{height: 22, color: "var(--color-muted)", bgcolor: "rgba(var(--color-border-rgb),0.08)"}}
                                />
                            </Stack>
                            <Stack
                                spacing={1.25}
                                sx={{
                                    position: "relative",
                                    pl: {xs: 1.5, sm: 2},
                                    borderLeft: "1px solid rgba(var(--color-accent-rgb),0.3)",
                                }}
                            >
                                {achievementsInYear.map((achievement, index) => (
                                    <AchievementCard
                                        key={achievement.id}
                                        achievement={achievement}
                                        index={index}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Typography sx={{py: 5, color: "var(--color-muted)", textAlign: "center"}}>
                    Für diesen Bereich sind keine Meilensteine hinterlegt.
                </Typography>
            )}
        </>
    );
}

export default function TimelinePage() {
    return (
        <Box component="main" sx={{width: "100%", maxWidth: 1160, mx: "auto", px: {xs: 2.5, sm: 4}, py: {xs: 5, md: 8}, color: "var(--color-text)"}}>
            <Box sx={{maxWidth: 720, mb: {xs: 4, md: 5}}}>
                <Typography sx={{color: "var(--color-accent)", fontSize: "0.78rem", fontWeight: 750, letterSpacing: "0.15em", textTransform: "uppercase", mb: 1.5}}>
                    Stationen & Meilensteine
                </Typography>
                <Typography component="h1" sx={{fontSize: {xs: "2.8rem", sm: "3.6rem"}, fontWeight: 760, letterSpacing: "-0.065em", lineHeight: 1.04, mb: 2}}>
                    Mein <Box component="span" sx={{color: "var(--color-accent)"}}>Werdegang.</Box>
                </Typography>
                <Typography sx={{color: "var(--color-muted)", fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.8}}>
                    Eine chronologische Übersicht wichtiger Schritte in Beruf, Bildung und Ehrenamt.
                    Über die Filter kannst du einzelne Bereiche gezielt ansehen.
                </Typography>
            </Box>
            <MyTimeline/>
        </Box>
    );
}
