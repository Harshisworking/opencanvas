"use client"

import Dashboard from "@/app/components/Dashboard";
import Protected from "@/app/components/Proctected";

export default function DashboardPage() {
    return <Protected>
        <Dashboard />
    </Protected>
}