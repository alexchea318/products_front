import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@fluentui/react";
import {palette} from "theme/Theme.jsx";

const useStyles = makeStyles((theme) => ({
    boxIcon: {
        fontSize: 25,
        marginRight: 10,
        display: "flex",
        alignItems: "center",
        transform: "translateY(-1px)",
        color: "inherit",
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    flexLink: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
            color: `${palette.accent} !important`
        }
    },
    count: {
        color: "gray",
        marginLeft: 10,
        fontSize: "0.8em"
    }
}))

function getFontSize(type) {
    switch (type) {
        case 1:
            return 26
        case 2:
            return 23
        case 3:
            return 21
        case 4:
            return 18
        case 5:
            return 16
        default:
            return 20
    }
}

function Header(props) {
    const classes = useStyles();

    return (
        <div className={`${classes.flex} ${props.mb? "mb-3" : ""} ${props.className}`} style={{...props.style}}>
            {props.icon &&
                <div className={classes.boxIcon} style={{color: props.color}}>{<props.icon/>}</div>
            }
            <div style={{fontSize: getFontSize(props.h), fontWeight: 600, ...props.fontStyle}} ref={props.textRef}>
                {props?.title}
            </div>
        </div>
    )
}

Header.propTypes = {
    mt: PropTypes.bool,
    mb: PropTypes.bool,
    h: PropTypes.oneOf([1, 2, 3, 4, 5]),
    id: PropTypes.string,
    title: PropTypes.any,
    count: PropTypes.number,
    icon: PropTypes.any,

    className: PropTypes.string,
    style: PropTypes.object,
    fontStyle: PropTypes.object,
}

export default Header
