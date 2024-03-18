import React from 'react';
import PropTypes from 'prop-types';
import {palette} from "theme/Theme";
import {parseTimeFromStrLarge} from "theme/functions/time";

const TTime = props => {
    const {time} = props

    function prettier() {
        if (!props.isPrettied) return parseTimeFromStrLarge(time)
        return time
    }

    return (
        <i style={{fontSize: 12, color: palette.gray, ...props.style}}>{prettier()}</i>
    );
};

TTime.defaultProps = {
    isPrettied: false
}

TTime.propTypes = {
    time: PropTypes.any.isRequired,
    isPrettied: PropTypes.bool,
};

export default TTime;
