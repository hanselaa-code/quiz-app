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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Special 'All Questions' option */}
                <Card
                    className="glass-panel"
                    style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        border: '2px solid rgba(139, 92, 246, 0.5)',
                        background: 'rgba(139, 92, 246, 0.1)'
                    }}
                    onClick={() => handleSelect('Alle')}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Blandet Drops</h3>
                    <p style={{ color: '#cbd5e1' }}>Spørsmål fra alle kategorier!</p>
                </Card>

                {CATEGORIES.map(cat => (
                    <Card
                        key={cat}
                        className="glass-panel"
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'transform 0.2s'
                        }}
                        onClick={() => handleSelect(cat)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{cat}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Test dine kunnskaper i {cat}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
