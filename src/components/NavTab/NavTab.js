import React from 'react';
import './NavTab.css';

import { Link, animateScroll as scroll } from "react-scroll";

function NavTab() {
    return (
        <nav>
            <ul className='navTab'>
                <li className='navTab__item'>
                    <Link className='navTab__link'
                        activeClass="navTab__item_active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >О проекте</Link>
                </li>
                <li className='navTab__item'>
                    <Link className='navTab__link'
                        activeClass="navTab__item_active"
                        to="section2"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >Технологии</Link>
                </li>
                <li className='navTab__item'>
                    <Link className='navTab__link'
                        activeClass="navTab__item_active"
                        to="section3"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >Студент</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
