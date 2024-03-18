import React from 'react';
import "./style.css"
import {makeStyles} from "@fluentui/react";

const useStyles = makeStyles((theme) => ({
    word: {
        width: 100,
        height: 25,
    },
    tableWord: {
        width: "100%",
        height: 20,
    },
    line: {
        width: "100%",
        height: 20,
    },
    product: {
        width: "100%",
        height: 300,
    }
}));

const SkeletonElement = (props) => {
    const classes = useStyles();

    function getClass(type){
        let cls = classes[type]
        return cls ?? "none"
    }

    return (
        <div className={`${getClass(props.item)} load` }/>
    );
};

export default SkeletonElement;
