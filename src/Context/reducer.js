
export const reducer = (state, action) => {
    switch (action.type) {

        case 'RETRIEVEING_DATA':
            return {
                ...state,
                loading: true,
            }

        case 'RETRIEVE_DATA_SUCCESS':
            return {
                ...state,
                clients: action.payload,
                loading: false,
            }

        case 'ADD_CLIENT':
            return {
                ...state,
                clients: [action.payload, ...state.clients],
                editMode: false,
                alertMessage: 'Added item',
                alertType: 'success',
            }

        case 'EDIT_CLIENT':
            return {
                ...state,
                editMode: true,
                editingItem: state.clients.find(item => item.id === action.payload),
                alertMessage: 'Edit Mode',
                alertType: 'success',
            }

        case 'UPDATE_CLIENT':
            return {
                ...state,
                clients: action.payload,
                editMode: false,
                alertMessage: 'Updated Successfully',
                alertType: 'success',
            }

        case 'DELETE_CLIENT':
            return {
                ...state,
                clients: action.payload,
                alertMessage: 'Deleted item',
                alertType: 'danger',
            }

        case 'ERROR':
            return {
                ...state,
                alertMessage: 'Please fill all the fields...',
                alertType: 'warning',
            }

        default:
            return state;
    }
}

