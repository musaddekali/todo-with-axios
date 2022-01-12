import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import axios from 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:3005',
    delay: 2000
});

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const initialState = {
        loading: false,
        clients: [],
        editMode: false,
        editingItem: {},
        alertMessage: null,
        alertType: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = async (newClient) => {

        const { name, job } = newClient;

        if (state.editMode && name && job) {
            // update mode 
            const updatedClients = state.clients.map(item => {
                if (item.id === state.editingItem.id) {
                    return { ...item, name: name, job: job }
                }
                return item;
            })
            api.put(`/clients/${state.editingItem.id}`, newClient)
            dispatch({ type: 'UPDATE_CLIENT', payload: updatedClients });

        } else if (!state.editMode && name && job) {
            // add new item 
            const newItem = { ...newClient, id: Date.now().toString() };
            api.post('/clients', newItem);
            dispatch({ type: 'ADD_CLIENT', payload: newItem });


        } else if (name === '' || job === '') {
            // handle error 
            dispatch({ type: 'ERROR'});

        }
    }

    const editClient = (id) => {
        dispatch({ type: "EDIT_CLIENT", payload: id });
    }

    const deleteClient = async (id) => {
        await api.delete(`/clients/${id}`);
        const newItem = state.clients.filter(item => item.id !== id);
        dispatch({ type: 'DELETE_CLIENT', payload: newItem });
    }

    const fetchDataFromServer = async () => {
        // get data from json server 
        dispatch({ type: 'RETRIEVEING_DATA' });

        try {
            const { data } = await api.get('/clients');
            dispatch({ type: 'RETRIEVE_DATA_SUCCESS', payload: data });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDataFromServer();
    }, []);

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
