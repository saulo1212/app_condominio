import React,{createContext, useContext,useReducer} from 'react';
import UseReducer from '../reducers/UseReducer';

const initialState = {
    user:UseReducer()
};

const MainReducer = (state,action) => ({
    user: UseReducer(state.user, action)
});

export const StateContext = createContext();

export const StateProvider = ({children}) => {

    const[state,dispatch] = useReducer(MainReducer, initialState);

    return(
        <StateContext.Provider value={[state,dispatch]}>
            {children}
        </StateContext.Provider>
    );
};

export const  useStateValue = () => useContext(StateContext);