import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TopLoader from "theme/components/containers/TopLoader.jsx";
import {routes} from "services/router/routes.jsx"

const AppRouter = props => {
    return (
        <Suspense fallback={ <TopLoader fetching={true}/>}>
            <Routes>
                {Object.values(routes).map(el=>
                    <Route path={`${el.path}${el.id? `/:${el.id}`: ""}`} element={el.component} key={el.path}/>
                )}
            </Routes>
        </Suspense>
    );
};

AppRouter.propTypes = {

};

export default AppRouter;