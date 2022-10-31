import React from 'react';
import './AboutMe.css';
import myfoto from '../../images/foto.jpg';

function AboutMe(props) {

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="aboutMe" id='section3'>
            <h3 className='aboutMe__title'>Студент</h3>
            <article className='aboutMe__wrapper'>
                <div className='aboutMe__wrapper-description'>
                    <div>
                        <p className='aboutMe__name'>Олеся</p>
                        <p className='aboutMe__profession'>Фронтенд-разработчик, 29 лет</p>
                        <p className='aboutMe__hobby'>Я люблю слушать музыку, а ещё увлекаюсь бегом. Развиваюсь в веб-разработке.</p>
                    </div>
                    <button className='aboutMe__network' onClick={() => openInNewTab('https://github.com/Oleeesya')}>
                        <p className='aboutMe__network-title'>Github</p>
                    </button>                </div>
                <img className='aboutMe__foto' src={myfoto} alt='Моя фотография'></img>
            </article>
        </section>
    );
}

export default AboutMe;
