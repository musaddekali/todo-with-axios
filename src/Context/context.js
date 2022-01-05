import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { reducer } from './reducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const initialState = {
        clients: [],
        editMode: false,
        editingItem: {},
        alertMessage: null,
        alertType: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (newClient) => {
        dispatch({ type: 'ADD_CLIENT', payload: newClient });
    }

    const editClient = (id) => {
        dispatch({ type: "EDIT_CLIENT", payload: id });
    }

    const deleteClient = (id) => {
        dispatch({ type: 'DELETE_CLIENT', payload: id });
    }

    const getLocalStorage = () => {
        let localData = JSON.parse(localStorage.getItem('clients'));
        dispatch({ type: 'RETRIEVE_DATA', payload: localData ? localData : {} });
        console.log('local data geted',localData);
    }

    const setLocalStorage = () => {
        localStorage.setItem('clients', JSON.stringify(state.clients));
        console.log('local data seted', state.clients)
    }

    useEffect(() => {
        getLocalStorage();
    }, []);

    useEffect(() => {
        setLocalStorage();
    }, [state.clients]);

    return (
        <AppContext.Provider value={{
            ...state,
            handleSubmit,
            editClient,
            deleteClient,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}
// Custom Hook 
export const useGlobalContext = () => {
    return useContext(AppContext);
}