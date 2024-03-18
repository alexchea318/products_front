import React from 'react';
import {useNavigate} from "react-router-dom";
import {routes} from "services/router/routes.jsx";
import {Button, Stack} from "@fluentui/react";
import Layout from "../../layout/Layout.jsx";

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <Layout title={routes["404"].name}>
            <Stack>
                <Button onClick={()=>navigate(`/`)}>Домой</Button>
            </Stack>
        </Layout>
    );
};

export default Page404;
