// hooks/useAuth.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
type UserDetails = {
    email: string;
    name: string;
    id: string;
    photo: string;
}

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        // 1. SAFETY CHECK: Don't run this logic on the login page itself
        // This prevents the infinite loop if something goes wrong.
        if (pathname === "/login") {
            setLoading(false);
            return;
        }

        verifyToken();
    }, [router, pathname]);

    async function verifyToken() {
        const token = localStorage.getItem("token");

        // If no token, kick to login
        if (!token) {
            router.push("/login");
            setLoading(false);
            return;
        }

        try {
            // 2. MATCHING YOUR MIDDLEWARE
            // We send the raw token because your backend does NOT use .split(' ')[1]
            const response = await axios.get("http://localhost:3002/verify-token", {
                headers: {
                    "authorization": token
                }
            });

            if (response.data.valid) {
                setUser(response.data.userId);
                setUserDetails(response.data.userDetails)
            } else {
                throw new Error("Token invalid");
            }
        } catch (error) {
            // 3. CIRCUIT BREAKER
            // Delete the bad token so the Login page doesn't bounce us back here.
            localStorage.removeItem("token");
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, userDetails };
};