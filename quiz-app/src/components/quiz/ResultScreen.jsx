import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ResultScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state || { score: 0, total: 10 };
    const username = localStorage.getItem('quiz_username') || 'Du';

    return (
        <div className="full-screen-center">
            <Card className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
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
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>av ca {total * (10 + 10)} mulige poeng</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={() => navigate('/categories')} style={{ flex: 1 }}>Ny Quiz</Button>
                    <Button variant="secondary" onClick={() => navigate('/')} style={{ flex: 1 }}>Bytt Bruker</Button>
                </div>
            </Card>
        </div>
    );
};

export default ResultScreen;
