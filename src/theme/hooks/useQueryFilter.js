import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {parseToQuery} from "theme/functions/utils.js";

const useQueryFilter = () => {
    const navigate = useNavigate()
    //const history = useHistory()

    const location = useLocation()

    const pushQuery = (obj) => {
        navigate(parseToQuery(obj), {replace: true})
        //history.replace({right: parseToQuery(obj)})
    }

    const parseValue = (defaultState,key, value) => {
        if (Array.isArray(defaultState[key])) {
            if (value?.length) return [...value.split(",")]
            else return []
        }
        else if (typeof defaultState[key] === "number") return parseInt(value)
        else if (typeof defaultState[key] === "boolean") return value === 'true'
        else return value
    }

    const getQuery = (defaultState) => {
        if (!location.search) return null
        let params = new URLSearchParams(location.search)
        let objectParams = {}
        for (let [key, value] of params) {
            //console.log([key, value])
            objectParams[key] = parseValue(defaultState, key, value)
        }
        return objectParams
    }

    function queryResetPagination () {
        let query = getQuery({offset: 0})
        if (!query) query = {}
        if (query?.offset) {
            pushQuery({offset: 0})
        }
    }

    return [getQuery, pushQuery, queryResetPagination];
};

export default useQueryFilter;
