import React, {useEffect, useRef} from 'react';
import LoadingBar from "react-top-loading-bar";
import {palette} from "theme/Theme.jsx";

const TopLoader = ({fetching}) => {
    const ref = useRef(null)

    //console.log({fetching})

    useEffect(()=>{
        if (fetching) {
            ref.current.staticStart()
        }
        else if (fetching===false) {
            ref.current.complete()
        }
    }, [fetching])


    return (
        <div>
            <LoadingBar color={palette.accent} ref={ref}/>
        </div>
    );
};

export default TopLoader;
