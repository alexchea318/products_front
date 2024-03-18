import Page404 from "services/router/Page404.jsx";
import {lazy} from "react";
import {icons} from "services/consts/icons.js";

const Products = lazy(()=> import("scenes/products/ProductsPage.jsx"))
const Product = lazy(() => import("scenes/products/page/ProductPage.jsx"))

export const routes = {
    404: {
        path: "*",
        name: "Ошибка 404. Страница отсутствует",
        component: <Page404/>
    },
    products: {
        path: "/products",
        component: <Products/>,
        icon: icons.product,
        name: "Продукты"
    },
    product: {
        name: "Обзор",
        path: "/products/:productId",
        component: <Product/>,
        icon: icons.product,
    },
}