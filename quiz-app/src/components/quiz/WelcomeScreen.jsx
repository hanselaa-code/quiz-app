import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Leaderboard from './Leaderboard';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle, createUserProfile, logoutUser } from '../../services/authService';

const WelcomeScreen = () => {
    const { currentUser, userProfile, loading, refreshProfile } = useAuth();
    const [nickname, setNickname] = useState('');
    const [guestName, setGuestName] = useState('');
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const navigate = useNavigate();

    const handleGuestStart = (e) => {
        e.preventDefault();
        if (guestName.trim()) {
            localStorage.setItem('quiz_username', guestName.trim());
            navigate('/categories');
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            alert("Kunne ikke logge inn: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            // Automatically handled by auth listener, clearing state
        } catch (error) {
            alert("Feil ved utlogging: " + error.message);
        }
    };

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        if (!nickname.trim()) return;

        setIsCreatingProfile(true);
        try {
            await createUserProfile(currentUser, nickname.trim());
            await refreshProfile(); // Refresh context to get the new profile
        } catch (error) {
            alert("Kunne ikke lage profil: " + error.message);
        } finally {
            setIsCreatingProfile(false);
        }
    };

    const handleStart = () => {
        navigate('/categories');
    };

    if (loading) {
        return <div className="container full-screen-center" style={{ color: '#fff' }}>Laster...</div>;
    }

    return (
        <div className="container full-screen-center" style={{ padding: '2rem 1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card className="animate-fade-in" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Spill med Mupp
                </h1>
                <h2 style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>Quiz Edition</h2>

                {!currentUser ? (
                    // State 1: Not Logged In
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
                        <p style={{ color: '#94a3b8' }}>Logg inn for å lagre poeng på din profil!</p>
                        <Button onClick={handleLogin} style={{ background: '#fff', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '20px' }} />
                            Logg inn med Google
                        </Button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', margin: '1rem 0' }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>ELLER</span>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        </div>

                        <form onSubmit={handleGuestStart} style={{ width: '100%' }}>
                            <Input
                                label="Spill som gjest"
                                placeholder="Ditt navn..."
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                            <div style={{ marginTop: '1rem' }}>
                                <Button type="submit" variant="secondary" style={{ width: '100%', fontSize: '1rem' }}>
                                    Start uten innlogging
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : !userProfile ? (
                    // State 2: Logged In, No Nickname
                    <form onSubmit={handleCreateProfile}>
                        <p style={{ color: '#fff', marginBottom: '1rem' }}>Hei, {currentUser.displayName}! <br /> Velg et kallenavn for topplisten:</p>
                        <Input
                            label="Kallenavn"
                            placeholder="F.eks. QuizMaster99"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                            style={{ textAlign: 'center' }}
                            disabled={isCreatingProfile}
                        />
                        <div style={{ marginTop: '2rem' }}>
                            <Button type="submit" style={{ width: '100%', fontSize: '1.1rem' }} disabled={isCreatingProfile}>
                                {isCreatingProfile ? 'Lagrer...' : 'Lagre Profil'}
                            </Button>
                        </div>
                    </form>
                ) : (
                    // State 3: Ready to Play
                    <div className="animate-scale-in">
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Logget inn som</p>
                            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>{userProfile.nickname}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                            <Button onClick={handleStart} style={{ width: '100%', fontSize: '1.3rem', padding: '1rem' }}>
                                START SPILLET 🚀
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/profile')} style={{ width: '100%' }}>
                                👤 Min Profil
                            </Button>
                            <Button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', fontSize: '0.9rem' }}>
                                Logg ut
                            </Button>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '3rem' }}>
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
