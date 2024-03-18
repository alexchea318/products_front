import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "services/router/routes";
import {
    menu, productMenu
} from "./menu";

const useCustomPaths = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const goBack = () => {
        const history =  window.history
        if (!history.state) navigate(routes.products.path)
        else navigate(-1)
    }

    const customPaths = {
        productReview: `0`,
    }

    function getCustomPath(el) {
        if (el.customPath) {
            if (customPaths[el.customPath].includes("undefined")) {
                //navigate(DEFAULT_PATH)
            }
            return `${el.path}/${customPaths[el.customPath]}`
        }
        return el.path
    }

    function getMenu() {
        if (location.pathname.includes(`${routes.products.path}/`)) return productMenu

        return menu
    }

    let currentMenu = getMenu()

    return [currentMenu, getCustomPath, goBack]
}

export default useCustomPaths
