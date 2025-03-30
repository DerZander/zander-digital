import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';

function ItemTimeLine({date, title, description, itemType}) {
    let iconTag = null;
    switch (itemType) {
        case "start":
            iconTag = <OutlinedFlagIcon/>
            break;
        case "education":
            iconTag = <MenuBookIcon/>
            break;
        case 'work':
            iconTag = <OutlinedFlagIcon/>
            break;
        case "trophy":
            iconTag = <EmojiEventsIcon/>
            break;
        case "rank_up":
            iconTag = <AccessibilityIcon/>
            break;
        case "award":
            iconTag = <MilitaryTechIcon/>
            break;
        default:
            iconTag = <OutlinedFlagIcon/>
            break;

    }
    // const iconTag = <OutlinedFlagIcon/>
    const formattedDate = format(new Date(date), 'd. MMMM yyyy', {locale: de});

    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{m: 'auto 0'}}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {formattedDate}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot>
                    {/*{iconTag}*/}
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent sx={{py: '12px', px: 2}}>
                <Typography>
                    {iconTag} &nbsp;
                    <strong>
                        {title}
                    </strong>
                </Typography>
                <Typography variant="h6" component="span">
                    {description}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    )

}

export default function CvTimeline() {
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        fetch('/src/data/cv_firefighters.json')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setTimelineData(data)
            })
            .catch(error => console.error('Error loading JSON data:', error));
    }, []);

    return (
        <Timeline position="alternate">
            {timelineData.map((item, index) => (
                <ItemTimeLine
                    key={index}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                    itemType={item.type}
                />
            ))}
        </Timeline>
    );
}