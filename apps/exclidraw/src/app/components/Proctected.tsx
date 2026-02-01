"use client";

import { useAuth } from "../Hooks/useAuth";

export default function Protected({
    children
}: {
    children: React.ReactNode;
}) {
    const { loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return <>{children}</>;
}