import React from 'react';
import PropTypes from "prop-types";
import {makeStyles} from "@fluentui/react";

const useStyles = makeStyles(theme => ({
    hr:{
        width: "100%",
        height: 1,
        background: "lightgray",
    }
}))

const Hr = (props) => {
    const classes = useStyles();

    if (props.vertical) return <span style={{color: "lightgray", ...props.style}}>|</span>

    return (
        <div className={`${classes.hr} ${props.className}`} style={props.style}/>
    );
};

Hr.propTypes = {
    vertical: PropTypes.bool,

    className: PropTypes.string,
    style: PropTypes.object
}


export default Hr;
