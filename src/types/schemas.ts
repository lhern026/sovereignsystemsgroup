import { z } from 'zod';

export const FintechSchema = z.object({
    title: z.string().default('SECURE SETTLEMENT'),
    subtitle: z.string().default('SYSTEM // FINTECH_PROTOCOL_V4'),
    accentColor: z.string().default('#D4AF37'),
    lastKey: z.string().optional(),
    triggerFrame: z.number().default(0),
    isMobile: z.boolean().optional(),
});

export const LogisticsSchema = z.object({
    title: z.string().default('INDUSTRIAL_SCALE'),
    subtitle: z.string().default('GLOBAL_INFRASTRUCTURE_V2'),
    accentColor: z.string().default('#f97316'),
    lastKey: z.string().optional(),
    triggerFrame: z.number().default(0),
});

export const CyberDefenseSchema = z.object({
    title: z.string().default('CYBER_SOVEREIGNTY'),
    subtitle: z.string().default('THREAT_DETECTION // ACTIVE'),
    accentColor: z.string().default('#00f0ff'),
    lastKey: z.string().optional(),
    triggerFrame: z.number().default(0),
});

export const SaasSchema = z.object({
    marketingTitle: z.string().default('Beautiful Experience'),
    infraTitle: z.string().default('> CLUSTER_DEPLOYMENT'),
    accentColor: z.string().default('#f472b6'),
    lastKey: z.string().optional(),
    triggerFrame: z.number().default(0),
});

export type FintechProps = z.infer<typeof FintechSchema>;
export type LogisticsProps = z.infer<typeof LogisticsSchema>;
export type CyberDefenseProps = z.infer<typeof CyberDefenseSchema>;
export type SaasProps = z.infer<typeof SaasSchema>;
