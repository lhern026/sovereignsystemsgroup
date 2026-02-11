import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { LandingPage } from './LandingPage.js';

// For the web app part
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<LandingPage />);
}

// For Remotion Studio
registerRoot(RemotionRoot);
