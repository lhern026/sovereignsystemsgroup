import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { CyberDefenseProps } from '../types/schemas.js';
import { BerlinConfetti } from './BerlinConfetti.js';

const RadarSweep: React.FC<{ color: string }> = ({ color }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const rotation = (frame * 2) % 360;

    return (
        <div style={{
            position: 'absolute',
            left: width / 2 - 400,
            top: height / 2 - 400,
            width: 800,
            height: 800,
            borderRadius: '50%',
            border: `1px solid ${color}33`,
            background: `conic-gradient(from ${rotation}deg, ${color}66 0%, transparent 20%)`,
            opacity: 0.3
        }} />
    );
};

const DefenseNode: React.FC<{ x: number; y: number; color: string; delay: number }> = ({ x, y, color, delay }) => {
    const frame = useCurrentFrame();
    const spr = spring({ frame: frame - delay, fps: 30, config: { damping: 10 } });

    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: 10,
            height: 10,
            backgroundColor: spr > 0.5 ? color : 'transparent',
            border: `1px solid ${color}`,
            transform: `scale(${spr})`,
            boxShadow: spr > 0.5 ? `0 0 10px ${color}` : 'none'
        }} />
    );
};

export const CyberDefenseComp: React.FC<CyberDefenseProps> = (props) => {
    const { title, subtitle, accentColor, lastKey, triggerFrame } = props;
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const isTyping = lastKey && (frame - triggerFrame) < 15;

    const nodes = useMemo(() => [...Array(20)].map((_, i) => ({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        delay: i * 5
    })), []);

    return (
        <AbsoluteFill style={{ backgroundColor: '#020202', color: '#EEEEE0', overflow: 'hidden' }}>
            <RadarSweep color={accentColor} />

            {nodes.map((n, i) => (
                <DefenseNode key={i} x={n.x} y={n.y} color={accentColor} delay={n.delay} />
            ))}

            <div style={{ position: 'absolute', top: 50, left: 50 }}>
                <div style={{ fontSize: 12, letterSpacing: 8, color: accentColor, marginBottom: 10 }}>{subtitle}</div>
                <div style={{ fontSize: 40, fontWeight: 900, textShadow: isTyping ? `0 0 20px ${accentColor}` : 'none' }}>{title}</div>
            </div>

            <BerlinConfetti
                lastKey={lastKey}
                color={accentColor}
                triggerFrame={triggerFrame}
                x={width / 2}
                y={height / 2}
            />

            {/* Threat Alert (Reactive) */}
            {isTyping && (
                <div style={{
                    position: 'absolute',
                    top: 50,
                    right: 50,
                    padding: '10px 20px',
                    border: `1px solid ${accentColor}`,
                    backgroundColor: `${accentColor}1A`,
                    color: accentColor,
                    fontSize: 14,
                    fontWeight: 'bold',
                    animation: 'SSG_Pulse 0.5s infinite'
                }}>
                    SIGNAL_DETECTED // SSG_OVERRIDE
                </div>
            )}

            <style>{`
          @keyframes SSG_Pulse {
              0% { opacity: 0.5; }
              50% { opacity: 1; }
              100% { opacity: 0.5; }
          }
      `}</style>
        </AbsoluteFill>
    );
};
