import React from 'react';
import Layout from "layout/Layout.jsx";
import {routes} from "services/router/routes.jsx";
import usePagination from "theme/hooks/usePagination.js";
import {useParams} from "react-router-dom";
import useFetch from "theme/hooks/useFetch.js";
import {PRODUCTS_API} from "services/api/apiPathes.js";
import Product from "stories/product/Product.jsx";
import FlexContainer from "theme/components/containers/FlexContainer.jsx";
import ProductMenu from "scenes/products/page/menu/ProductMenu.jsx";
import SkeletonLoader from "stories/skeleton/SceletonLoader.jsx";
import NoContent from "theme/components/typography/NoContent.jsx";

const ProductPage = () => {
    const {productId} = useParams()
    const [product, getProduct,isFetching] = useFetch("GET", `${PRODUCTS_API}/${productId}`, {isAutoStart: true, initialValue: {}})
    return (
        <Layout title={"Продукт"}  icon={routes.products.icon} actions={<ProductMenu item={product} getProduct={getProduct}/> }>
            <FlexContainer>
                {isFetching ?
                    <SkeletonLoader container={"flex"} item={"product"} count={1}/>:
                    product ?
                        <Product item={product}/>:
                        <NoContent noChanges={true}/>
                }
            </FlexContainer>
        </Layout>
    );
};

export default ProductPage;