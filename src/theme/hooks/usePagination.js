import React from 'react';

const usePagination = (state, stateUpd, data, allCount=0) => {
    const {limit, offset} = state

    function setOffset(newOffset, saveObj) {
        stateUpd({...saveObj, offset: newOffset})
    }
    const canGoNext = data?.length === limit
    const canGoBack = offset>=limit
    function goNext(saveObj) {
        if (!canGoNext) return
        setOffset(offset+limit, saveObj)
    }

    function goBack(saveObj) {
        if(!canGoBack) return
        setOffset(offset-limit, saveObj)
    }

    const page = 1 + Math.trunc(offset / limit) ?? 1

    let allPages = 0
    if (allCount)
        allPages =  1 + Math.trunc(allCount / limit) ?? 0

    return {page, goNext, goBack, canGoNext, canGoBack, allPages}
};

export default usePagination;
