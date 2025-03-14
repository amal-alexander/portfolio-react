// src/components/ParticleBackground.jsx
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // ✅ Use slim build

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine); // ✅ Replace loadFull with loadSlim
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: 'push' },
                        onHover: { enable: true, mode: 'repulse' },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 4 },
                        repulse: { distance: 200, duration: 2 },
                    },
                },
                particles: {
                    number: { value: 100, density: { enable: true, area: 800 } },
                    color: { value: '#ffffff' },
                    shape: {
                        type: 'circle',
                        stroke: { width: 0, color: '#000000' },
                        polygon: { nb_sides: 5 },
                    },
                    opacity: { value: 0.5 },
                    size: { value: 5, random: true },
                    links: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticleBackground;
