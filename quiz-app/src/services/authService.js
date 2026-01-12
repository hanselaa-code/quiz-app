import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

const USERS_COLLECTION = 'users';

// --- Authentication ---
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
};

// --- User Profiles ---
export const getUserProfile = async (uid) => {
    try {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile:", error);
        throw error;
    }
};

export const createUserProfile = async (user, nickname) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, user.uid);
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName, // Google Name
            nickname: nickname, // Custom Game Nickname
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        // We use setDoc with merge: true just in case, but usually this is first time creation
        await setDoc(userRef, userData, { merge: true });
        return userData;
    } catch (error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
};

export const updateUserLastLogin = async (uid) => {
    try {
        const userRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(userRef, {
            lastLogin: new Date().toISOString()
        });
    } catch (error) {
        // Ignore if user doc doesn't exist yet (will be created in profile step)
        console.log("Could not update last login, probably new user.");
    }
};

// --- Admin ---
export const getAllUsers = async () => {
    try {
        const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting all users:", error);
        throw error;
    }
};
