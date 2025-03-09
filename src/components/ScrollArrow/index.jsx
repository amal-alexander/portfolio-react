import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const ScrollArrow = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSkills = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return isVisible ? (
        <div className="scroll-down" onClick={scrollToSkills}>
            <IoIosArrowDown />
        </div>
    ) : null;
};

export default ScrollArrow;