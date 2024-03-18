import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {palette, sticky} from "theme/Theme.jsx";
import {CartRegular} from "@fluentui/react-icons";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import MenuItem from "theme/components/overides/MenuItem.jsx";
import {BIG_HEADER_TYPE, DIVIDER, HEADER_TYPE} from "layout/menu/menu.js";
import Hr from "theme/components/typography/Hr.jsx";
import GrayLabel from "theme/components/typography/GrayLabel.jsx";
import useCustomPaths from "layout/menu/useCustomPaths.js";

const Sidebar = () => {
    const location = useLocation()

    const [currentMenu, getCustomPath, goBack] = useCustomPaths()

    return (
        <div style={{...sticky, top: 15}}>
            <Link to={"/"}>
                <div style={{display: "flex", alignItems: "center", gap: 7, paddingTop: 10}}>
                    <CartRegular style={{color: palette.accent, fontSize: 28, marginBottom: -3}}/>
                    <div>
                        <b style={{fontSize: 22}}>Продукты</b>
                    </div>
                </div>
            </Link>

            <nav style={{marginTop: 25}}>
                <TrueGrid gap={2}>
                    {currentMenu.map((el, index) =>
                        el.role === undefined ?
                            el === DIVIDER ?
                                <Hr style={{margin: "12px 0px"}} key={el + index}/> :
                                (el.type === HEADER_TYPE || el.type ===BIG_HEADER_TYPE) ?
                                    <GrayLabel  key={el + index} className={"mt-2 mb-2"} style={el.type===BIG_HEADER_TYPE?{fontSize: 15}:{}}>{el.name}</GrayLabel> :
                                    el.back ?
                                        <div onClick={goBack} key={el.name + el.path}>
                                            <MenuItem active={false} name={el.name} icon={el.icon}/>
                                        </div> :
                                        <Link to={getCustomPath(el)} key={getCustomPath(el)} replace={el.replace}>
                                            <MenuItem active={location.pathname === getCustomPath(el)} name={el.name}
                                                      icon={el.icon}/>
                                        </Link>
                            : null
                    )}
                </TrueGrid>
            </nav>
        </div>
    );
};

export default Sidebar;