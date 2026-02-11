import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { FintechProps } from '../types/schemas.js';
import { BerlinConfetti } from './BerlinConfetti.js';

const GlitchText: React.FC<{ text: string; delay: number; color?: string; style?: React.CSSProperties; intensity?: number }> = ({ text, delay, color = '#EEEEE0', style, intensity = 1 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100, mass: 0.5 },
    });

    const glitchTranslate = interpolate(
        Math.random() * intensity,
        [0, 1],
        [-2, 2]
    );

    const opacity = interpolate(spr, [0, 0.1], [0, 1]);
    const scale = interpolate(spr, [0, 1], [0.8, 1]);

    return (
        <div style={{
            ...style,
            opacity,
            transform: `scale(${scale}) translateY(${(1 - spr) * 20}px)`,
            position: 'relative'
        }}>
            <span style={{ position: 'absolute', top: 0, left: glitchTranslate * 2, color: '#ff003c', opacity: 0.5 * intensity, zIndex: -1 }}>{text}</span>
            <span style={{ position: 'absolute', top: 0, left: -glitchTranslate * 2, color: '#00f0ff', opacity: 0.5 * intensity, zIndex: -1 }}>{text}</span>
            <span style={{ color }}>{text}</span>
        </div>
    );
};

export const FintechComp: React.FC<FintechProps> = (props) => {
    const { title, subtitle, accentColor, lastKey, triggerFrame } = props;
    const frame = useCurrentFrame();
    const { height, width } = useVideoConfig();

    const relativeFrame = frame - triggerFrame;
    const isTyping = lastKey && relativeFrame >= 0 && relativeFrame < 15;
    const typingIntensity = isTyping ? spring({ frame: relativeFrame, fps: 30, config: { damping: 5 } }) : 0;

    const scanlineY = (frame * 5 + (typingIntensity * 50)) % height;
    const chromaticShift = interpolate(typingIntensity, [0, 1], [1, 5]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
            <AbsoluteFill style={{
                background: isTyping ? `radial-gradient(circle at 50% 50%, ${accentColor}1A 0%, transparent 70%)` : 'transparent',
                transition: 'all 0.1s ease-out'
            }} />

            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div style={{ position: 'absolute', top: 50, left: 50 }}>
                <GlitchText text={subtitle} delay={5} color={accentColor} style={{ fontSize: 20, letterSpacing: 4 }} intensity={chromaticShift} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <GlitchText text={title} delay={15} style={{ fontSize: 80, fontWeight: 900, letterSpacing: -2 }} intensity={chromaticShift} />
            </div>

            <BerlinConfetti
                lastKey={lastKey}
                color={accentColor}
                triggerFrame={triggerFrame}
                x={width - 300}
                y={height - 200}
            />

            <div style={{
                position: 'absolute',
                top: scanlineY,
                left: 0,
                width: '100%',
                height: isTyping ? 10 : 2,
                background: isTyping ? accentColor : `${accentColor}33`,
                boxShadow: `0 0 ${isTyping ? 40 : 10}px ${accentColor}`,
                opacity: isTyping ? 0.8 : 0.4
            }} />
        </AbsoluteFill>
    );
};
