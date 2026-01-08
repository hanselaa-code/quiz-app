import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'morten' && password === 'mupp') {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Feil brukernavn eller passord');
        }
    };

    return (
        <div className="full-screen-center">
            <Card className="animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <Input
                        id="username"
                        label="Brukernavn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Skriv inn brukernavn"
                    />
                    <Input
                        id="password"
                        label="Passord"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Skriv inn passord"
                    />
                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
                    <div style={{ marginTop: '2rem' }}>
                        <Button type="submit" style={{ width: '100%' }}>Logg inn</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
