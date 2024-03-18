import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@fluentui/react";
import {useDebouncedCallback} from "use-debounce";

const ProductsFilters = props => {
    const {stateObject} = props
    const {state, stateUpd} = stateObject

    const debounced = useDebouncedCallback(
        (value) => {
            stateUpd({search: value});
        },
        500
    );

    const [search, setSearch] = useState(state.search)

    function searchHandler(newVal) {
        setSearch(newVal)
        debounced(newVal)
    }

    useEffect(() => {
        setSearch(state.search)
    }, [state.search]);

    return (
        <>
            <TextField value={search} onChange={e=>searchHandler(e.target.value)} placeholder={"Поиск..."}/>
        </>
    );
};

ProductsFilters.propTypes = {
    stateObject: PropTypes.object.isRequired
};

export default ProductsFilters;