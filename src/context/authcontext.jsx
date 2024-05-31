import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null); // Add a state to hold the user's role

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                user.getIdTokenResult().then(idTokenResult => {
                    const userRole = idTokenResult.claims.role;
                    setRole(userRole); 
                    axios.defaults.headers.common['Authorization'] = `Bearer ${idTokenResult.token}`;
                });
            } else {
                delete axios.defaults.headers.common['Authorization'];
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
