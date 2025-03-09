import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
`;

const GithubStatsBgAnimation = () => (
    <Div>
        <svg
            className="BgAnimation__svg"
            viewBox="0 0 602 602"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Add your custom SVG paths, ellipses, and animations here */}
            <g opacity="0.15">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437ZM30.4869 115.912C-8.82897 155.228 -8.82897 218.972 30.4869 258.287L343.713 571.513C383.028 610.829 446.772 610.829 486.088 571.513L571.513 486.088C610.829 446.772 610.829 383.028 571.513 343.713L258.287 30.4869C218.972 -8.82896 155.228 -8.82896 115.912 30.4869L30.4869 115.912Z"
                    stroke="url(#paint0_radial)"
                    id="path_0"
                />
                {/* Add more paths, ellipses, and animations as needed */}
            </g>
            <defs>
                <radialGradient
                    id="paint0_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(301 301) rotate(90) scale(300)"
                >
                    <stop offset="0.333333" stopColor="#FBFBFB" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                {/* Add more gradients as needed */}
            </defs>
        </svg>
    </Div>
);

export default GithubStatsBgAnimation;