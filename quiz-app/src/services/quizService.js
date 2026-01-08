import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { INITIAL_QUESTIONS } from '../lib/questions_seed';

const QUESTIONS_COLLECTION = 'questions';

// --- Fetch Questions ---
export const getQuestions = async (category = 'Alle') => {
    try {
        let q = collection(db, QUESTIONS_COLLECTION);

        // If category is specified and not 'Alle', filter
        if (category !== 'Alle') {
            q = query(collection(db, QUESTIONS_COLLECTION), where("category", "==", category));
        }

        const querySnapshot = await getDocs(q);
        const questions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

// --- Add Question ---
export const addQuestion = async (questionData) => {
    try {
        const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), questionData);
        return { id: docRef.id, ...questionData };
    } catch (error) {
        console.error("Error adding question:", error);
        throw error;
    }
};

// --- Update Question ---
export const updateQuestion = async (id, questionData) => {
    try {
        const questionRef = doc(db, QUESTIONS_COLLECTION, id);
        await updateDoc(questionRef, questionData);
        return { id, ...questionData };
    } catch (error) {
        console.error("Error updating question:", error);
        throw error;
    }
};

// --- Delete Question ---
export const deleteQuestion = async (id) => {
    try {
        await deleteDoc(doc(db, QUESTIONS_COLLECTION, id));
        return id;
    } catch (error) {
        console.error("Error deleting question:", error);
        throw error;
    }
};

// --- Seed Database ---
// This function uploads all initial questions to Firestore
// ONLY run this if the DB is empty to avoid duplicates
export const seedDatabase = async () => {
    console.log("Seeding database...");
    const promises = INITIAL_QUESTIONS.map(q => addDoc(collection(db, QUESTIONS_COLLECTION), q));
    await Promise.all(promises);
    console.log("Database seeded successfully!");
};
