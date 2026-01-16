import React from 'react';
import Button from '../ui/Button';

const QuestionList = ({ questions, onEdit, onDelete }) => {
    if (questions.length === 0) {
        return <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Ingen spørsmål i denne kategorien enda.</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions.map((q, index) => (
                <div
                    key={index}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '1rem',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{q.questionText}</p>
                        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
                            {(!q.type || q.type === 'multiple_choice') && (
                                <>Correct: <span style={{ color: '#4ade80' }}>{q.options?.[q.correctAnswerIndex]}</span></>
                            )}
                            {q.type === 'slider' && (
                                <>Svar: <span style={{ color: '#4ade80' }}>{q.correctAnswer}</span> ({q.min}-{q.max})</>
                            )}
                            {q.type === 'timeline' && (
                                <>Tidslinje: <span style={{ color: '#4ade80' }}>{q.events?.length || 0} hendelser</span></>
                            )}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            variant="secondary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            onClick={() => onEdit(q)}
                        >
                            Endre
                        </Button>
                        <Button
                            variant="secondary"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderColor: '#ef4444', color: '#ef4444' }}
                            onClick={() => onDelete(q.questionText)}
                        >
                            Slett
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
