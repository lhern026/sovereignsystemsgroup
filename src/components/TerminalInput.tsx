import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
    value: string;
    onChange: (val: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    placeholder?: string;
    accentColor?: string;
    label?: string;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ value, onChange, onKeyDown, placeholder, accentColor = '#D4AF37', label }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => inputRef.current?.focus();

    return (
        <div
            onClick={handleClick}
            style={{
                background: 'rgba(0,0,0,0.6)',
                border: `1px solid ${isFocused ? accentColor : 'rgba(255,255,255,0.1)'}`,
                padding: '12px 15px',
                borderRadius: 4,
                fontFamily: 'monospace',
                fontSize: 14,
                color: accentColor,
                cursor: 'text',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.2s ease',
                boxShadow: isFocused ? `0 0 15px ${accentColor}33` : 'none',
                width: '100%',
                maxWidth: 400
            }}
        >
            <span style={{ opacity: 0.6, userSelect: 'none' }}>SSG_INIT {'>'}</span>
            <div style={{ position: 'relative', flex: 1 }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#fff',
                        width: '100%',
                        caretColor: 'transparent', // Custom cursor
                        textTransform: 'uppercase'
                    }}
                />
                {!value && !isFocused && (
                    <span style={{ position: 'absolute', left: 0, opacity: 0.3, pointerEvents: 'none' }}>{placeholder}</span>
                )}
                <div style={{
                    position: 'absolute',
                    left: `${value.length}ch`,
                    top: 0,
                    width: 8,
                    height: '100%',
                    backgroundColor: isFocused ? accentColor : 'transparent',
                    opacity: isFocused ? 0.8 : 0,
                    animation: isFocused ? 'SSG_Blink 1s infinite' : 'none'
                }} />
            </div>
            {label && <span style={{ fontSize: 10, opacity: 0.4 }}>[{label}]</span>}

            <style>{`
                @keyframes SSG_Blink {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
