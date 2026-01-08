import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Leaderboard from './Leaderboard';

const WelcomeScreen = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleStart = (e) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('quiz_username', username);
            navigate('/categories');
        }
    };

    return (
        <div className="container full-screen-center" style={{ padding: '2rem 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card className="animate-fade-in" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Spill med Mupp
                </h1>
                <h2 style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>Quiz Edition</h2>

                <form onSubmit={handleStart}>
                    <Input
                        label="Skriv navnet ditt for å starte"
                        placeholder="Ditt navn..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ textAlign: 'center' }}
                    />
                    <div style={{ marginTop: '2rem' }}>
                        <Button type="submit" style={{ width: '100%', fontSize: '1.1rem' }}>Start Spillet</Button>
                    </div>
                </form>

                <div style={{ marginTop: '2rem' }}>
                    <Leaderboard />
                </div>

                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b' }}>
                    <a href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin Login</a>
                </div>
            </Card>
        </div>
    );
};

export default WelcomeScreen;
