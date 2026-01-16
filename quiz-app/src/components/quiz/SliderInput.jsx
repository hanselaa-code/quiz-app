import React from 'react';

const SliderInput = ({ min, max, step, unit, value, onChange, disabled, correctValue, showResult, tolerance }) => {
    // Calculate percentage for background gradient
    const percentage = ((value - min) / (max - min)) * 100;
    const diff = Math.abs(value - correctValue);
    const isWithinTolerance = tolerance ? diff <= tolerance : false;

    return (
        <div style={{ width: '100%', padding: '1rem 0' }}>
            {/* Value Display */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
                {value.toLocaleString()} <span style={{ fontSize: '1rem', color: '#94a3b8' }}>{unit}</span>
            </div>

            {/* Slider Control */}
            <div style={{ position: 'relative', height: '40px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    disabled={disabled}
                    style={{
                        width: '100%',
                        height: '12px',
                        background: `linear-gradient(to right, #6366f1 0%, #a855f7 ${percentage}%, #334155 ${percentage}%, #334155 100%)`,
                        borderRadius: '6px',
                        outline: 'none',
                        transition: 'background 0.1s',
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        cursor: disabled ? 'default' : 'pointer'
                    }}
                />

                {/* Thumb styling needs creating separate CSS or global styles usually, 
                    but we can rely on standard browser thumbs or inject style. 
                    For now, standard thumb is acceptable or we add a style tag. 
                */}
                <style>{`
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: #fff;
                        box-shadow: 0 0 10px rgba(0,0,0,0.5);
                        cursor: pointer;
                        margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it's automatic */
                    }
                    input[type=range]::-moz-range-thumb {
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: #fff;
                        cursor: pointer;
                        border: none;
                    }
                `}</style>

                {/* Optional: Markers for Min/Max */}
                <div style={{ position: 'absolute', bottom: '-25px', left: 0, fontSize: '0.8rem', color: '#64748b' }}>{min}</div>
                <div style={{ position: 'absolute', bottom: '-25px', right: 0, fontSize: '0.8rem', color: '#64748b' }}>{max}</div>
            </div>

            {/* Result Reveal */}
            {showResult && (
                <div className="animate-fade-in" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* Explicit Result Banner */}
                    <div style={{
                        textAlign: 'center',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: isWithinTolerance ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        border: `1px solid ${isWithinTolerance ? '#4ade80' : '#ef4444'}`,
                        marginBottom: '1rem',
                        fontWeight: 'bold',
                        color: isWithinTolerance ? '#4ade80' : '#ef4444',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {isWithinTolerance ? 'Riktig! (Innenfor 5%)' : 'Feil! (Utenfor feilmargin)'}
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Riktig Svar:</div>
                    <div style={{ fontSize: '1.5rem', color: '#4ade80', fontWeight: 'bold' }}>
                        {correctValue.toLocaleString()} {unit}
                    </div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>
                        Din feilmargin: <span style={{ color: isWithinTolerance ? '#4ade80' : '#ef4444' }}>
                            {diff.toLocaleString()} ({Math.round((diff / (max - min)) * 100)}%)
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderInput;
