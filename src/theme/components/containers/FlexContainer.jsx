import React from 'react';
import PropTypes from "prop-types";
import {makeStyles} from "@fluentui/react";

const useStyles = makeStyles((theme) => ({
    flexContainer:{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 15
    },
}))


const FlexContainer = (props) => {
    const classes = useStyles();

    function getGap(){
        if (props.gap) return props.gap

        switch (props.type){
            case "chip": return 15
            case "action": return 25
            case "stat": return 10
            default: return 15
        }
    }

    return (
        <div {...props} className={`${classes.flexContainer} ${props.mb? "mb-3" : ""} ${props.className}`} style={{gap: getGap(), ...props.style}}>
            {props.children}
        </div>
    );
};

FlexContainer.propTypes = {
    type: PropTypes.oneOf(['chip', 'action', "stat"]),
    onClick: PropTypes.func,
    gap: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    mb: PropTypes.any,
}

export default FlexContainer;