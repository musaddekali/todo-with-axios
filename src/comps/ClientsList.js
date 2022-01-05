import { useGlobalContext } from "../context/context";
import SingleClient from "./SingleClient";

const ClientsList = () => {
    const { clients } = useGlobalContext();
    return (
        <section className="row">
            {
                !clients.length ? (
                    <h1>Client List is Empty</h1>
                ) : (
                    clients.map(item => (
                        <SingleClient
                            key={item.id}
                            client={item}
                        />
                    ))
                )

            }
        </section>
    )
}

export default ClientsList;

