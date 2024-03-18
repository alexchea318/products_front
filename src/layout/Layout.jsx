import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {PROJECT_NAME} from "services/consts/global.js";
import TopLoader from "theme/components/containers/TopLoader.jsx";
import {Stack} from "@fluentui/react";
import Header from "theme/components/typography/Header.jsx";
import PropTypes from "prop-types";
import {sticky} from "theme/Theme.jsx";
import FlexContainer from "theme/components/containers/FlexContainer.jsx";

const Layout = (props) => {
    const navigate = useNavigate()
    const navHandler = () => props.back ? navigate(-1) : null

    document.title = `${PROJECT_NAME} - ${props.title}`

    const textRef = useRef(null)
    const containerRef = useRef(null)

    function scroller() {
        if (window.scrollY > 60 && textRef.current) textRef.current.style.fontSize = "23px"
        else {
            if (textRef.current) textRef.current.style.fontSize = "26px"
        }
    }

    useEffect(() => {
        //scroller()
        /*document.addEventListener("scroll", scroller)
        return () => {
            document.removeEventListener("scroll", scroller)
        }*/
    }, [])

    return (
        <main>
            <TopLoader fetching={props.fetching}/>

            <div ref={containerRef}>
                <div style={{maxWidth: props.maxWidth ?? "", marginInline: "auto"}}>
                    {!props.noHead &&
                        <div className={`pb-2 pt-2 flex items-center justify-between`}
                             style={{gap: "10px", height: 59, marginBottom: 7, ...sticky, top: 0}}>
                            <div className={`flex items-center ${props.back && "cursor-pointer"}`}
                                 onClick={props.onClick ? props.onClick : navHandler} style={{gap: "10px"}}>
                                {props.back && <icons.back style={{fontSize: 30}}/>}
                                <Header title={props.title} h={1} textRef={textRef} icon={props.icon}/>
                            </div>

                            <FlexContainer>
                                {props.actions}
                            </FlexContainer>
                        </div>
                    }

                    {!!props.filters &&
                        <Stack className={"mb-3"}>
                            {props.filters}
                        </Stack>
                    }
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </main>
    );
};

Layout.defaultProps = {
    fetching: false,
    back: false,
    needSaveRight: false,
    noActions: false,
    noGlobal: false,
}

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    jsxTitle: PropTypes.any,
    fetching: PropTypes.bool.isRequired,

    back: PropTypes.bool,
    onClick: PropTypes.func,
    icon: PropTypes.any,
    actions: PropTypes.element,
    filters: PropTypes.element,
};

export default Layout