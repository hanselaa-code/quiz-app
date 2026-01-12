import React, { useRef } from 'react';
import Button from '../ui/Button';

const TimelineInput = ({ events, onChange, disabled, correctOrder, showResult }) => {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const handleSort = () => {
        // Strict Swap Logic: Item A swaps with Item B
        let _events = [...events];
        const fromIndex = dragItem.current;
        const toIndex = dragOverItem.current;

        // Perform swap
        const temp = _events[fromIndex];
        _events[fromIndex] = _events[toIndex];
        _events[toIndex] = temp;

        // Reset refs
        dragItem.current = null;
        dragOverItem.current = null;

        // Update state
        onChange(_events);
    };

    const handleDragStart = (e, position) => {
        if (disabled) return;
        dragItem.current = position;
        e.dataTransfer.effectAllowed = "move";
        // Ghost image handling can simply be the element itself
    };

    const handleDragEnter = (e, position) => {
        if (disabled) return;
        dragOverItem.current = position;
    };

    const handleDragEnd = () => {
        if (disabled) return;
        if (dragItem.current !== null && dragOverItem.current !== null) {
            handleSort();
        }
    };

    // Explicit Move Logic for Buttons (keeping as backup for accessibility/mobile)
    const moveItem = (index, direction) => {
        if (disabled) return;
        const newEvents = [...events];
        const [removed] = newEvents.splice(index, 1);
        newEvents.splice(index + direction, 0, removed);
        onChange(newEvents);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            {events.map((event, index) => {
                // Check if this specific item is in the correct absolute position (only relevant for reveal)
                const isCorrectPos = showResult && correctOrder[index].id === event.id;

                return (
                    <div
                        key={event.id}
                        draggable={!disabled && !showResult}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()} // Essential to allow dropping
                        className="glass-panel"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.8rem',
                            gap: '1rem',
                            background: showResult
                                ? (isCorrectPos ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                                : 'rgba(255,255,255,0.1)',
                            borderColor: showResult
                                ? (isCorrectPos ? '#4ade80' : '#ef4444')
                                : 'transparent',
                            cursor: disabled ? 'default' : 'grab',
                            transition: 'all 0.2s ease',
                            border: '1px solid transparent', // reserve space for border
                            // Visual feedback handled by CSS usually, but simple approach here
                        }}
                    >
                        {/* Drag Handle Icon (Optional visual cue) */}
                        {!showResult && (
                            <div style={{ color: '#64748b', cursor: 'grab', fontSize: '1.2rem' }}>
                                ≡
                            </div>
                        )}

                        {/* Order Number */}
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#e2e8f0',
                            flexShrink: 0
                        }}>
                            {index + 1}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.95rem', color: '#fff' }}>{event.text}</div>
                            {showResult && (
                                <div style={{ fontSize: '0.8rem', color: isCorrectPos ? '#4ade80' : '#f87171' }}>
                                    {event.year} ({correctOrder.find(e => e.id === event.id).year})
                                </div>
                            )}
                        </div>

                        {/* Controls (Backup) */}
                        {!disabled && !showResult && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.5 }}>
                                <button
                                    onClick={() => index > 0 && moveItem(index, -1)}
                                    disabled={index === 0}
                                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '2px' }}
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={() => index < events.length - 1 && moveItem(index, 1)}
                                    disabled={index === events.length - 1}
                                    style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '2px' }}
                                >
                                    ▼
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}

            {showResult && (
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <p>Sortert etter {correctOrder[0].year} → {correctOrder[correctOrder.length - 1].year}</p>
                </div>
            )}
        </div>
    );
};

export default TimelineInput;
