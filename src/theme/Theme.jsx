import "./styles/Fonts.css"
import "./styles/_app.scss"

export const palette = {
    back: "#fff",
    back2: "#f3f3f2",
    accent: "#1877F2",
    lightAccent: "#C4DEFF",
    info:  "#f0f2f5",

    green: "#00ca1f",
    warning: "#ffb600",
    error: "#f44336",

    border: "1px solid lightgray",
    shadow: "0px 3px 10px 0px rgba(0, 00, 80, 0.11)",
    gray: "gray",
    hoverBackground: "#0000000f"
}

export const sticky = {
    position: "sticky",
    top: 0,
    background: `${palette.back2}d6`,
    backdropFilter: "blur(5px)",
    zIndex: 2,
}