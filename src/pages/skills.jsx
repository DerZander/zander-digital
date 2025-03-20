// src/pages/skills.jsx
import React, {useState} from "react";
import "../assets/bubble_style.css";
import skills from "../data/skills.json";


const skillBubbleStyle = {
    margin: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute"
};

function adjustBrightness(color, factor) {
    return {
        r: Math.min(255, Math.max(0, Math.floor(color.r * factor))),
        g: Math.min(255, Math.max(0, Math.floor(color.g * factor))),
        b: Math.min(255, Math.max(0, Math.floor(color.b * factor))),
    };
}

function rgbToCss(rgb, transparency = 1) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`;
}

function getRandomPosition() {
    const range = 75;
    const x = Math.random() * range;
    const y = Math.random() * range;
    return {x, y};
}

function SkillBubble({skill}) {
    const [position, setPosition] = useState(getRandomPosition());
    const [size, setSize] = useState(skill.size);
    const [animate, setAnimate] = useState(false);
    const [pop, setPop] = useState(false);

    const handleClick = () => {
        setPop(true);
        setTimeout(() => {
            setPosition(getRandomPosition());
            setSize(0);
            setAnimate(true);
            setPop(false);
            setTimeout(() => {
                setSize(skill.size);
                setAnimate(false);
            }, 0);
        }, 300); // Wartezeit für die Pop-Animation
    };

    const rgbColor = skill.rgb;
    const darker_factor = 0.95;
    const light_factor = 1.3;
    const lightColor = rgbToCss(adjustBrightness(rgbColor, light_factor));
    const darkColor = rgbToCss(adjustBrightness(rgbColor, darker_factor));

    const dynamicStyle = {
        ...skillBubbleStyle,
        width: `${size}vw`,
        height: `${size}vw`,
        background: `linear-gradient(135deg, ${lightColor}, ${darkColor})`,
        boxShadow: `inset 10px 5px 5px ${rgbToCss(adjustBrightness(rgbColor, light_factor + 0.2), 0.5)}, 10px 5px 5px ${rgbToCss(adjustBrightness(rgbColor, darker_factor), 0.5)}`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        '--bubble-size': `${skill.size}vw`
    };

    return (
        <div className={`bubble ${animate ? 'grow' : ''} ${pop ? 'pop' : ''}`} style={dynamicStyle} onClick={handleClick}>
            {skill.name}
        </div>
    );
}

export default function Skills() {
    return (
        <div>
            <h1>Skills</h1>
            {skills.map((skill, index) => <SkillBubble skill={skill} key={index}/>)}
        </div>
    );
}