import React from 'react';

const Input = ({ label, id, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`} style={{ marginBottom: '1rem' }}>
            {label && (
                <label htmlFor={id} style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: 500 }}>
                    {label}
                </label>
            )}
            <input id={id} {...props} style={{ width: '100%' }} />
        </div>
    );
};

export default Input;
