import React from 'react';
import PropTypes from "prop-types";
import {makeStyles} from "@fluentui/react";

const useStyles = makeStyles(theme => ({
    grid:{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "10px"
    },
}))


const TrueGrid = (props) => {
    const classes = useStyles()
    return (
        <div className={`${classes.grid} ${props.className}`}
             style={{
                 ...props.style,
                 gap:  props.gap,
                 alignItems: props.alignItems?? "",
                 gridTemplateColumns: props.template? props.template : `repeat(${props.columns?props.columns: 1}, ${props.columnWidth?props.columnWidth: "1fr"})`
             }}
        >
            {props.children}
        </div>
    );
};

TrueGrid.propTypes = {
    gap: PropTypes.number,
    template: PropTypes.string,
    columns: PropTypes.number,
    alignItems: PropTypes.string,
    columnWidth:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    className: PropTypes.string,
    style: PropTypes.object
}

export default TrueGrid;
