import React, {useRef} from 'react';
import {TOAST_CONTAINER_ID, TOAST_TEXT_ID} from "./toastFunctions.js";
import "./style.css"
import {IconButton, makeStyles} from "@fluentui/react";
import {palette} from "theme/Theme.jsx";
import {icons} from "services/consts/icons.js"

const useStyles = makeStyles((theme) => ({
    div:{
        position: "fixed",
        top:30,
        right: 30,
        padding: "15px 35px 15px 20px",
        background: "#fff",
        borderRadius: 6,
        borderLeft: "5px solid red",
        zIndex: 10,
        boxShadow: palette.shadow,
        display: "none",
        maxWidth: 340,
    },
}))
const ToastContainer = () => {
    const classes = useStyles()
    const ref = useRef(null)

    function onClick () {
        ref.current.style.display = "none"
    }

    return (
        <div id={TOAST_CONTAINER_ID} className={classes.div} ref={ref}>
            <div style={{margin: "-10px 30px -15px calc(100% + 30px)", display: "flex", justifyContent: "end"}}><IconButton size={"small"} onClick={onClick}><icons.close/></IconButton></div>
            <div id={TOAST_TEXT_ID}/>
        </div>
    );
};

export default ToastContainer;
