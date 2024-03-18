import React from 'react';
import PropTypes from 'prop-types';
import Layout from "layout/Layout.jsx";
import {routes} from "services/router/routes.jsx";
import NewProduct from "scenes/products/feed/newProduct/NewProduct.jsx";
import ProductsFeed from "scenes/products/feed/ProductsFeed.jsx";
import {PRODUCTS_API} from "services/api/apiPathes.js";
import {DEFAULT_PRODUCTS_FILTER} from "scenes/products/logic/filters.js";
import useStateFilter from "theme/hooks/useStateFilter.js";
import ProductsFilters from "scenes/products/feed/filters/ProductsFilters.jsx";

const ProductsPage = props => {
    const stateObject = useStateFilter(DEFAULT_PRODUCTS_FILTER, `${PRODUCTS_API}/`)

    return (
        <Layout title={routes.products.name}
                icon={routes.products.icon}
                actions={<><NewProduct listUpd={stateObject.options.resetHandler}/></>}
                filters={<ProductsFilters stateObject={stateObject}/> }
        >
            <ProductsFeed stateObject={stateObject}/>
        </Layout>
    );
};

ProductsPage.propTypes = {

};

export default ProductsPage;