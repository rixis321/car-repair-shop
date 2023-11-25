
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = sessionStorage.getItem('token');
        return { accessToken: token || null };
    });

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setAuth((prevAuth) => {
            if (token !== prevAuth.accessToken) {
                return { accessToken: token || null };
            }
            return prevAuth;
        });
    }, [auth]);

     console.log(auth)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
