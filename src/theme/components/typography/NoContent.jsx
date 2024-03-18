import React from 'react';
import Header from "theme/components/typography/Header";
import PropTypes from "prop-types";
import {palette} from "theme/Theme.jsx";
import {icons} from "services/consts/icons.js";

const NoContent = (props) => {
    const {advice, isCard} = props

    return (
        <div className={`flex-column items-center`} style={{margin: isCard? "0px auto" : "30px auto", color: palette.gray}}>
            <icons.error style={{fontSize: 30}} className={`mb-2`}/>
            <Header title={props.title ?? "Контент отсутствует"}/>
            <p className={`text-default align-middle`} style={{textAlign: "center"}}>
                {advice?
                    advice :
                    props.noChanges?
                        "Попробуйте обновить страницу":
                        "Попробуйте обновить страницу или расширить фильтры"
                }
            </p>
        </div>
    );
};

NoContent.defaultProps = {
    noChanges: false,
    isCard: false
}

NoContent.propTypes = {
    title: PropTypes.string,
    advice: PropTypes.string,
    isCard: PropTypes.bool,
    noChanges: PropTypes.bool
}

export default NoContent;