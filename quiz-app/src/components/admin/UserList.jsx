import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/authService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Laster brukere...</p>;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3>Registrerte Brukere ({users.length})</h3>
            <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Kallenavn</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>E-post</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Registrert</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Sist Innlogget</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{user.nickname || '-'}</td>
                                <td style={{ padding: '0.5rem', color: '#94a3b8' }}>{user.email}</td>
                                <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
