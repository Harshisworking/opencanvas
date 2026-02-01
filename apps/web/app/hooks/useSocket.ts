import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loding, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODJmYjNjNWEtYWVkNS00MGRiLTk1MjMtNzljZDFiOTM3NzhlIiwiaWF0IjoxNzY3NTQ3NjAwfQ.LtM-1NIEeXl1nPKcMjFGL3CRowaPiOBsFUzGcpVEWwE`);

        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };

        return () => {
            ws.close();
        }
    }, []);

    return { socket, loding };
}