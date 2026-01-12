import React, { useEffect, useState, useRef } from 'react';

const TimerBar = ({ duration, onTimeout, active, startTime }) => {
    const [width, setWidth] = useState(100);
    const frameRef = useRef();

    useEffect(() => {
        if (!active || !startTime) {
            setWidth(100);
            return;
        }

        const update = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration * 1000 - elapsed);
            const percentage = (remaining / (duration * 1000)) * 100;

            setWidth(percentage);

            if (remaining <= 0) {
                onTimeout();
            } else {
                frameRef.current = requestAnimationFrame(update);
            }
        };

        frameRef.current = requestAnimationFrame(update);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [duration, onTimeout, active, startTime]);

    return (
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem' }}>
            <div
                style={{
                    width: `${width}%`,
                    height: '100%',
                    background: width < 30 ? '#ef4444' : '#6366f1',
                    borderRadius: '4px',
                    // Removing transition for smoother frame-by-frame updates without lag
                    // transition: 'width 0.05s linear' 
                }}
            />
        </div>
    );
};

export default TimerBar;
