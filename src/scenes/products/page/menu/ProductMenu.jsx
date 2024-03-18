import React from 'react';
import PropTypes from 'prop-types';
import useFetch from "theme/hooks/useFetch.js";
import {PRODUCTS_API} from "services/api/apiPathes.js";
import {Button} from "@fluentui/react";
import {icons} from "services/consts/icons.js";
import {useNavigate} from "react-router-dom";
import {routes} from "services/router/routes.jsx";
import ProductUpdate from "scenes/products/page/menu/update/ProductUpdate.jsx";

const ProductMenu = props => {
    const {item} = props
    const navigate = useNavigate()
    function afterDelete() {
        navigate(routes.products.path)
    }

    const [,doDelete] = useFetch("DELETE", `${PRODUCTS_API}/${item?.id}`, {afterSuccess: afterDelete})

    return (
        <>
            <ProductUpdate item={item} getProduct={props.getProduct}/>

            <Button onClick={()=>doDelete()} disabled={!item?.id}>
                <icons.delete style={{marginRight: 10}}/>

                Удалить
            </Button>
        </>
    );
};

ProductMenu.propTypes = {
    item: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
};

export default ProductMenu;