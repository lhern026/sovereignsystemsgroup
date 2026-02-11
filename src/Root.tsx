import React from 'react';
import { Composition } from 'remotion';
import { FintechComp } from './compositions/Fintech.js';
import { LogisticsComp } from './compositions/Logistics.js';
import { CyberDefenseComp } from './compositions/CyberDefense.js';
import { FintechSchema, LogisticsSchema, CyberDefenseSchema } from './types/schemas.js';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Fintech"
                component={FintechComp}
                durationInFrames={150}
                fps={30}
                width={1920}
                height={1080}
                schema={FintechSchema}
                defaultProps={{
                    title: 'SECURE SETTLEMENT',
                    subtitle: 'SYSTEM // FINTECH_PROTOCOL_V4',
                    accentColor: '#D4AF37',
                    lastKey: '',
                    triggerFrame: 0,
                }}
            />
            <Composition
                id="Logistics"
                component={LogisticsComp}
                durationInFrames={150}
                fps={30}
                width={1920}
                height={1080}
                schema={LogisticsSchema}
                defaultProps={{
                    title: 'INDUSTRIAL_SCALE',
                    subtitle: 'GLOBAL_INFRASTRUCTURE_V2',
                    accentColor: '#f97316',
                    lastKey: '',
                    triggerFrame: 0,
                }}
            />
            <Composition
                id="CyberDefense"
                component={CyberDefenseComp}
                durationInFrames={150}
                fps={30}
                width={1920}
                height={1080}
                schema={CyberDefenseSchema}
                defaultProps={{
                    title: 'CYBER_SOVEREIGNTY',
                    subtitle: 'THREAT_DETECTION // ACTIVE',
                    accentColor: '#00f0ff',
                    lastKey: '',
                    triggerFrame: 0,
                }}
            />
        </>
    );
};
