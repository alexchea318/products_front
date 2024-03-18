import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {palette} from "theme/Theme.jsx";
import {Button, TextField} from "@fluentui/react";
import {icons} from "services/consts/icons.js";
import {useDebouncedCallback} from "use-debounce";
import FlexContainer from "theme/components/containers/FlexContainer.jsx";

const Pagination = props => {
    const {stateObject, isLittle} = props
    const {options} = stateObject
    const {state, stateUpd} = stateObject

    const debouncedLimit = useDebouncedCallback(
        (value) => {
            stateUpd({limit: value});
        },
        500
    );

    const debouncedPage = useDebouncedCallback(
        (value) => {
            stateUpd({offset: (value-1)*state.limit});
        },
        500
    );

    const [limit, setLimit] = useState(state.limit)
    const [page, setPage] = useState(state.page)
    useEffect(() => {
        setPage(Math.trunc(state.offset / state.limit) + 1)
    }, [state.offset]);
    useEffect(() => {
        setLimit(state.limit)
    }, [state.limit]);

    function limitHandler(newLimit) {
        if (newLimit < 1) return

        setLimit(newLimit)
        debouncedLimit(newLimit)
    }

    function pageHandler(newPage) {
        if (newPage < 1 ) return
        setPage(newPage)
        debouncedPage(newPage)
    }

    //if (!options.canGoBack && !options.canGoNext) return null

    return (
        <div className={`flex items-center mt-3`}>
            <div style={{fontSize: 14}}>
                <FlexContainer>
                    <span style={{color: palette.gray}}>Страница: </span>
                    <TextField value={page??1}
                               onChange={e => pageHandler(e.target.valueAsNumber)}
                               type={"number"}
                               style={{width: 60}}
                               min={1}
                    />

                    {!!options.allPages &&
                        <span><span style={{color: palette.gray}}> из </span><b>{options.allPages}</b></span>
                    }

                    <span style={{color: palette.gray}}>на странице: </span>
                    <TextField value={limit??10}
                               onChange={e => limitHandler(e.target.valueAsNumber)}
                               type={"number"}
                               style={{width: 60}}
                               min={1}
                    />
                </FlexContainer>
            </div>

            <Button disabled={!options.canGoBack}
                    color={isLittle ? "inherit" : "primary"}
                    className={`ml-3`}
                    onClick={() => options.goBack()}
            >
                <icons.before/>
                Назад
            </Button>

            <Button disabled={!options.canGoNext}
                    color={isLittle ? "inherit" : "primary"}
                    className={`ml-2`}
                    onClick={() => options.goNext()}
                    size={isLittle ? "small" : ""}
            >
                Вперед

                <icons.next/>
            </Button>
        </div>
    );
};

Pagination.defaultProps = {
    isLittle: false
}

Pagination.propTypes = {
    stateObject: PropTypes.object.isRequired,
    isLittle: PropTypes.bool
};

export default Pagination;
