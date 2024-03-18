import {routes} from "services/router/routes.jsx";
import {icons} from "services/consts/icons.js";

export const HEADER_TYPE = "header"
export const BIG_HEADER_TYPE = "big_header"
export const DIVIDER = "divider"

const back = {
    name: "Назад",
    icon: icons.back,
    back: true,
}
export const menu = [
    {type: HEADER_TYPE, name: "Продукты"},
    routes.products,
]

export const productMenu = [
    {type: BIG_HEADER_TYPE, name: "Страница продукта"},
    back,
    DIVIDER,
]