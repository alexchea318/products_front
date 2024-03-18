import React, {useState} from 'react';

const useStateHandler = (DEFAULT_STATE) => {
    const [state, setState] = useState({...DEFAULT_STATE})
    const stateHandler = (newObj) => setState( prev=> {return {...prev, ...newObj}})
    return [state, stateHandler, setState]
};

export default useStateHandler;
