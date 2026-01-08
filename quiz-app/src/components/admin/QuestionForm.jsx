import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const QuestionForm = ({ initialData, category, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        category: category,
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(prev => ({ ...prev, category }));
        }
    }, [initialData, category]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Card>
            <h3 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Rediger spørsmål' : 'Nytt spørsmål'}</h3>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Kategori"
                    value={formData.category}
                    disabled
                    style={{ opacity: 0.7 }}
                />

                <Input
                    label="Spørsmål"
                    id="qText"
                    value={formData.questionText}
                    onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                    required
                    placeholder="Hva er hovedstaden i..."
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                    {formData.options.map((opt, idx) => (
                        <div key={idx}>
                            <Input
                                label={`Alternativ ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                required
                                style={{ borderColor: formData.correctAnswerIndex === idx ? '#4ade80' : '' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={formData.correctAnswerIndex === idx}
                                    onChange={() => setFormData({ ...formData, correctAnswerIndex: idx })}
                                    style={{ width: 'auto', margin: 0 }}
                                />
                                <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Riktig svar</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <Button type="submit">Lagre</Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>Avbryt</Button>
                </div>
            </form>
        </Card>
    );
};

export default QuestionForm;
