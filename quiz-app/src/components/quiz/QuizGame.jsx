import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestions } from '../../services/quizService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TimerBar from './TimerBar';

const QUESTION_DURATION = 10; // seconds
const POINTS_CORRECT = 10;

const QuizGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category || 'Alle';

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('loading'); // loading, active, answer_reveal, finished
    const [selectedOption, setSelectedOption] = useState(null);
    const [startTime, setStartTime] = useState(Date.now());

    // Initialize Game
    useEffect(() => {
        const init = async () => {
            try {
                // 1. Fetch questions from DB
                const data = await getQuestions(category);

                if (data.length === 0) {
                    alert('Ingen spørsmål funnet for denne kategorien. Kontakt admin for å laste opp spørsmål.');
                    navigate('/categories');
                    return;
                }

                // 2. Shuffle and take 10
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);

                setQuestions(shuffled);
                setGameState('active');
                setStartTime(Date.now());
            } catch (err) {
                console.error(err);
                alert('Feil ved lasting av spørsmål: ' + err.message);
                navigate('/');
            }
        };

        init();
    }, [category, navigate]);

    const handleAnswer = (optionIndex) => {
        if (gameState !== 'active') return;

        const currentQ = questions[currentIndex];
        const isCorrect = optionIndex === currentQ.correctAnswerIndex;
        const timeTaken = (Date.now() - startTime) / 1000;
        const timeLeft = Math.max(0, QUESTION_DURATION - timeTaken);

        let pointsEarned = 0;
        let newScore = score; // Start with current state

        if (isCorrect) {
            pointsEarned = POINTS_CORRECT + Math.floor(timeLeft); // 1 point per remaining second
            newScore = score + pointsEarned; // Calculate future state
            setScore(newScore);
        }

        setSelectedOption(optionIndex);
        setGameState('answer_reveal');

        // Wait 2 seconds then next question
        setTimeout(() => {
            advanceQuestion(newScore);
        }, 2000);
    };

    const handleTimeout = useCallback(() => {
        if (gameState !== 'active') return;

        // Treat as wrong answer
        setSelectedOption(-1);
        setGameState('answer_reveal');

        setTimeout(() => {
            // Pass current score as no points were added
            advanceQuestion(score);
        }, 2000);
    }, [gameState, currentIndex, score]); // Added score to dependencies

    const advanceQuestion = (currentScore) => {
        // Use the passed score if available, otherwise fallback to state score
        const scoreToUse = currentScore !== undefined ? currentScore : score;

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setGameState('active');
            setStartTime(Date.now());
        } else {
            finishGame(scoreToUse);
        }
    };

    const finishGame = (finalScore) => {
        setGameState('finished');
        navigate('/results', { state: { score: finalScore, total: questions.length } });
    };

    if (gameState === 'loading') return <div className="full-screen-center">Laster spørsmål...</div>;
    if (questions.length === 0) return <div className="full-screen-center">Ingen spørsmål...</div>;

    const currentQ = questions[currentIndex];

    return (
        <div className="container full-screen-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#cbd5e1' }}>
                    <span>Spørsmål {currentIndex + 1} / {questions.length}</span>
                    <span>Poeng: {score}</span>
                </div>

                <Card className="animate-fade-in">
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', textAlign: 'center' }}>
                        {currentQ.questionText}
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQ.options.map((opt, idx) => {
                            // Determine styling based on state
                            let variant = 'secondary';
                            let style = {};

                            if (gameState === 'answer_reveal') {
                                if (idx === currentQ.correctAnswerIndex) {
                                    style = { borderColor: '#4ade80', background: 'rgba(74, 222, 128, 0.2)' }; // Correct (Green)
                                } else if (idx === selectedOption) {
                                    style = { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.2)' }; // Wrong choice (Red)
                                }
                            }

                            return (
                                <Button
                                    key={idx}
                                    variant={variant}
                                    style={{ width: '100%', textAlign: 'left', ...style }}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={gameState !== 'active'}
                                >
                                    {opt}
                                </Button>
                            );
                        })}
                    </div>

                    <TimerBar
                        duration={QUESTION_DURATION}
                        active={gameState === 'active'}
                        onTimeout={handleTimeout}
                        keyProp={currentIndex} // Resets timer on new question
                    />
                </Card>
            </div>
        </div>
    );
};

export default QuizGame;
