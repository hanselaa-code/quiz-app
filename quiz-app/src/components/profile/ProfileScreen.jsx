import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProfileScreen = () => {
    const { currentUser, userProfile, loading } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading && !currentUser) {
            navigate('/');
            return;
        }

        const fetchHistory = async () => {
            if (!currentUser?.uid) return;

            try {
                const q = query(
                    collection(db, 'results'),
                    where('uid', '==', currentUser.uid),
                    orderBy('createdAt', 'desc')
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHistory(data);
            } catch (error) {
                console.error("Error fetching profile history:", error);
                console.error("Error fetching profile history:", error);
                // Show actual error to help debugging
                setError(`Feil: ${error.message} (Kode: ${error.code})`);
            } finally {
                setFetching(false);
            }
        };

        if (currentUser) {
            fetchHistory();
        }
    }, [currentUser, loading, navigate]);

    if (loading || fetching) return <div className="full-screen-center" style={{ color: 'white' }}>Laster profil...</div>;

    if (error) {
        // Try to identify the URL more aggressively
        const urlMatch = error.match(/(https:\/\/console\.firebase\.google\.com[^\s)]+)/);
        const indexUrl = urlMatch ? urlMatch[0] : null;
        const isIndexError = error.includes('failed-precondition') || error.includes('requires an index');

        return (
            <div className="full-screen-center" style={{ flexDirection: 'column', gap: '1rem', color: '#ef4444', textAlign: 'center', padding: '1rem' }}>
                <h3 style={{ color: '#fff' }}>Noe gikk galt</h3>
                <p style={{ maxWidth: '600px', overflowWrap: 'break-word', fontSize: '0.9rem', opacity: 0.8 }}>
                    {error}
                </p>

                {indexUrl && (
                    <Button
                        onClick={() => window.open(indexUrl, '_blank')}
                        style={{ background: '#f59e0b', color: '#000', fontWeight: 'bold', padding: '1rem 2rem', fontSize: '1.1rem' }}
                    >
                        🔧 TRYKK HER FOR Å FIKSE (1-Klikk)
                    </Button>
                )}

                {/* Fallback if button fails or no URL detected but it is an index error */}
                {isIndexError && (
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #f59e0b', maxWidth: '100%', width: '600px' }}>
                        <p style={{ color: '#f59e0b', marginBottom: '0.5rem', fontWeight: 'bold' }}>Databasen mangler et "Index".</p>
                        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hvis knappen over ikke virker, kopier denne lenken og åpne i nettleseren:</p>

                        <textarea
                            readOnly
                            value={indexUrl || "https://console.firebase.google.com/project/quiz-app-f941d/firestore/indexes"}
                            style={{
                                width: '100%',
                                height: '80px',
                                background: '#1e293b',
                                color: '#94a3b8',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '0.5rem',
                                fontSize: '0.8rem',
                                fontFamily: 'monospace'
                            }}
                            onClick={(e) => e.target.select()}
                        />
                    </div>
                )}

                <Button variant="secondary" onClick={() => navigate('/')}>Tilbake</Button>
            </div>
        );
    }

    // Calculate Stats
    const totalGames = history.length;
    const totalScore = history.reduce((sum, item) => sum + (item.score || 0), 0);
    const avgScore = totalGames > 0 ? Math.round(totalScore / totalGames) : 0;

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                <Button variant="secondary" onClick={() => navigate('/')} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    ← Tilbake
                </Button>
            </div>

            <Card style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '0.5rem', color: '#facc15' }}>{userProfile?.nickname || currentUser?.displayName}</h1>
                <p style={{ color: '#cbd5e1' }}>Din Quiz-profil</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>{totalGames}</div>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Spill Spilt</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{avgScore}p</div>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Snittscore</div>
                    </div>
                </div>
            </Card>

            <div style={{ width: '100%', maxWidth: '600px' }}>
                <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Historikk</h3>
                {history.length === 0 ? (
                    <p style={{ color: '#64748b', textAlign: 'center' }}>Ingen spill enda. Start quizen!</p>
                ) : (
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                        {history.map((game, index) => (
                            <div key={game.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                borderBottom: index < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{game.category}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        {game.createdAt ? new Date(game.createdAt).toLocaleDateString() : 'Ukjent dato'}
                                    </div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#facc15', fontSize: '1.2rem' }}>
                                    {game.score}p
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default ProfileScreen;
