import Form from "./Form"
import BoxList from './ClientsList';
import Loading from './Loading';
import { useGlobalContext } from "../context/context";

const Todo = () => {
    const { loading } = useGlobalContext();
    return (
        <>
            <main>
                {loading && <Loading />}
                <div className="container">
                    <Form />
                    <BoxList />
                </div>
            </main>
        </>
    )
}

export default Todo;