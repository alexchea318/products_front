import React from 'react';
import {Card} from "@fluentui/react-components";

const TCard = (props) => {
    return (
        <div style={{
            background: "#fff",
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: "15",
            padding: "25px",
            ...props.style,
        }}
        >
            {props.children}
        </div>
    );
};

export default TCard;