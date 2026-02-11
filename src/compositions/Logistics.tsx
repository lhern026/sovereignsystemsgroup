import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { LogisticsProps } from '../types/schemas.js';
import { BerlinConfetti } from './BerlinConfetti.js';

export const LogisticsComp: React.FC<LogisticsProps> = (props) => {
    const { title, subtitle, accentColor, lastKey, triggerFrame } = props;
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const relativeFrame = frame - triggerFrame;
    const isTyping = lastKey && relativeFrame >= 0 && relativeFrame < 15;
    const typingPulse = isTyping ? spring({ frame: relativeFrame, fps: 30, config: { damping: 5 } }) : 0;

    const gridScale = interpolate(typingPulse, [0, 1], [1, 1.05]);
    const exposure = interpolate(typingPulse, [0, 1], [0.3, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#080808', color: '#EEEEE0', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(${accentColor}${isTyping ? '33' : '0D'} 1px, transparent 1px), linear-gradient(90deg, ${accentColor}${isTyping ? '33' : '0D'} 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                transform: `translateY(${frame * 0.5}px) scale(${gridScale})`,
                transition: 'all 0.1s ease-out'
            }} />

            <div style={{ position: 'absolute', top: 50, left: 50 }}>
                <div style={{ fontSize: 12, letterSpacing: 5, color: accentColor, marginBottom: 10, opacity: exposure }}>{subtitle}</div>
            </div>

            <div style={{ position: 'absolute', bottom: 50, left: 50, fontSize: 40, fontWeight: 'bold' }}>
                <span style={{ color: accentColor, textShadow: isTyping ? `0 0 20px ${accentColor}` : 'none' }}>02</span> {title}
            </div>

            <BerlinConfetti
                lastKey={lastKey}
                color={accentColor}
                triggerFrame={triggerFrame}
                x={width - 200}
                y={200}
            />

            <div style={{
                position: 'absolute',
                top: `${(frame * 0.8) % 100}%`,
                left: 0,
                width: '100%',
                height: isTyping ? 150 : 50,
                background: `linear-gradient(to bottom, transparent, ${isTyping ? accentColor : accentColor + '33'}, transparent)`,
                opacity: 0.2
            }} />
        </AbsoluteFill>
    );
};
