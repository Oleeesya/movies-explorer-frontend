import React from 'react';
import './Portfolio.css';

function Portfolio() {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <nav className='portfolio'>
            <p className='portfolio__title'>Портфолио</p>
            <ul className='portfolio__list'>
                <li className='portfolio__item portfolio__item_border'>
                    <button className='portfolio__link' onClick={() => openInNewTab('https://github.com/Oleeesya/how-to-learn')}>
                        <p className='portfolio__link-title'>Статичный сайт</p>
                        <span className='portfolio__arrow'></span>
                    </button>
                </li>
                <li className='portfolio__item portfolio__item_border'>
                    <button className='portfolio__link' onClick={() => openInNewTab('https://oleeesya.github.io/russian-travel/')}>
                        <p className='portfolio__link-title'>Адаптивный сайт</p>
                        <span className='portfolio__arrow'></span>
                    </button>
                </li>
                <li className='portfolio__item'>
                    <button className='portfolio__link' onClick={() => openInNewTab('http://domainname.mesto.nomoredomains.sbs/#/sign-in')}>
                        <p className='portfolio__link-title'>Одностраничное приложение</p>
                        <span className='portfolio__arrow'></span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Portfolio;
