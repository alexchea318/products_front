import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import useFetch from "theme/hooks/useFetch.js";
import {LOGIN_API} from "services/api/apiPathes.js";
import useStateHandler from "theme/hooks/useStateHandler.js";
import {AuthContext} from "services/auth/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {JWT_LS_KEY} from "services/auth/consts.js";
import {routes} from "services/router/routes.jsx";
import {Button, TextField} from "@fluentui/react";
import {CardUiFilled} from "@fluentui/react-icons";
import TrueGrid from "theme/components/containers/TrueGrid.jsx";
import Header from "theme/components/typography/Header.jsx";
import {icons} from "services/consts/icons.js";
import {Card} from "@fluentui/react-components";
import TCard from "theme/components/overides/TCard.jsx";
import {palette} from "theme/Theme.jsx";

function useSaveUser() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    function afterSuccess(payload) {
        localStorage.setItem(JWT_LS_KEY, payload)
        setCurrentUser(payload)

        setTimeout(()=>{
            window.location.href = routes.products.path
        },1)
    }

    return afterSuccess
}

const AuthPage = props => {
    const afterSuccess = useSaveUser()

    const [, doLogin] = useFetch("POST", LOGIN_API, {afterSuccess, messages: [
            "Успешный вход",
            "Неверный логин или пароль"
        ]})

    const defaultState = {
        username: "",
        password: "",
    }

    const [state, setStateHandler] = useStateHandler(defaultState)

    function onSubmit() {
        doLogin(null, state)
    }

    const isDisabled = !state?.username?.length || !state?.password?.length

    return (
        <div style={{display: "flex"}}>
            <TCard style={{
                width: 300,
                margin: "auto",
                marginTop: "25vh",
            }}>
                <TrueGrid  gap={20}>
                    <Header h={2} title={"Вход"}/>

                    <TrueGrid gap={10}>
                        <TextField value={state.username}
                                   onChange={e=>setStateHandler({username: e.target.value})}
                                   label={"Логин"}
                                   placeholder={"admin"}
                        />
                        <TextField value={state.password}
                                   onChange={e=>setStateHandler({password: e.target.value})}
                                   label={"Пароль"}
                                   placeholder={"admin"}
                        />
                    </TrueGrid>

                    <TrueGrid gap={5}>
                        <Button onClick={() => onSubmit()} primary disabled={isDisabled}>
                            <icons.key style={{marginRight: 10}}/>
                            Войти
                        </Button>

                        {isDisabled &&
                            <div>
                                <i style={{fontSize: 12, color: palette.gray}}>Необходимо ввести логин и пароль</i>
                            </div>
                        }
                    </TrueGrid>
                </TrueGrid>
            </TCard>
        </div>
    );
};

AuthPage.propTypes = {

};

export default AuthPage;