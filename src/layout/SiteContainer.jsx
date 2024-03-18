import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ToastContainer from "layout/toasts/ToastContainer.jsx";
import {makeStyles} from "@fluentui/react";
import {ArrowUpRegular} from "@fluentui/react-icons";
import {toTop} from "theme/functions/utils.js";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import Sidebar from "layout/menu/Sidebar.jsx";
import "./style.css"

const useStyles = makeStyles((theme) => ({
    toTop: {
        position: "fixed",
        bottom: "20px",
        right: "5px",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        width: 43,
        aspectRatio: "1/1",
        transition: "all 0.2s",
        background: "#0000000f",
        borderRadius: 10,
        "&:hover": {
            background: "#d5d5d5",
            transform: "translateY(-5px)"
        }
    }
}))
const SiteContainer = props => {
    const classes = useStyles()
    const ref = useRef(null)

    function scroller() {
        if (window.scrollY > 50) ref.current.style.display = "flex"
        else ref.current.style.display = "none"
    }

    useEffect(() => {
        //scroller()
        document.addEventListener("scroll", scroller)
        return () => document.removeEventListener("scroll", scroller)
    }, [])

    return (
        <div>
            <ToastContainer/>

            <TrueGrid alignItems={"start"} style={{padding: "7px 0px 0px 15px"}} className={"grid-adaptive"} gap={50}>
                <Sidebar/>
                <main>
                    {props.children}
                </main>
            </TrueGrid>

            <div className={classes.toTop} ref={ref} onClick={toTop}>
                <ArrowUpRegular fontSize={30}/>
            </div>
        </div>
    );
};

SiteContainer.propTypes = {};

export default SiteContainer;