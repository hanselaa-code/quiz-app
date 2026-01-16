import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

import { signInWithGoogle } from '../../services/authService';

const AdminLogin = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await signInWithGoogle();
            navigate('/admin/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            setError('Feil ved Google-innlogging.');
        }
    };

    return (
        <div className="full-screen-center">
            <Card className="animate-fade-in" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '2rem' }}>Admin Login</h2>
                <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
                    Logg inn med din Google-konto.<br />
                    (Du må være whitelisted)
                </p>

                <Button onClick={handleGoogleLogin} style={{ background: '#fff', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '20px' }} />
                    Logg inn med Google
                </Button>

                {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '1rem' }}>{error}</p>}

                <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
                    <a href="/" style={{ color: '#94a3b8' }}>Tilbake til forsiden</a>
                </div>
            </Card>
        </div>
    );
};

export default AdminLogin;
