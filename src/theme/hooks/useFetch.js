import {useEffect, useState} from "react";
import {JWT_LS_KEY} from "services/auth/consts.js";
import {parseToQuery} from "theme/functions/utils.js";
import {logError, logSuccess} from "theme/functions/errors.js";

/**
 * Выполняет fetch запрос.
 *
 * @param {string} method Возводимое в степень число.
 * @param {string} endpoint Адрес api.
 * @param {Object} config Объект с дополнительными параметрами.
 * @param {function|undefined} config.afterSuccess Функция, которая выполняется после успешного выполнения запроса.
 * @param {boolean|undefined} config.isAutoStart  Если передать true, то запрос выполнится сразу после монтирования элемента. По умолчанию false.
 * @param {boolean| [] |undefined} config.messages  Массив с успешным и не успешным сообщениями ["Успешно сделано", "Ошибка"]
 * По умолчанию true - выводит сообщение по умолчанию в зависимости от типа запроса, если передать false - то никаких сообщений не будет.
 * @param {any|undefined} config.initialValue  Начальное значение для data
 * @param {string|undefined} config.innerKey  Ключ, по которому надо получить значение из ответа
 * @return [data, doResponse, isFetching, isError, setData] массив с данными и функциями.
 */
const useFetch = (method, endpoint, config={}) => {
    const DEFAULT_VALUE = typeof (config?.initialValue) === "undefined"?null : config?.initialValue

    const [fetching, setFetching] = useState(!!config.isAutoStart)
    const [error, setError] = useState(false)
    const [data, setData] = useState(DEFAULT_VALUE)

    const {messages, afterSuccess, isAutoStart} = config

    const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
    if (!allowedMethods.includes(method)) {
        alert("!!!Method in useFetch not allowed")
        throw new Error("!!!Method not allowed")
    }

    const defaultMessageActions = {
        PUT: {
            success: "изменены",
            failed: "изменить"
        },
        PATCH: {
            success: "отредактированы",
            failed: "отредактировать"
        },
        POST: {
            success: "отправлены",
            failed: "отправить"
        },
        DELETE: {
            success: "удалены",
            failed: "удалить"
        },
        GET: {
            success: "ПРИ УСПЕХЕ УВЕДОМЛЕНИЕ НЕ НУЖНО!",
            failed: "получить"
        }
    }


    function notifyAboutSuccess () {
        if (method === "GET" || messages === false) return

        if (Array.isArray(messages)) logSuccess(messages[0])
        else logSuccess(`Данные успешно ${defaultMessageActions[method].success}`)
    }
    function notifyAboutFailed() {
        if (messages === false) return

        if (Array.isArray(messages)) logError(messages[1])
        else logError(`Не удалось ${defaultMessageActions[method].failed} данные`)
    }

    let token = localStorage.getItem(JWT_LS_KEY) || null;

    const abortController = new AbortController();
    const {signal} = abortController;
    function doResponse(newQuery=null, body=null, afterEndpoint="") {
        setFetching(true)
        setError(false)
        const bodyHeaders = {}

        if (!(body instanceof FormData)) {
            bodyHeaders["Content-Type"] = 'application/json'
        }

        if (!!body && !(body instanceof FormData)) {
            try {
                body = JSON.stringify(body);
            } catch (e) {
                body = ""
            }
        }
        if (!!body && !(body instanceof FormData)) {
            bodyHeaders['Content-Length'] = body.length.toString();
        }

        fetch(`${endpoint}${afterEndpoint}${parseToQuery(newQuery)}`, {
            method: method,
            signal: signal,
            credentials: 'same-origin',
            headers: {
                Authorization: `${token}`,
                ...bodyHeaders,
            },
            body,
        }).then(response => response.json().then(json => {
            if (!response.ok || response.status >= 400 || !json.msg) {
                setError(true)
                setData(DEFAULT_VALUE)

                notifyAboutFailed()
            } else {
                if (config?.innerKey)
                    setData(json?.msg[config.innerKey])
                else
                    setData(json?.msg)

                notifyAboutSuccess()
                if (typeof (afterSuccess) === "function") afterSuccess(json?.msg)
            }
        })).catch(e => {
            function isAbort(argE) {
                let errStr = argE?.toString()
                //console.log(errStr?.includes("AbortError"), errStr)
                if (typeof (errStr) !== "string" ) return false
                return errStr?.includes("AbortError")
            }
            setError(true)
            setData(DEFAULT_VALUE)
            if (isAbort(e)) {
                return
            }

            console.log(e,"\n", e?.toString())
            notifyAboutFailed()
        }).finally(() => setFetching(false))
    }

    useEffect(() => {
        if(isAutoStart) doResponse()

        return () => {
            abortController.abort();
        };
    }, [endpoint])

    return [data, doResponse, fetching, error, setData]
};

export default useFetch;
