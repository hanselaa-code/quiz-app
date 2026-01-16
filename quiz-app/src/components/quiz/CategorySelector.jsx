import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../lib/questions_seed';
import Card from '../ui/Card';
import Button from '../ui/Button';

const CategorySelector = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('quiz_username') || 'Gjest';

    const handleSelect = (category) => {
        // Navigate to quiz with state
        navigate('/quiz', { state: { category } });
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Velkommen, {username}!</h2>
                <p style={{ color: '#cbd5e1' }}>Velg en kategori for å starte quizen</p>
            </header>

            {/* Featured Categories (Main Game) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                maxWidth: '800px',
                margin: '0 auto 3rem auto'
            }}>
                <Card
                    className="glass-panel"
                    style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        border: '2px solid rgba(139, 92, 246, 0.8)',
                        background: 'rgba(139, 92, 246, 0.2)',
                        padding: '2rem'
                    }}
                    onClick={() => handleSelect('Alle')}
                >
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>🏆 Mesternes Arena</h3>
                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Hovedquizen! Vis at du er best.</p>
                </Card>

                {CATEGORIES.includes('Beta') && (
                    <Card
                        className="glass-panel"
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            border: '2px solid rgba(236, 72, 153, 0.8)',
                            background: 'rgba(236, 72, 153, 0.2)',
                            padding: '2rem'
                        }}
                        onClick={() => handleSelect('Beta')}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>🧪 Beta</h3>
                        <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Nye funksjoner & spørsmålstyper!</p>
                    </Card>
                )}
            </div>

            {/* Secondary Categories */}
            <h3 style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
                Eller prøv deg på spesifikke temaer
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Smaller boxes
                gap: '1rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {CATEGORIES.filter(c => c !== 'Beta').map(cat => (
                    <Card
                        key={cat}
                        className="glass-panel"
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'transform 0.2s',
                            padding: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        onClick={() => handleSelect(cat)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: '#fff' }}>{cat}</h4>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
