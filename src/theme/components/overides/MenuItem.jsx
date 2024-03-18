import React from 'react';
import {palette} from "theme/Theme.jsx";
import {makeStyles} from "@fluentui/react";
import PropTypes from "prop-types";
import FlexContainer from "theme/components/containers/FlexContainer.jsx";

const MenuItem = (props) => {
    const {active, name} = props
    let activeColor = props.activeColor

    if (props.isBack2) activeColor = palette.hoverBackground

    const useStyles = makeStyles(theme => ({
        hover: {
            flexWrap: "nowrap",
            padding: 10,
            borderRadius: 10,
            transition: "all 0.2s",
            cursor: "pointer",
            "&:hover": {
                background: activeColor ?? "#fff"
            },
            pointerEvents: props.disabled ? "none" : "auto",
            filter: props.disabled ? "invert(0.8)" : "",
        }
    }))

    const classes = useStyles();

    return (
        <FlexContainer gap={8} style={{background: active ? activeColor ?? "#fff" : "", ...props.style}}
                       className={classes.hover} onClick={props.onClick}>
            {!!props.icon && <props.icon fontSize={24} style={{minWidth: 24}}/>}
            <div style={{fontSize: 16, marginLeft: props.icon ? 0 : 5}}>{name}</div>
        </FlexContainer>
    );
};

MenuItem.defaultProps = {
    active: false,
    isBack2: false,
    disabled: false,
}

MenuItem.propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    isBack2: PropTypes.bool,
    activeColor: PropTypes.string,
    disabled: PropTypes.bool,

    style: PropTypes.object,
}

export default MenuItem;