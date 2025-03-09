// src/components/ParticleBackground.jsx

import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import styled from 'styled-components';

const ParticlesContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
`;

const ParticleBackground = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <ParticlesContainer>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#854CE6"
                        },
                        opacity: {
                            value: 0.5,
                            random: false
                        },
                        size: {
                            value: 3,
                            random: true
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: false,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#854CE6",
                            opacity: 0.4,
                            width: 1
                        },
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "grab"
                            },
                            resize: true
                        }
                    },
                    retina_detect: true,
                    background: {
                        color: "transparent"
                    }
                }}
            />
        </ParticlesContainer>
    );
};

export default ParticleBackground;