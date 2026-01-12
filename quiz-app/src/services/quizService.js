import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, setDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, writeBatch } from 'firebase/firestore';
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

// --- Leaderboard Results ---
const RESULTS_COLLECTION = 'results';

export const saveResult = async (resultData) => {
    try {
        const { gameId, ...data } = resultData;

        const timestamp = new Date().toISOString();
        const payload = {
            ...data,
            createdAt: timestamp
        };

        if (gameId) {
            // Idempotent save: use gameId as document ID
            await setDoc(doc(db, RESULTS_COLLECTION, gameId), payload);
        } else {
            // Fallback: auto-generated ID
            await addDoc(collection(db, RESULTS_COLLECTION), payload);
        }
    } catch (error) {
        console.error("Error saving result:", error);
        throw error;
    }
};

export const getTopScores = async (limitCount = 10) => {
    try {
        const q = query(
            collection(db, RESULTS_COLLECTION),
            orderBy("score", "desc"),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
};



// --- Delete All Questions ---
// Helper to clear DB before re-seeding
// --- Seed Database (Additive) ---
// This function adds only NEW questions from questions_seed.js
export const seedDatabase = async () => {
    console.log("Seeding database...");
    try {
        // 1. Get existing questions to avoid duplicates
        const q = query(collection(db, QUESTIONS_COLLECTION));
        const snapshot = await getDocs(q);
        const existingTexts = new Set(snapshot.docs.map(doc => doc.data().questionText));

        // 2. Filter out duplicates
        const newQuestions = INITIAL_QUESTIONS.filter(q => !existingTexts.has(q.questionText));

        if (newQuestions.length === 0) {
            console.log("No new questions to add.");
            return { added: 0, skipped: existingTexts.size };
        }

        // 3. Batch add new questions
        const batch = writeBatch(db);
        newQuestions.forEach(q => {
            const docRef = doc(collection(db, QUESTIONS_COLLECTION));
            batch.set(docRef, q);
        });

        await batch.commit();
        console.log(`Added ${newQuestions.length} new questions. Skipped ${INITIAL_QUESTIONS.length - newQuestions.length} duplicates.`);
        return { added: newQuestions.length, skipped: INITIAL_QUESTIONS.length - newQuestions.length };

    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
};
