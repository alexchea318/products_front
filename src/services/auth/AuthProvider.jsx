import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import AuthPage from "services/auth/scenes/AuthPage.jsx";
import {JWT_LS_KEY} from "services/auth/consts.js";

export const AuthContext = createContext(null);
const AuthProvider = props => {
    const [currentUser, setCurrentUser] = useState(null);
    const isSaveJwt = !! localStorage.getItem(JWT_LS_KEY)

    return (
        <AuthContext.Provider value={{
            currentUser: currentUser,
            setCurrentUser: setCurrentUser
        }}>
            {!currentUser && !isSaveJwt ?
                <AuthPage/>:
                props.children
            }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
};

export default AuthProvider;