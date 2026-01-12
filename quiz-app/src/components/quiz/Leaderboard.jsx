import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Leaderboard = ({ limitCount = 10 }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'results'),
            orderBy('score', 'desc'),
            limit(limitCount)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setScores(data);
            setLoading(false);
        }, (error) => {
            console.error("Error watching leaderboard:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div style={{ color: '#94a3b8', textAlign: 'center' }}>Laster toppliste...</div>;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#facc15' }}>🏆 Toppliste 🏆</h3>
            {scores.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>Ingen resultater enda. Bli den første!</p>
            ) : (
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                    {scores.map((entry, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0.75rem 1.5rem',
                                background: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                                borderBottom: index < scores.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ fontWeight: 'bold', width: '20px', color: index === 0 ? '#facc15' : index === 1 ? '#e2e8f0' : index === 2 ? '#b45309' : '#94a3b8' }}>
                                    {index + 1}.
                                </span>
                                <span style={{ fontWeight: 500 }}>{entry.username}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>{entry.category}</span>
                                <span style={{ fontWeight: 'bold', color: '#4ade80' }}>{entry.score}p</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
