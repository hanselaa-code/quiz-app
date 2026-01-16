import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { getWeeklyScores } from '../../services/quizService';

const LeaderboardList = ({ title, scores, icon, emptyText }) => (
    <div style={{ flex: '1', minWidth: '300px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#facc15', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {icon} {title} {icon}
        </h3>
        {scores.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                {emptyText}
            </div>
        ) : (
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                {scores.map((entry, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1.0rem',
                            background: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                            borderBottom: index < scores.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{
                                fontWeight: 'bold',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                background: index === 0 ? '#facc15' : index === 1 ? '#94a3b8' : index === 2 ? '#b45309' : 'rgba(255,255,255,0.1)',
                                color: index < 3 ? '#000' : '#94a3b8',
                                fontSize: '0.8rem'
                            }}>
                                {index + 1}
                            </span>
                            <span style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                                {entry.username}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', color: '#4ade80' }}>{entry.score}p</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const Leaderboard = ({ limitCount = 10 }) => {
    const [allTimeScores, setAllTimeScores] = useState([]);
    const [weeklyScores, setWeeklyScores] = useState([]);
    const [loading, setLoading] = useState(true);

    // All Time (Realtime)
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
            setAllTimeScores(data);
            setLoading(false);
        });

        // Weekly (One-off fetch for now to avoid complex index setup)
        getWeeklyScores(limitCount).then(data => {
            setWeeklyScores(data);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Laster topplister...</div>;

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                <LeaderboardList
                    title="Ukens Beste"
                    icon="🔥"
                    scores={weeklyScores}
                    emptyText="Ingen har spilt denne uken. Bli den første!"
                />
                <LeaderboardList
                    title="Legender (All Time)"
                    icon="👑"
                    scores={allTimeScores}
                    emptyText="Ingen resultater enda."
                />
            </div>
        </div>
    );
};

export default Leaderboard;
