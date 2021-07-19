import { useState, useEffect } from 'react';

let gloablState = {};
let listners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(gloablState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](gloablState, payload);
        gloablState = { ...gloablState, ...newState };

        for (const listner of listners){
            listner(gloablState)
        }
    }

    useEffect(() => {
        if(shouldListen){
            listners.push(setState);
        }
        return () => {
            if(shouldListen){
                listners = listners.filter(li => li !== setState)
            }
        }
    }, [setState, shouldListen]);

    return [gloablState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if(initialState){
        gloablState = { ...gloablState, ...initialState };
    }
    actions = { ...actions, ...userActions };
}
