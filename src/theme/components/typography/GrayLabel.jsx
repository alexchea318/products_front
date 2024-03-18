import React from 'react';
import PropTypes from "prop-types";

const GrayLabel = (props) => {
    return (
        <div className={props.className}
             style={{color: "#b7b7b7", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 5, ...props.style}}
        >
            {props.children}
        </div>
    );
};

GrayLabel.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any.isRequired,
}

export default GrayLabel;