import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveResult } from '../../services/quizService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Leaderboard from './Leaderboard';

const ResultScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, category } = location.state || { score: 0, total: 10, category: 'Ukjent' };
    const username = localStorage.getItem('quiz_username') || 'Du';
    const hasSavedRef = useRef(false);
    const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);

    useEffect(() => {
        if (!hasSavedRef.current && location.state) {
            hasSavedRef.current = true;
            const save = async () => {
                try {
                    await saveResult({
                        username,
                        score,
                        category,
                        totalQuestions: total
                    });
                    // Trigger leaderboard refresh after successful save
                    setRefreshLeaderboard(prev => prev + 1);
                } catch (error) {
                    console.error("Failed to save result", error);
                    alert("Kunne ikke lagre resultatet. Sjekk internettforbindelsen eller brannmur.");
                }
            };
            save();
        }
    }, [username, score, category, total, location.state]);

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card style={{ textAlign: 'center', maxWidth: '500px', width: '100%', marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Godt jobba, {username}!</h1>
                <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>Du har fullført quizen.</p>

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
                    <Button variant="secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>Bytt Bruker</Button>
                </div>
            </Card>

            <div style={{ width: '100%', maxWidth: '600px' }}>
                <Leaderboard refreshTrigger={refreshLeaderboard} />
            </div>
        </div>
    );
};

export default ResultScreen;
