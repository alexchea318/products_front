import React from 'react';
import PropTypes from "prop-types";
import SkeletonElement from "./SkeletonElement";
import {makeStyles} from "@fluentui/react";

const useStyles = makeStyles((theme) => ({
    words: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    items: {
        display: "grid",
        gap: "10px"
    },
    flex: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
    },
    threeColumnsGrid:{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px"
    }
}));

const SkeletonLoader = (props) => {
    const classes = useStyles();
    let array = Array.from(Array(props.count).keys())

    function getClass(type) {
        let cls = classes[type]
        return cls ?? "none"
    }

    return (
        <div className={`${getClass(props.container)} ${props.className}`}>
            {array.map(el => <SkeletonElement item={props.item} key={el}/>)}
        </div>
    );
};

SkeletonLoader.defaultProps = {
    count: 1
}

SkeletonLoader.propTypes = {
    container: PropTypes.oneOf(['words', 'items', "flex", "threeColumnsGrid"]).isRequired,
    item: PropTypes.oneOf(["product"]).isRequired,
    count: PropTypes.number,
};

export default SkeletonLoader;
