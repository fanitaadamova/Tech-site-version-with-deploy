import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();


export const AuthProvider = ({
    children,
}) => {
    
    //get from custom hook useLocalStorage
    const [auth, setAuth] = useLocalStorage('user');

    return (
        < AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};


