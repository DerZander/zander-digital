// myComponent.js
const skillsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    position: "relative"
};

const skillBubbleStyle = {
    margin: "10px",
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute"
};

// Funktion zum Umwandeln von Hex in RGB
function hexToRgb(hex) {
    // Entferne das '#' am Anfang, falls vorhanden
    hex = hex.replace(/^#/, '');
    // Teile die Farbe in ihre RGB-Komponenten auf
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return {r, g, b};
}

// Funktion zum Anpassen der Helligkeit
function adjustBrightness(color, factor) {
    return {
        r: Math.min(255, Math.max(0, Math.floor(color.r * factor))),
        g: Math.min(255, Math.max(0, Math.floor(color.g * factor))),
        b: Math.min(255, Math.max(0, Math.floor(color.b * factor))),
    };
}

// Funktion zum Umwandeln von RGB in Hex
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function getRandomPosition() {
    const x = Math.random() * 80 + 10; // 10% bis 90% der Breite
    const y = Math.random() * 80 + 10; // 10% bis 90% der Höhe
    return {x, y};
}

function SkillBubble({skill}) {
    const {x, y} = getRandomPosition();
    const rgbColor = hexToRgb(skill.color);
    const darker_factor = 0.95;
    const light_factor = 1.3;
    const lightColor = rgbToHex(adjustBrightness(rgbColor, light_factor).r, adjustBrightness(rgbColor, light_factor).g, adjustBrightness(rgbColor, light_factor).b);
    const darkColor = rgbToHex(adjustBrightness(rgbColor, darker_factor).r, adjustBrightness(rgbColor, darker_factor).g, adjustBrightness(rgbColor, darker_factor).b);

    const realSize = skill.size

    const dynamicStyle = {
        ...skillBubbleStyle,
        width: `${realSize}vw`,
        height: `${realSize}vw`,
        background: `linear-gradient(135deg, ${lightColor}, ${darkColor})`,
        left: `${x}%`,
        top: `${y}%`
    };

    return (
        <div className={"bubble"} style={dynamicStyle}>
            {skill.name}
        </div>
    );
}

const skills = [
    {name: "Python", size: 25, color: "#BAE1FF", order: 0},
    {name: "Django", size: 10, color: "#FFBAE1", order: 1},
    {name: "Flask", size: 5, color: "#BAFFBA", order: 3},
    {name: "Tornado", size: 10, color: "#FFBABA", order: 4},
    {name: "Java", size: 5, color: "#FFDFBA", order: 5},
    {name: "JavaScript", size: 15, color: "#FFFFBA", order: 5},
    {name: "React", size: 20, color: "#D4A5A5", order: 5},
    {name: "Vue", size: 10, color: "#BAFFC9", order: 5},
    {name: "Angular", size: 5, color: "#FFB3BA", order: 5},
    {name: "Node.js", size: 10, color: "#A5D4A5", order: 5},
    {name: "Express", size: 5, color: "#A5A5D4", order: 5},
    {name: "Spring", size: 10, color: "#D4A5D4", order: 5},
];

export default function Skills() {
    return (<div style={skillsContainerStyle}>

            <h1>Skills</h1>
            {skills.map((skill, index) => <SkillBubble skill={skill} key={index}/>)}
        </div>
    )
}