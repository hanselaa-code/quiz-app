import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../lib/questions_seed';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion, seedDatabase } from '../../services/quizService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';
import UserList from './UserList';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('questions'); // 'questions' or 'users'
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const [questions, setQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Authorization Check
    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    // Load data from Firestore
    useEffect(() => {
        if (activeTab === 'questions') {
            const fetchData = async () => {
                setLoading(true);
                setError('');
                try {
                    const data = await getQuestions(selectedCategory);
                    setQuestions(data);
                } catch (err) {
                    console.error(err);
                    setError('Kunne ikke laste spørsmål. Sjekk Firebase-konfigurasjonen.');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [selectedCategory, activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        navigate('/admin');
    };

    const handleEdit = (question) => {
        setCurrentQuestion(question);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Er du sikker på at du vil slette dette spørsmålet?')) {
            try {
                await deleteQuestion(id);
                setQuestions(prev => prev.filter(q => q.id !== id));
            } catch (err) {
                alert('Feil ved sletting: ' + err.message);
            }
        }
    };

    const handleSave = async (questionData) => {
        try {
            if (currentQuestion) {
                // Edit mode
                await updateQuestion(currentQuestion.id, questionData);
                setQuestions(prev => prev.map(q => q.id === currentQuestion.id ? { ...questionData, id: currentQuestion.id } : q));
            } else {
                // Add mode
                const newQ = await addQuestion(questionData);
                setQuestions(prev => [...prev, newQ]);
            }
            setIsEditing(false);
            setCurrentQuestion(null);
        } catch (err) {
            alert('Feil ved lagring: ' + err.message);
        }
    };

    const handleSeed = async () => {
        try {
            setLoading(true);
            const result = await seedDatabase(); // Additive seed

            // Refresh
            const data = await getQuestions(selectedCategory);
            setQuestions(data);

            if (result.added > 0) {
                alert(`Suksess! ${result.added} nye spørsmål ble lagt til. (${result.skipped} duplikater hoppet over).`);
            } else {
                alert('Ingen nye spørsmål å legge til. Alt er oppdatert!');
            }
        } catch (err) {
            alert('Feil under oppdatering: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Admin Dashboard</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="secondary" onClick={handleSeed} style={{ borderColor: '#6366f1', color: '#6366f1' }}>Last opp nye spørsmål</Button>
                    <Button variant="secondary" onClick={handleLogout}>Logg ut</Button>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Sidebar / Menu */}
                <Card style={{ flex: '1', minWidth: '250px', height: 'fit-content' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => { setActiveTab('questions'); setIsEditing(false); }}
                            style={{
                                textAlign: 'left',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                background: activeTab === 'questions' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                                color: '#fff',
                                border: '1px solid ' + (activeTab === 'questions' ? '#6366f1' : 'rgba(255,255,255,0.1)'),
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Spørsmålsbank
                        </button>
                        <button
                            onClick={() => { setActiveTab('users'); setIsEditing(false); }}
                            style={{
                                textAlign: 'left',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                background: activeTab === 'users' ? 'rgba(236, 72, 153, 0.4)' : 'transparent',
                                color: '#fff',
                                border: '1px solid ' + (activeTab === 'users' ? '#ec4899' : 'rgba(255,255,255,0.1)'),
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Brukere
                        </button>
                    </div>

                    {activeTab === 'questions' && (
                        <>
                            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Kategorier</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setIsEditing(false); }}
                                        style={{
                                            textAlign: 'left',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            background: selectedCategory === cat ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                            color: selectedCategory === cat ? '#fff' : '#94a3b8',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </Card>

                {/* Main Content Area */}
                <div style={{ flex: '3', minWidth: '300px' }}>
                    {error && <div style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

                    {activeTab === 'users' ? (
                        <UserList />
                    ) : (
                        // Questions View
                        isEditing ? (
                            <QuestionForm
                                initialData={currentQuestion}
                                category={selectedCategory}
                                onSave={handleSave}
                                onCancel={() => { setIsEditing(false); setCurrentQuestion(null); }}
                            />
                        ) : (
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3>{selectedCategory} Spørsmål</h3>
                                    <Button onClick={() => { setCurrentQuestion(null); setIsEditing(true); }}>+ Nytt spørsmål</Button>
                                </div>

                                {loading ? (
                                    <p style={{ textAlign: 'center', padding: '2rem' }}>Laster...</p>
                                ) : (
                                    <QuestionList questions={questions} onEdit={handleEdit} onDelete={handleDelete} />
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
