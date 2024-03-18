import AuthProvider from "services/auth/AuthProvider.jsx";
import AppRouter from "services/router/AppRouter.jsx";
import SiteContainer from "layout/SiteContainer.jsx";
import "./theme/styles/App.css"
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <SiteContainer>
                    <AppRouter/>
                </SiteContainer>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
