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
        const { gameId, category, ...data } = resultData;

        // ONLY save results for 'Alle' (Mesternes Arena) to the public leaderboard
        if (category !== 'Alle') {
            console.log("Score not saved to global leaderboard (Category restricted).");
            return;
        }

        const timestamp = new Date().toISOString();
        const payload = {
            ...data,
            category: 'Mesternes Arena', // Explicitly name it for display
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

// --- Reset Leaderboard (Admin) ---
export const resetLeaderboard = async () => {
    try {
        const q = query(collection(db, RESULTS_COLLECTION));
        const snapshot = await getDocs(q);

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log("Leaderboard reset complete.");
    } catch (error) {
        console.error("Error resetting leaderboard:", error);
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

export const getWeeklyScores = async (limitCount = 10) => {
    try {
        // Calculate start of current week (Last Sunday 23:59 or Monday 00:00?)
        // User said: "reseter hver søndag klokken 23.59".
        // So we want scores AFTER the most recent Sunday 23:59.
        // If today is Tuesday, we want scores since Sunday.
        // If today is Sunday 22:00, we want scores since *last* Sunday unless we are in the current week?
        // Usually "Resets Sunday 23:59" means the new week start immediately after.

        const now = new Date();
        const day = now.getDay(); // 0 is Sunday
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday? 
        // No, let's find the *previous* Sunday 23:59:59.

        const lastSunday = new Date(now);
        // If today is Sunday, we assume the week *started* last Sunday. 
        // Wait, if it resets Sunday 23:59, then Monday-Sunday is the period.
        // So if today is Monday, previous Sunday 23:59 is yesterday.

        // Logic: Find most recent Sunday.
        // Set date to (current_date - current_day_of_week). 
        // If today is Sunday(0), we want Today 23:59? No, we want the START of the current period.
        // The start of the current period is the *previous* reset.
        // If today is Sunday, the previous reset was *last* Sunday (7 days ago).
        // If today is Monday, previous reset was yesterday (Sunday).

        // Actually simpler: The cutoff is "Last Sunday". 
        // `date.setDate(date.getDate() - (date.getDay() || 7))` -> gets previous Sunday.
        // But if today is Sunday, it gets *today*? 
        // Let's stick to standard ISO week? Monday is start.
        // Cutoff = Last Sunday 23:59:59.

        const cutoff = new Date(now);
        const distanceToSunday = (day === 0) ? 7 : day; // If su(0) -> 7 days ago. If Mo(1) -> 1 day ago.
        cutoff.setDate(now.getDate() - distanceToSunday);
        cutoff.setHours(23, 59, 59, 999);

        // Query: createdAt > cutoff
        // Note: createdAt is ISO string in DB. Compare string works if ISO.
        // `new Date().toISOString()`

        const cutoffISO = cutoff.toISOString();

        const q = query(
            collection(db, RESULTS_COLLECTION),
            where("createdAt", ">", cutoffISO)
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Client-side sort by score (desc) to avoid needing composite index
        results.sort((a, b) => b.score - a.score);

        return results.slice(0, limitCount);
    } catch (error) {
        console.error("Error fetching weekly scores:", error);
        return [];
    }
};



// --- Delete All Questions ---
// Helper to clear DB before re-seeding
// --- Seed Database (Sync: Updates existing, Adds new) ---
export const seedDatabase = async () => {
    console.log("Seeding database...");
    try {
        // 1. Get all existing questions
        const q = query(collection(db, QUESTIONS_COLLECTION));
        const snapshot = await getDocs(q);
        const existingMap = new Map(); // text -> id
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.questionText) {
                existingMap.set(data.questionText, doc.id);
            }
        });

        const batch = writeBatch(db);
        let addedCount = 0;
        let updatedCount = 0;

        // 2. Loop through seed data
        INITIAL_QUESTIONS.forEach(question => {
            if (existingMap.has(question.questionText)) {
                // Update existing
                const id = existingMap.get(question.questionText);
                const docRef = doc(db, QUESTIONS_COLLECTION, id);
                batch.set(docRef, question, { merge: true }); // Update fields like category/correctAnswer
                updatedCount++;
            } else {
                // Add new
                const docRef = doc(collection(db, QUESTIONS_COLLECTION));
                batch.set(docRef, question);
                addedCount++;
            }
        });

        await batch.commit();
        console.log(`Sync complete. Added: ${addedCount}, Updated: ${updatedCount}`);
        return { added: addedCount, updated: updatedCount, skipped: 0 };

    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
};
