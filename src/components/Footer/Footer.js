import React from 'react';
import './Footer.css';

function Footer(props) {

    return (
        <footer className="footer">
            <p className='footer__title'>
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className='footer__wrapper'>
                <p className='footer__data'>© 2022</p>
                <nav>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <button className='footer__link' onClick={() => props.openInNewTab('https://practicum.yandex.ru/')}>
                                <p className='footer__link-title'>Яндекс.Практикум</p>
                            </button>
                        </li>
                        <li className='footer__item'>
                            <button className='footer__link' onClick={() => props.openInNewTab('https://github.com/Oleeesya')}>
                                <p className='footer__link-title'>Github</p>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
