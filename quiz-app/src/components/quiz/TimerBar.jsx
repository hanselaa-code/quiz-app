import React, { useEffect, useState } from 'react';

const TimerBar = ({ duration, onTimeout, active, keyProp }) => {
    const [width, setWidth] = useState(100);

    useEffect(() => {
        if (!active) return;

        setWidth(100);
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remainingPercentage = Math.max(0, 100 - (elapsed / (duration * 1000)) * 100);

            setWidth(remainingPercentage);

            if (elapsed >= duration * 1000) {
                clearInterval(interval);
                onTimeout();
            }
        }, 50); // Update every 50ms for smoothness

        return () => clearInterval(interval);
    }, [duration, onTimeout, active, keyProp]); // keyProp is used to force reset on new question

    return (
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem' }}>
            <div
                style={{
                    width: `${width}%`,
                    height: '100%',
                    background: width < 30 ? '#ef4444' : '#6366f1', // Red warning if low time
                    transition: 'width 0.05s linear, background 0.3s'
                }}
            />
        </div>
    );
};

export default TimerBar;
