import React, {useEffect, useLayoutEffect} from 'react';
import useFetch from "theme/hooks/useFetch.js";
import useStateHandler from "theme/hooks/useStateHandler.js";
import usePagination from "theme/hooks/usePagination.js";
import useQueryFilter from "theme/hooks/useQueryFilter.js";
/**
 * Выполняет fetch запрос.
 *
 * @param {Object} DEFAULT_STATE Объект DEFAULT_STATE.
 * @param {string} apiPath Адрес api.
 * @param {Object} options Объект с дополнительными параметрами.
 * @param {boolean|undefined} options.noQuery  Если передать true, то фильтры не будут сохраняться в поисковой строке.
 * @param {boolean|undefined} options.noScroll  Если передать true, то не будет скрола наверх при пагинации
 * @param {boolean|undefined} options.isBlock  Условие, при котором блочится запрос
 * @param {number|undefined} options.allCount  Общее количество элементов
 * @param {boolean | undefined} options.isInterval  Использовать ли глобальный интервал обновления
 * @param {Array | undefined} options.deps  Дополнительные зависимости

 * @return { data, state,stateUpd, isFetching, options} Объект stateObject
 */
const useStateFilter = (DEFAULT_STATE, apiPath, options={}) => {
    const {noQuery} = options
   // const location = useLocation()
    //console.log(location)

    const [data, doResponse, isFetching, isError, setData] = useFetch("GET", apiPath)

    const isBlock = !!options?.isBlock
    const hookDeps = options?.deps ?? []
    DEFAULT_STATE = {...DEFAULT_STATE, ...options.fixedQuery, offset: 0}

    const [state, stateHandler, setState] = useStateHandler(DEFAULT_STATE);
    const [getQuery, pushQuery] = useQueryFilter()

    const paginationObject = usePagination(state, stateUpd, data, options.allCount)

    function beforeUpd (isReset=false, newFilters) {
        if (options.isBlock) return

        if (isReset) {
            doResponse({...DEFAULT_STATE})
        }
        else {
            doResponse({...state, ...newFilters})
        }
    }

    function stateUpd (newObject, needApply=false) {
        stateHandler(newObject)
        if (!needApply)
            applyHandler(newObject)
    }

    const applyHandler = (newFilters = null) => {
        let finalFilter = {...state, ...newFilters}
        if(newFilters?.offset === undefined)  {
            finalFilter = {...finalFilter, offset: 0}
            stateHandler(finalFilter)
        }
        else {
            if (!options.noScroll) window.scrollTo(0, 0)

            if (JSON.stringify(state)!==JSON.stringify(finalFilter))
                stateHandler(finalFilter)
        }

        if (!noQuery) pushQuery(finalFilter)

        beforeUpd(false, finalFilter)
    }

    function resetHandler() {
        setState(DEFAULT_STATE)
        if (!noQuery) pushQuery(null)
        beforeUpd("isReset")
    }

    useLayoutEffect(()=>{
        let query = getQuery(DEFAULT_STATE)
        if (!options.noScroll) window.scrollTo(0, 0)

        if(isBlock) return
        if (noQuery) {
            beforeUpd("isReset")
            return;
        }

        if (query) {
            let newState = {...DEFAULT_STATE, ...query}
            //if (!noQuery) pushQuery(parseIfNotDefault(newState))

            applyHandler(newState)
        }

        else {
            beforeUpd("isReset")
        }
    }, [isBlock, ...hookDeps])

    //Need upd hooks
    function stateReload () {
        beforeUpd()
    }
    //End need upd hooks

    //Crud Logic
    function arrayEdit(callback) {
        setData(data.map(el=>callback(el)))
    }
    function arrayDelete(callback) {
        setData(data.filter(el=>callback(el)))
    }
    function arrayAdd(payload) {
        if (!options.noScroll) window.scrollTo(0, 0)

        if(state.offset === 0) {
            setData([payload, ...data])
        }
        else {
            applyHandler()
        }
    }
    //End CRUD hooks

    let canReset = JSON.stringify(DEFAULT_STATE) !== JSON.stringify(state)

    return {
        data,
        state,
        stateUpd,
        isFetching: isFetching,
        options: {
            isFetching: isFetching,
            isError,
            canReset,
            resetHandler,
            applyHandler,
            DEFAULT_STATE,
            setData,
            ...paginationObject,

            arrayAdd,
            arrayEdit,
            arrayDelete,
            stateReload,
        }
    }
};


export default useStateFilter;
