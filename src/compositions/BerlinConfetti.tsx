import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const BERLIN_GLYPHS = ['A', 'X', 'Z', '0', '1', '■', '□', '—', '+', '×'];

const ConfettiPiece: React.FC<{
    color: string;
    delay: number;
    relativeFrame: number;
    id: number;
    startX: number;
    startY: number;
    isMobile?: boolean;
}> = ({ color, delay, relativeFrame, id, startX, startY, isMobile }) => {
    const { fps } = useVideoConfig();

    const anim = spring({
        frame: relativeFrame - delay,
        fps,
        config: { damping: 12, stiffness: 150, mass: 0.1 },
    });

    const opacity = interpolate(anim, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);
    const scale = interpolate(anim, [0, 0.15, 1], [0, isMobile ? 3 : 4, isMobile ? 2 : 2.5]);

    const angle = (id * (isMobile ? 120 : 137.5)) % 360;
    const velocity = (id % 5 + (isMobile ? 8 : 12)) * (isMobile ? 60 : 80);
    const tx = interpolate(anim, [0, 1], [0, Math.cos(angle * Math.PI / 180) * velocity]);
    const ty = interpolate(anim, [0, 1], [0, Math.sin(angle * Math.PI / 180) * velocity]);
    const rotate = interpolate(anim, [0, 1], [0, (id % 2 === 0 ? 360 : -360)]);

    const glyph = BERLIN_GLYPHS[id % BERLIN_GLYPHS.length];

    return (
        <div style={{
            position: 'absolute',
            left: startX,
            top: startY,
            opacity,
            transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`,
            color: id % 3 === 0 ? '#fff' : color,
            fontSize: isMobile ? 28 : 40,
            fontFamily: 'monospace',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: `0 0 30px ${color}, 0 0 10px #fff`,
            zIndex: 1000
        }}>
            {glyph}
        </div>
    );
};

export const BerlinConfetti: React.FC<{
    lastKey?: string;
    color: string;
    triggerFrame: number;
    x?: number;
    y?: number;
    isMobile?: boolean;
}> = ({ lastKey, color, triggerFrame, x, y, isMobile }) => {
    const frame = useCurrentFrame();
    const { width, height, durationInFrames } = useVideoConfig();

    const relativeFrame = (frame - triggerFrame + durationInFrames) % durationInFrames;

    // Center higher for vertical layouts
    const startX = x ?? width / 2;
    const startY = y ?? (isMobile ? height * 0.4 : height / 2);

    const count = isMobile ? 20 : 40;

    if (!lastKey || relativeFrame < 0 || relativeFrame > 20) return null;

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 9999 }}>
            {[...Array(count)].map((_, i) => (
                <ConfettiPiece
                    key={`${i}-${triggerFrame}`}
                    id={i}
                    startX={startX}
                    startY={startY}
                    delay={0}
                    color={color}
                    isMobile={isMobile}
                    relativeFrame={relativeFrame}
                />
            ))}
        </AbsoluteFill>
    );
};
