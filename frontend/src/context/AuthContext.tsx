import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { axiosRequest } from "@/service/axiosHelper";

type AuthContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

type RefreshResponse ={
  accessToken: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // To handle initial loading state
  //const location = useLocation(); // Get the current route

  useEffect(() => {
    const isProtectedRoute = ["/chatPage", "/timesheetPage"].includes(location.pathname); // Check if current route is protected

    const refreshUser = async () => {
      try {
        setLoading(true);
        const response = await axiosRequest<RefreshResponse>({ method: "GET", url: "/api/refresh" });
        if (response?.accessToken) {
          setUser(response.accessToken); // Set user with the refreshed token
        } else {
          setUser(null); // Clear user if refresh fails
        }
      } catch (error) {
        console.error("Failed to refresh user:", error);
        setUser(null);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (isProtectedRoute && !user) {
      // Call refresh API only if user is on a protected route and user state is null
      refreshUser();
    } else {
      setLoading(false); // If not a protected route, stop loading
    }
  }, [location.pathname, user]); // Run effect when route or user state changes

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner if necessary
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};
