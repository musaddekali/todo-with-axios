import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:3005',
    delay: 2000
});

export const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_CLIENT':
            const { name, job } = action.payload;
            if (state.editMode && name && job) {
                const updateData = async () => {
                    await api.put(`/clients/${state.editingItem.id}`, { name: name, job: job });
                }
                updateData();
                // Update client 
                const withUpdatedItem = state.clients.map(item => {
                    if (item.id === state.editingItem.id) {
                        return {
                            ...item,
                            name: name,
                            job: job,
                        }
                    }
                    return item;
                });

                return {
                    ...state,
                    clients: withUpdatedItem,
                    editingItem: {},
                    editMode: false,
                    alertMessage: 'Updated successfully',
                    alertType: 'info'
                }
            } else if (name && job) {
                // Add new client 
                const allClient = [action.payload, ...state.clients];
                async function postNewData() {
                    await api.post('/clients', action.payload);
                }
                postNewData();
                console.log('from submit new item', allClient);
                return {
                    ...state,
                    clients: allClient,
                    alertMessage: 'New item added successfully',
                    alertType: 'success'
                }

            } else if (name === '' || job === '') {
                // handle error 
                return {
                    ...state,
                    alertMessage: 'Please fill all field',
                    alertType: 'warning'
                }
            }

        case 'RETRIEVE_DATA':
            return {
                ...state,
                clients: action.payload,
            }

        case 'EDIT_CLIENT':
            return {
                ...state,
                editMode: true,
                editingItem: state.clients.find(item => item.id === action.payload)
            }

        case 'DELETE_CLIENT':
            const remainClients = state.clients.filter((item) => item.id !== action.payload);
            return {
                ...state,
                clients: remainClients,
                alertMessage: 'Item has Deleted successfully',
                alertType: 'danger'
            }

        default:
            return state;
    }
}

