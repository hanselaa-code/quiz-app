import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestions } from '../../services/quizService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TimerBar from './TimerBar';
import SliderInput from './SliderInput';
import TimelineInput from './TimelineInput';

const QUESTION_DURATION = 15; // Increased slightly for complex Qs
const POINTS_CORRECT = 10;

const QuizGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category || 'Alle';

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('loading'); // loading, active, answer_reveal, finished
    const [startTime, setStartTime] = useState(Date.now());
    const [gameId, setGameId] = useState(null);

    // Question State
    const [selectedOption, setSelectedOption] = useState(null); // MC
    const [sliderValue, setSliderValue] = useState(0); // Slider
    const [timelineEvents, setTimelineEvents] = useState([]); // Timeline

    const initializedRef = useRef(false);

    // Initialize Game or Restore Session
    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        const init = async () => {
            try {
                // Check for existing session
                const savedSession = localStorage.getItem('quiz_session');
                if (savedSession) {
                    const session = JSON.parse(savedSession);
                    // Basic validation: is it stale? (e.g. > 1 hour old?)
                    const isStale = (Date.now() - session.lastUpdated) > 1000 * 60 * 60;

                    if (!isStale && session.category === category) {
                        console.log("Restoring session...");
                        setGameId(session.gameId);
                        setQuestions(session.questions);
                        setCurrentIndex(session.currentIndex);
                        setScore(session.score);
                        setStartTime(session.startTime); // Key: Restore original start time

                        // Restore question-specific state to prevent re-shuffling exploits? 
                        // For now, re-initializing the UI state is acceptable as long as Question & Time are locked.
                        const currentQ = session.questions[session.currentIndex];

                        if (currentQ.type === 'slider') {
                            // Ideally restore slider value, but default is safe
                            setSliderValue(Math.floor((currentQ.min + currentQ.max) / 2));
                        } else if (currentQ.type === 'timeline') {
                            // Use saved timeline state if available, otherwise reshuffle (minor variance)
                            if (session.timelineEvents) {
                                setTimelineEvents(session.timelineEvents);
                            } else {
                                setTimelineEvents([...currentQ.events].sort(() => 0.5 - Math.random()));
                            }
                        }

                        setGameState('active');
                        return;
                    }
                }

                // Start New Game
                const newGameId = crypto.randomUUID ? crypto.randomUUID() : `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                setGameId(newGameId);

                const data = await getQuestions(category);

                if (data.length === 0) {
                    alert('Ingen spørsmål funnet for denne kategorien.');
                    navigate('/categories');
                    return;
                }

                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
                setQuestions(shuffled);

                initQuestionState(shuffled[0]);

                setGameState('active');
                setStartTime(Date.now());
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        };

        init();
    }, []);

    // Persist State logic
    useEffect(() => {
        if (gameState === 'active' && questions.length > 0) {
            const session = {
                gameId,
                category,
                questions,
                currentIndex,
                score,
                startTime,
                timelineEvents, // Save this so sorting doesn't reset on reload
                lastUpdated: Date.now()
            };
            localStorage.setItem('quiz_session', JSON.stringify(session));
        } else if (gameState === 'finished') {
            localStorage.removeItem('quiz_session');
        }
    }, [gameState, questions, currentIndex, score, startTime, gameId, category, timelineEvents]);

    const initQuestionState = (question) => {
        if (!question) return;
        if (question.type === 'slider') {
            setSliderValue(Math.floor((question.min + question.max) / 2));
        } else if (question.type === 'timeline') {
            // Shuffle events for the user to sort
            const shuffledEvents = [...question.events].sort(() => 0.5 - Math.random());
            setTimelineEvents(shuffledEvents);
        } else {
            setSelectedOption(null);
        }
    };

    // Helper: Get Duration based on type
    const getQuestionDuration = (q) => {
        if (!q) return 15;
        if (q.type === 'slider' || q.type === 'timeline') return 20;
        return 15;
    };

    // Generic Submit Handler
    const handleSubmit = (manualSubmit = false) => {
        if (gameState !== 'active') return;

        const currentQ = questions[currentIndex];
        const currentDuration = getQuestionDuration(currentQ);

        const timeTaken = (Date.now() - startTime) / 1000;
        const timeLeft = Math.max(0, currentDuration - timeTaken);

        // Calculate Correctness
        let isCorrect = false;

        if (currentQ.type === 'slider') {
            const range = currentQ.max - currentQ.min;
            const tolerance = range * 0.05; // 5% margin
            const diff = Math.abs(sliderValue - currentQ.correctAnswer);
            isCorrect = diff <= tolerance;
        } else if (currentQ.type === 'timeline') {
            // Check order
            const correctOrder = [...currentQ.events].sort((a, b) => a.year - b.year);
            const userIds = timelineEvents.map(e => e.id).join(',');
            const correctIds = correctOrder.map(e => e.id).join(',');
            isCorrect = userIds === correctIds;
        } else {
            // Multiple Choice (handled via click usually, but if timed out...)
            isCorrect = selectedOption === currentQ.correctAnswerIndex;
        }

        // Calculate Points
        let pointsEarned = 0;
        let newScore = score;

        if (isCorrect) {
            pointsEarned = POINTS_CORRECT + Math.floor(timeLeft);
            newScore = score + pointsEarned;
            setScore(newScore);
        }

        setGameState('answer_reveal');

        setTimeout(() => {
            advanceQuestion(newScore);
        }, 3000); // 3 seconds reveal for complex Qs
    };

    // Specific Handlers
    const handleMCOptionClick = (idx) => {
        setSelectedOption(idx);
        // We need to trigger submit, but we need to pass that this option IS the selected one 
        // effectively 'selectedOption' state might not update fast enough for immediate read in handleSubmit
        // So we adapt Calculate Correctness logic locally or force a synchronous flow.

        // Let's inline the logic for MC to keep it snappy
        if (gameState !== 'active') return;

        const currentQ = questions[currentIndex];
        const currentDuration = getQuestionDuration(currentQ);

        const isCorrect = idx === currentQ.correctAnswerIndex;
        const timeTaken = (Date.now() - startTime) / 1000;
        const timeLeft = Math.max(0, currentDuration - timeTaken);

        let pointsEarned = 0;
        let newScore = score;

        if (isCorrect) {
            pointsEarned = POINTS_CORRECT + Math.floor(timeLeft);
            newScore = score + pointsEarned;
            setScore(newScore);
        }

        setGameState('answer_reveal');
        setTimeout(() => advanceQuestion(newScore), 2000);
    };

    const handleTimeout = useCallback(() => {
        if (gameState !== 'active') return;
        handleSubmit(true); // Auto submit current state
    }, [gameState, score, sliderValue, timelineEvents, questions, currentIndex, startTime]); // Added startTime dep

    const advanceQuestion = (currentScore) => {
        const scoreToUse = currentScore !== undefined ? currentScore : score;
        if (currentIndex < questions.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);

            // Reset for next
            initQuestionState(questions[nextIndex]);

            setGameState('active');
            setStartTime(Date.now());
        } else {
            finishGame(scoreToUse);
        }
    };

    const finishGame = (finalScore) => {
        localStorage.removeItem('quiz_session'); // Clear session
        setGameState('finished');
        navigate('/results', { state: { score: finalScore, total: questions.length, category, gameId } });
    };

    if (gameState === 'loading' || !questions[currentIndex]) return <div className="full-screen-center" style={{ color: 'white' }}>Laster...</div>;

    const currentQ = questions[currentIndex];
    const currentDuration = getQuestionDuration(currentQ);

    // Helpers for Reveal
    const getSortedEvents = () => {
        return [...currentQ.events].sort((a, b) => a.year - b.year);
    };

    return (
        <div className="container full-screen-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#cbd5e1' }}>
                    <span>Spørsmål {currentIndex + 1} / {questions.length}</span>
                    <span>Poeng: {score}</span>
                </div>

                <Card className="animate-fade-in">
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.4' }}>
                        {currentQ.questionText}
                    </h2>

                    {/* RENDER BASED ON TYPE */}
                    {(!currentQ.type || currentQ.type === 'multiple_choice') && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {currentQ.options.map((opt, idx) => {
                                let variant = 'secondary';
                                let style = {};
                                if (gameState === 'answer_reveal') {
                                    if (idx === currentQ.correctAnswerIndex) style = { borderColor: '#4ade80', background: 'rgba(74, 222, 128, 0.2)' };
                                    else if (idx === selectedOption) style = { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.2)' };
                                }
                                return (
                                    <Button key={idx} variant={variant} style={{ textAlign: 'left', ...style }} onClick={() => handleMCOptionClick(idx)} disabled={gameState !== 'active'}>
                                        {opt}
                                    </Button>
                                );
                            })}
                        </div>
                    )}

                    {currentQ.type === 'slider' && (
                        <div className="animate-fade-in">
                            <SliderInput
                                min={currentQ.min}
                                max={currentQ.max}
                                step={currentQ.step}
                                unit={currentQ.unit}
                                value={sliderValue}
                                onChange={setSliderValue}
                                disabled={gameState !== 'active'}
                                correctValue={currentQ.correctAnswer}
                                showResult={gameState === 'answer_reveal'}
                            />
                            {gameState === 'active' && (
                                <Button onClick={() => handleSubmit()} style={{ width: '100%', marginTop: '1rem' }}>
                                    Svar
                                </Button>
                            )}
                        </div>
                    )}

                    {currentQ.type === 'timeline' && (
                        <div className="animate-fade-in">
                            <TimelineInput
                                events={timelineEvents}
                                onChange={setTimelineEvents}
                                disabled={gameState !== 'active'}
                                correctOrder={getSortedEvents()}
                                showResult={gameState === 'answer_reveal'}
                            />
                            {gameState === 'active' && (
                                <Button onClick={() => handleSubmit()} style={{ width: '100%', marginTop: '1rem' }}>
                                    Svar
                                </Button>
                            )}
                        </div>
                    )}

                    <TimerBar
                        duration={currentDuration}
                        active={gameState === 'active'}
                        startTime={startTime}
                        onTimeout={handleTimeout}
                        keyProp={currentIndex}
                    />
                </Card>
            </div>
        </div>
    );
};

export default QuizGame;
