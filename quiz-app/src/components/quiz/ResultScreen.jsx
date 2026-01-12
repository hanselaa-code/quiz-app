import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveResult } from '../../services/quizService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Leaderboard from './Leaderboard';
import { useAuth } from '../../context/AuthContext';

const ResultScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, loading } = useAuth();

    // Safety check for direct access
    const { score, total, category, gameId } = location.state || { score: 0, total: 0, category: 'Ukjent' };
    const username = userProfile?.nickname || currentUser?.displayName || localStorage.getItem('quiz_username') || 'Gjest';

    const hasSavedRef = useRef(false);
    const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success, error

    useEffect(() => {
        if (loading) return; // Don't run while loading

        if (!hasSavedRef.current && location.state) {
            hasSavedRef.current = true;
            const save = async () => {
                setSaveStatus('saving');
                try {
                    await saveResult({
                        uid: currentUser?.uid || null, // Link to user or null
                        username, // Display name
                        score,
                        category,
                        totalQuestions: total,
                        photoURL: currentUser?.photoURL || null, // Optional: show avatar later
                        gameId // Idempotency Key
                    });
                    setSaveStatus('success');
                    setRefreshLeaderboard(prev => prev + 1);
                } catch (error) {
                    console.error("Failed to save result", error);
                    setSaveStatus('error');
                }
            };
            save();
        }
    }, [currentUser, username, score, category, total, location.state, loading]);

    if (loading) {
        return <div className="full-screen-center" style={{ color: '#fff' }}>Laster resultat...</div>;
    }

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card style={{ textAlign: 'center', maxWidth: '500px', width: '100%', marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Godt jobba, {username}!</h1>
                <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Du har fullført quizen.</p>

                {saveStatus === 'saving' && <p style={{ color: '#facc15', fontSize: '0.9rem', marginBottom: '1rem' }}>Lagrer resultat...</p>}
                {saveStatus === 'success' && <p style={{ color: '#4ade80', fontSize: '0.9rem', marginBottom: '1rem' }}>Resultat lagret! ✅</p>}
                {saveStatus === 'error' && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>Kunne ikke lagre score. Sjekk internett.</p>}

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8' }}>Total Score</p>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', background: 'linear-gradient(to right, #4ade80, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {score}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={() => navigate('/categories')} style={{ flex: 1 }}>Ny Quiz</Button>
                    <Button variant="secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>Hjem</Button>
                </div>
            </Card>

            <div style={{ width: '100%', maxWidth: '600px' }}>
                <Leaderboard limitCount={100} />
            </div>
        </div>
    );
};

export default ResultScreen;
