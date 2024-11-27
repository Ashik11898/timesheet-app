import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextType = {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({children}:PropsWithChildren){
    const [user,setUser] = useState<string | null>(null)
    return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
}


export const useUserContext =()=>{
    const context = useContext(AuthContext)
    if(context === undefined || context === null){
        throw new Error("undefined")
    }

    const {user,setUser} = context
    return {user,setUser}
}