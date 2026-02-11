import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { SaasProps } from '../types/schemas.js';
import { Keyboard } from './Keyboard.js';
import { KeystrokeVFX } from './KeystrokeVFX.js';

const UIBlob: React.FC<{ mode: 'marketing' | 'infra'; color: string; typingIntensity: number }> = ({ mode, color, typingIntensity }) => {
    const frame = useCurrentFrame();
    const isInfra = mode === 'infra';

    const borderRadius = isInfra ? 4 : 50;
    const blobColor = isInfra ? '#10b981' : color;

    return (
        <div style={{
            width: 250,
            height: 250,
            backgroundColor: isInfra ? `${blobColor}1A` : blobColor,
            borderRadius: `${borderRadius}%`,
            border: isInfra ? `2px solid ${blobColor}` : 'none',
            boxShadow: `0 0 ${20 + typingIntensity * 60}px ${blobColor}${isInfra ? '4D' : '80'}`,
            transform: `scale(${1 + Math.sin(frame / 10) * 0.05 + typingIntensity * 0.2}) rotate(${typingIntensity * 10}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <div style={{ color: isInfra ? blobColor : '#fff', fontSize: 60, fontWeight: 'bold', filter: `blur(${typingIntensity * 2}px)` }}>
                {isInfra ? 'CPU' : '♥'}
            </div>
        </div>
    );
};

export const SaaSComp: React.FC<SaasProps> = (props) => {
    const { marketingTitle, infraTitle, accentColor, lastKey } = props;
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const isTyping = lastKey && frame < 15;
    const typingIntensity = isTyping ? spring({ frame, fps: 30, config: { damping: 5 } }) : 0;

    const cycle = 150;
    const phase = frame % cycle;
    const isInfra = phase > cycle / 2;

    return (
        <AbsoluteFill style={{
            backgroundColor: isInfra ? '#050505' : '#fdf2f8',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.5s ease'
        }}>
            <UIBlob mode={isInfra ? 'infra' : 'marketing'} color={accentColor} typingIntensity={typingIntensity} />

            <Keyboard
                lastKey={lastKey}
                color={isInfra ? '#10b981' : accentColor}
                style={{ position: 'absolute', bottom: 100, right: 100, transform: 'scale(1.2)' }}
            />

            <KeystrokeVFX lastKey={lastKey} color={isInfra ? '#10b981' : accentColor} x={width - 250} y={height - 250} />

            <div style={{ position: 'absolute', left: 150, top: '45%' }}>
                <h1 style={{
                    fontSize: 80,
                    color: isInfra ? '#EEEEE0' : '#1f2937',
                    fontFamily: isInfra ? 'monospace' : 'var(--font-display)',
                    letterSpacing: isInfra ? 2 : -1,
                    transform: `scale(${1 + typingIntensity * 0.05})`,
                    textShadow: isTyping ? `0 0 30px ${isInfra ? '#10b981' : accentColor}4D` : 'none'
                }}>
                    {isInfra ? infraTitle : marketingTitle}
                </h1>
            </div>
        </AbsoluteFill>
    );
};
