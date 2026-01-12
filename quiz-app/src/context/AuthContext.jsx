import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile, updateUserLastLogin } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                setCurrentUser(user);
                // Try to fetch profile (nickname)
                try {
                    const profile = await getUserProfile(user.uid);
                    setUserProfile(profile);
                    // Update login time silently
                    if (profile) {
                        updateUserLastLogin(user.uid);
                    }
                } catch (err) {
                    console.error("Failed to fetch profile", err);
                }
            } else {
                setCurrentUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Helper to refresh profile (e.g. after creating nickname)
    const refreshProfile = async () => {
        if (currentUser) {
            const profile = await getUserProfile(currentUser.uid);
            setUserProfile(profile);
        }
    };

    const value = {
        currentUser,
        userProfile,
        loading,
        refreshProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
