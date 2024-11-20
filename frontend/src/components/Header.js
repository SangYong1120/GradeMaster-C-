/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logoImg from '../assets/img/logo-white.png';
import userImg from '../assets/img/user.png';
import { getToken } from '../helper/helper';

const Header = () => {
    const token = getToken();

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggle = () => setIsOpen(!isOpen);

    const onLogoutHandler = () => {
        localStorage.removeItem("token");
        window.location.href = '/login'
    };

    return (
        <header>
            <div className="container">
                <Navbar expand="md" dark>
                    <NavbarBrand
                        href="/">
                        <img
                            src={logoImg}
                            alt="Logo"
                            className="logo-img"
                        />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className="ms-auto" style={{ color: 'white' }} />
                    <Collapse isOpen={isOpen} navbar>

                        {!token && (
                            <>
                                <Nav className="ms-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{ color: 'white' }}>
                                            <img src={userImg} alt="user" className="user-img" />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem onClick={() => navigate('/login')}>Login</DropdownItem>
                                            <DropdownItem onClick={() => navigate('/register')}>Register</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </>
                        )}

                        {token && (
                            <>
                                <Nav className="ms-auto" navbar>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/courses')} style={{ color: 'white' }}>
                                            Courses
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/students')} style={{ color: 'white' }}>
                                            Students
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/attendances')} style={{ color: 'white' }}>
                                            Attendances
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/tasks')} style={{ color: 'white' }}>
                                            Tasks & Exams
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/taskSubmissions')} style={{ color: 'white' }}>
                                            Task Submissions
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/gradeWeights')} style={{ color: 'white' }}>
                                            Grade Weights
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className="nav-item-responsive px-1">
                                        <NavLink onClick={() => navigate('/report')} style={{ color: 'white' }}>
                                            Report
                                        </NavLink>
                                    </NavItem>

                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{ color: 'white' }}>
                                            <img src={userImg} alt="user" className="user-img" />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem onClick={onLogoutHandler}>Logout</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </>
                        )}
                    </Collapse>
                </Navbar>
            </div>
        </header>


    );
};

export default Header;
