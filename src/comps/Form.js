import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import Alert from "./Alert";

const inSt = {
    name: '',
    job: ''
}

export default function Form() {
    const [client, setClient] = useState(inSt);
    const { handleSubmit, editMode, editingItem } = useGlobalContext();

    const onFormDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setClient({ ...client, [name]: value });
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // const newClient = { ...client, id: Date.now() };
        handleSubmit(client);
        if (client.name && client.job) {
            setClient(inSt);
        }
    }

    const handleEditData = useCallback(() => {
        setClient({ name: editingItem.name, job: editingItem.job });
    }, [editingItem]);

    useEffect(() => {
        // set edit item data in form when editMode is on 
        if (editMode) {
            handleEditData()
        }
    }, [editMode, handleEditData]);

    const { name, job } = client;

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <Alert />
                <input
                    onChange={onFormDataChange}
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={name}
                    className="form-control mb-3 shadow-none"
                />
                <input
                    onChange={onFormDataChange}
                    type="text"
                    name="job"
                    placeholder="Job..."
                    value={job}
                    className="form-control mb-3 shadow-none"
                />
                <div className="text-end">
                    <button type="submit" className="btn btn-success">
                        {editMode ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
            <hr />
        </>
    )
}
