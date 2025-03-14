import React, { useState } from 'react';
import { Link as LinkR } from 'react-router-dom';
import styled from "styled-components";
import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaTimes } from 'react-icons/fa';

// Navigation items
const navItems = [
    { id: 'seo-tool', label: 'SEO Tool' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'socials', label: 'Socials' },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' }
];

// Styled Components
const NavbarContainer = styled.nav`
    background: #282c34;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const NavLogo = styled(LinkR)`
    color: white;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 1.5rem;
`;

const NavItems = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        display: none;  /* Hide in mobile view */
    }
`;

const NavLink = styled(LinkR)`
    color: white;
    text-decoration: none;
    font-size: 1rem;
`;

const MobileIcon = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        cursor: pointer;
    }
`;

// 📌 FULL-SCREEN Mobile Menu
const MobileMenu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(40, 44, 52, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 100;

    a {
        font-size: 1.5rem;
        color: white;
        text-decoration: none;
    }
`;

const CloseIcon = styled(FaTimes)`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
    color: white;
`;

const Navbar = ({ darkMode, setDarkMode, onScrollClick }) => {
    const [open, setOpen] = useState(false);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const navHeight = 80; // Adjust based on your navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setOpen(false);
    };

    const handleLinkClick = (e, id) => {
        if (id === 'blog' || id === 'seo-tool') {
            setOpen(false);
            return; // Let these links navigate normally
        }
        scrollToSection(e, id);
    };

    return (
        <NavbarContainer>
            <NavLogo to="/">
                <DiCssdeck size="3rem" />
                <span style={{ marginLeft: '8px' }}>Amal Alexander</span>
            </NavLogo>

            <MobileIcon onClick={() => setOpen(!open)}>
                {open ? <FaTimes size="1.5em" color="white" /> : <FaBars size="1.5em" color="white" />}
            </MobileIcon>

            {/* Desktop Navigation */}
            <NavItems>
                {navItems.map(({ id, label }) => (
                    id === 'blog' || id === 'seo-tool' ? (
                        <NavLink key={id} to={`/${id}`}>
                            {label}
                        </NavLink>
                    ) : (
                        <NavLink 
                            key={id} 
                            href={`#${id}`}
                            onClick={(e) => scrollToSection(e, id)}
                        >
                            {label}
                        </NavLink>
                    )
                ))}
            </NavItems>

            {/* Mobile Menu */}
            {open && (
                <MobileMenu>
                    <CloseIcon onClick={() => setOpen(false)} />
                    {navItems.map(({ id, label }) => (
                        id === 'blog' || id === 'seo-tool' ? (
                            <NavLink key={id} to={`/${id}`}>
                                {label}
                            </NavLink>
                        ) : (
                            <NavLink 
                                key={id}
                                href={`#${id}`}
                                onClick={(e) => scrollToSection(e, id)}
                            >
                                {label}
                            </NavLink>
                        )
                    ))}
                </MobileMenu>
            )}
        </NavbarContainer>
    );
};

export default Navbar;
