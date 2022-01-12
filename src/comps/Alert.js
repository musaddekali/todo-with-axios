import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context"

export default function Alert() {
    const [show, setShow] = useState(null);
    const { alertMessage, alertType } = useGlobalContext();

    useEffect(() => {

        if (alertMessage) {
            setShow(true);
        }
        const timeingId = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => clearTimeout(timeingId);

    }, [alertMessage]);

    return (
        <>
            {
                show && (
                    <div className="alert-message position-absolute bottom-0 start-50 translate-middle-x" style={{ zIndex: 9999 }}>
                        <p className={`alert alert-${alertType} text-center`}>{alertMessage}</p>
                    </div>
                )
            }
        </>
    )
}
