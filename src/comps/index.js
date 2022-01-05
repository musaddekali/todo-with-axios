import { useEffect } from "react";
import Form from "./Form"
import BoxList from './ClientsList';

const Todo = () => {
    return (
        <>
            <main>
                <div className="container">
                    <Form />
                    <BoxList/>
                </div>
            </main>
        </>
    )
}

export default Todo;