import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import { FintechComp } from './compositions/Fintech.js';
import { LogisticsComp } from './compositions/Logistics.js';
import { CyberDefenseComp } from './compositions/CyberDefense.js';
import { TerminalInput } from './components/TerminalInput.js';
import './styles/index.css';

export const LandingPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fintechPlayerRef = useRef<any>(null);
    const logisticsPlayerRef = useRef<any>(null);
    const cyberPlayerRef = useRef<any>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    });

    const isMobile = windowSize.width < 1024;
    const compWidth = isMobile ? 1080 : 1920;
    const compHeight = isMobile ? 1350 : 1080;
    const playerStyle = isMobile
        ? { width: '100%', aspectRatio: '4/5' }
        : { width: '100%', aspectRatio: '16/9' };

    // States with triggerFrame to reset Remotion animations
    const [fintechProps, setFintechProps] = useState({
        title: 'SECURE SETTLEMENT',
        subtitle: 'SYSTEM // FINTECH_PROTOCOL_V4',
        accentColor: '#D4AF37',
        lastKey: '',
        triggerFrame: 0,
    });

    const [logisticsProps, setLogisticsProps] = useState({
        title: 'INDUSTRIAL_SCALE',
        subtitle: 'GLOBAL_INFRASTRUCTURE_V2',
        accentColor: '#f97316',
        lastKey: '',
        triggerFrame: 0,
    });

    const [cyberProps, setCyberProps] = useState({
        title: 'CYBER_SOVEREIGNTY',
        subtitle: 'THREAT_DETECTION // ACTIVE',
        accentColor: '#00f0ff',
        lastKey: '',
        triggerFrame: 0,
    });

    const handleKeyDown = (e: React.KeyboardEvent, card: 'fintech' | 'logistics' | 'cyber') => {
        const key = e.key;

        if (card === 'fintech') {
            const frame = fintechPlayerRef.current?.getCurrentFrame() || 0;
            setFintechProps(p => ({ ...p, lastKey: key, triggerFrame: frame }));
        }
        if (card === 'logistics') {
            const frame = logisticsPlayerRef.current?.getCurrentFrame() || 0;
            setLogisticsProps(p => ({ ...p, lastKey: key, triggerFrame: frame }));
        }
        if (card === 'cyber') {
            const frame = cyberPlayerRef.current?.getCurrentFrame() || 0;
            setCyberProps(p => ({ ...p, lastKey: key, triggerFrame: frame }));
        }
    };

    useEffect(() => {
        // Smooth Scroll for Anchors
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const id = target.getAttribute('href')?.substring(1);
                if (id) {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        document.addEventListener('click', handleClick);

        // Smoke effect
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let particles: Particle[] = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            setWindowSize({ width, height });
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize); resize();

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number; alpha: number;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.1;
                this.vy = (Math.random() - 0.5) * 0.1;
                this.size = Math.random() * 150 + 50;
                this.alpha = Math.random() * 0.02;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < -this.size) this.x = width + this.size;
                if (this.x > width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = height + this.size;
                if (this.y > height + this.size) this.y = -this.size;
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(150, 150, 150, ${this.alpha})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 15; i++) particles.push(new Particle());
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="landing-container">
            <div className="grid-overlay"></div>
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -2, pointerEvents: 'none' }} />

            <nav className="nav-bar">
                <div className="logo">SSG<span className="dot">.</span></div>

                {/* Desktop Nav */}
                <ul className="nav-links">
                    <li><a href="#capabilities">Capabilities</a></li>
                    <li><a href="#showroom">Showroom</a></li>
                    <li><a href="#strategy">Strategy</a></li>
                    <li><a href="#contact">Initiate</a></li>
                </ul>

                {/* Mobile Nav Toggle */}
                <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '[ CLOSE ]' : 'MENU //'}
                </div>

                {/* Mobile Nav Overlay */}
                <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="mobile-nav-links">
                        <li><a href="#capabilities" onClick={() => setIsMenuOpen(false)}>Capabilities</a></li>
                        <li><a href="#showroom" onClick={() => setIsMenuOpen(false)}>Showroom</a></li>
                        <li><a href="#strategy" onClick={() => setIsMenuOpen(false)}>Strategy</a></li>
                        <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Initiate</a></li>
                    </ul>
                </div>
            </nav>

            <header id="hero" className="hero-section">
                <div className="hero-content">
                    <p className="hero-kicker">RENOWNED MOTION DESIGNER // B2B SPECIALIST</p>
                    <h1 className="hero-title">High-Fidelity <span className="serif-italic">Motion Systems</span> <br /> Built for Enterprise Infrastructure.</h1>
                    <div className="hero-decoration"></div>
                    <p className="hero-sub">Architecting Data-Driven Assets with Remotion & Interactive UI with Rive.</p>
                </div>
            </header>

            <section id="showroom" className="section">
                <div className="section-header">
                    <span className="section-number">02</span>
                    <h2 className="section-title">SHOWROOM</h2>
                    <p className="section-desc">INTERACT WITH THE TERMINAL. WATCH THE SOVEREIGN ENGINE REACT.</p>
                </div>
                <div className="card-grid portfolio-grid">
                    {/* Fintech */}
                    <div className="glass-card portfolio-item">
                        <div className="asset-preview">
                            <Player
                                ref={fintechPlayerRef}
                                component={FintechComp}
                                durationInFrames={150}
                                compositionWidth={compWidth}
                                compositionHeight={compHeight}
                                fps={30}
                                inputProps={{ ...fintechProps, isMobile }}
                                style={playerStyle}
                                loop autoPlay
                            />
                            <div className="asset-tag">LIVE HUD SYNC</div>
                        </div>
                        <div className="tailor-controls">
                            <TerminalInput
                                value={fintechProps.title}
                                onChange={(val) => setFintechProps({ ...fintechProps, title: val.toUpperCase() })}
                                onKeyDown={(e) => handleKeyDown(e, 'fintech')}
                                placeholder="CONTRACT_TITLE"
                                accentColor={fintechProps.accentColor}
                                label="FIN_PROT_V4"
                            />
                        </div>
                        <h3>TRUST & MONEY</h3>
                    </div>

                    {/* Logistics */}
                    <div className="glass-card portfolio-item">
                        <div className="asset-preview">
                            <Player
                                ref={logisticsPlayerRef}
                                component={LogisticsComp}
                                durationInFrames={150}
                                compositionWidth={compWidth}
                                compositionHeight={compHeight}
                                fps={30}
                                inputProps={{ ...logisticsProps, isMobile }}
                                style={playerStyle}
                                loop autoPlay
                            />
                            <div className="asset-tag">LIVE HUD SYNC</div>
                        </div>
                        <div className="tailor-controls">
                            <TerminalInput
                                value={logisticsProps.title}
                                onChange={(val) => setLogisticsProps({ ...logisticsProps, title: val.toUpperCase() })}
                                onKeyDown={(e) => handleKeyDown(e, 'logistics')}
                                placeholder="FLEET_COORD"
                                accentColor={logisticsProps.accentColor}
                                label="LOG_INFRA_V2"
                            />
                        </div>
                        <h3>INDUSTRIAL SCALE</h3>
                    </div>

                    {/* Cyber Defense */}
                    <div className="glass-card portfolio-item">
                        <div className="asset-preview">
                            <Player
                                ref={cyberPlayerRef}
                                component={CyberDefenseComp}
                                durationInFrames={150}
                                compositionWidth={compWidth}
                                compositionHeight={compHeight}
                                fps={30}
                                inputProps={{ ...cyberProps, isMobile }}
                                style={playerStyle}
                                loop autoPlay
                            />
                            <div className="asset-tag">LIVE HUD SYNC</div>
                        </div>
                        <div className="tailor-controls">
                            <TerminalInput
                                value={cyberProps.title}
                                onChange={(val) => setCyberProps({ ...cyberProps, title: val.toUpperCase() })}
                                onKeyDown={(e) => handleKeyDown(e, 'cyber')}
                                placeholder="THREAT_VECTOR"
                                accentColor={cyberProps.accentColor}
                                label="CYBER_SOV"
                            />
                        </div>
                        <h3>CYBER SOVEREIGNTY</h3>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-content">
                    <span>&copy; 2026 SOVEREIGN SYSTEMS GROUP.</span>
                </div>
            </footer>
        </div>
    );
};
