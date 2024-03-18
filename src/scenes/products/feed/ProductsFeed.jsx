import React from 'react';
import PropTypes from 'prop-types';
import FeedScroll from "theme/components/containers/FeedScroll.jsx";
import Product from "stories/product/Product.jsx";
import SkeletonLoader from "stories/skeleton/SceletonLoader.jsx";

const ProductsFeed = props => {
    const {stateObject} = props
    return (
        <FeedScroll
            noHead={true}
            columns={2}
            loader={<SkeletonLoader item={"product"} container={"flex"} count={2}/>}
            stateObject={stateObject}
            component={Product}
        />
    );
};

ProductsFeed.propTypes = {
    stateObject: PropTypes.object.isRequired,
};

export default ProductsFeed;