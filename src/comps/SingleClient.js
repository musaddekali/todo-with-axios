import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGlobalContext } from '../context/context';

export default function SingleClient({ client }) {
    const { id, name, job } = client;
    const { deleteClient, editClient } = useGlobalContext();
    return (
        <div className="col-md-4 mb-4 d-flex align-items-stretch anim-zoom-in">
            <div className="card w-100">
                <div className="card-body">
                    <h4 className="card-title">Name: {name}</h4>
                    <h6 className="card-text">Job: {job}</h6>
                    <div className="d-grid gap-2">
                        <button
                            onClick={() => editClient(id)}
                            title="Edit this"
                            className="btn btn-sm btn-primary">
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => deleteClient(id)}
                            title="Delete this"
                            className="btn btn-sm btn-danger">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
