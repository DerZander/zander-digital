import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Chip, Stack, Typography} from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {blueGrey, deepOrange, indigo, red, teal} from "@mui/material/colors";
import {motion} from "framer-motion";


// Icons
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EventIcon from '@mui/icons-material/Event';
import FlagIcon from '@mui/icons-material/Flag';

import {API_URL} from "../config";
import {formatDate} from "../utils/utils.jsx";

const categoryIcon = (categoryId) => {
    switch (categoryId) {
        case 1:
            return <StarIcon/>;
        case 2:
            return <PersonIcon/>;
        case 3:
            return <SchoolIcon/>;
        case 4:
            return <EmojiEventsIcon/>;
        case 5:
            return <SettingsIcon/>;
        case 6:
            return <DriveEtaIcon/>;
        case 7:
            return <EventIcon/>;
        case 8:
            return <FlagIcon/>;
        default:
            return <StarIcon/>;
    }
};

const branchColor = (branchId) => {
    switch (branchId) {
        case 1:
            return red[600];
        case 3:
            return indigo[500];
        case 4:
            return teal[500];
        default:
            return deepOrange[300];
    }
};

const Achievement = ({achievement}) => (

    <TimelineItem>
        <TimelineSeparator>
            <TimelineConnector/>
            <TimelineDot sx={{backgroundColor: branchColor(achievement.branch.id)}}>
                {categoryIcon(achievement.category.id)}
            </TimelineDot>
            <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>
            <Typography variant="body2" color={blueGrey[600]}>
                {formatDate(achievement.date)}
            </Typography>
            <Typography variant="h6" component="span">
                {achievement.name}
            </Typography>
            {achievement.description && (
                <Typography variant="body2" color={blueGrey[600]}>
                    {achievement.description}
                </Typography>
            )}
        </TimelineContent>
    </TimelineItem>
);

function MyTimeline() {
    const [achievements, setAchievements] = useState([]);
    const [filteredAchievements, setFilteredAchievements] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/achievements/`)
            .then(response => response.json())
            .then(data => {
                const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
                setAchievements(sorted);
                setFilteredAchievements(sorted);

                const branchCount = sorted.reduce((acc, a) => {
                    acc[a.branch.id] = acc[a.branch.id] ? acc[a.branch.id] + 1 : 1;
                    return acc;
                }, {});

                const uniqueBranches = [...new Map(sorted.map(a => [a.branch.id, a.branch])).values()]
                    .map(b => ({...b, count: branchCount[b.id] || 0}));
                uniqueBranches.unshift({id: 0, name: `Alle`, count: sorted.length});
                setBranches(uniqueBranches);

            })
            .catch(error => console.error('Error fetching achievements:', error));
    }, []);

    useEffect(() => {
        const filtered = (selectedBranch === 0 ? achievements : achievements.filter(a => a.branch.id === selectedBranch))
        setFilteredAchievements(filtered);
    }, [selectedBranch, achievements]);

    return (
        <>
            <Stack direction="row" justifyContent="center" spacing={2} mb={4} flexWrap="wrap">
                {branches.map(branch => (
                    <Chip
                        key={branch.id}
                        label={`${branch.name} (${branch.count})`}
                        onClick={() => setSelectedBranch(branch.id === selectedBranch ? '' : branch.id)}
                        variant={selectedBranch === branch.id ? "filled" : "outlined"}
                        color={selectedBranch === branch.id ? "primary" : "secondary"}
                        clickable
                    />
                ))}
            </Stack>

            <Timeline position="alternate">
                {filteredAchievements.map((achievement, index) => (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1}}
                    >
                        <Achievement key={index} achievement={achievement} index={index}/>
                    </motion.div>
                ))}
            </Timeline>
        </>
    );
}

export default function TimelinePage() {
    return (
        <Box p={4}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                Lebenslauf & Meilensteine
            </Typography>
            <MyTimeline/>
        </Box>
    );
}
