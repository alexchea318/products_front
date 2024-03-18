import React from 'react';
import PropTypes from "prop-types";
import Header from "theme/components/typography/Header.jsx";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import Pagination from "theme/components/overides/Pagination.jsx";
import {unique} from "theme/functions/utils.js";
import NoContent from "theme/components/typography/NoContent.jsx";

const FeedScroll = (props) => {
    const {stateObject} = props
    const {data} = stateObject
    const count = data?.length ?? 0

    let columns = props.columns
    if (!count || props.fetching) columns = 1

    return (
        <div>
            <div>
                {!props.noHead &&
                    <Header h={1} title={props.title} icon={props.icon} className={`mb--1`}/>}
            </div>

            <TrueGrid columns={columns ?? 1} gap={props.gap ?? 10}>
                {stateObject.options.isFetching ?
                    props.loader :
                    count && Array.isArray(data) ?
                        data.map(el =>
                            <props.component item={el} {...props.componentProps} key={unique(el)}/>
                        ) :
                        <NoContent card/>
                }
            </TrueGrid>

            <Pagination stateObject={stateObject}/>
        </div>
    );
};

FeedScroll.propTypes = {
    noHead: false,
    columns: 1
}

FeedScroll.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    noHead: PropTypes.bool,

    stateObject: PropTypes.object.isRequired,

    gap: PropTypes.any,
    columns: PropTypes.number,
    loader: PropTypes.element.isRequired,

    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object
}

export default FeedScroll;
