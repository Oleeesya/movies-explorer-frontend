import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <section className="techs" id='section2'>
            <h3 className='techs__title'>Технологии</h3>
            <div className='techs__wrapper'>
                <p className='techs__wrapper-header'>7 технологий</p>
                <p className='techs__wrapper-description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className='techs__box'>
                    <span className='techs__box-item'>HTML</span>
                    <span className='techs__box-item'>CSS</span>
                    <span className='techs__box-item'>JS</span>
                    <span className='techs__box-item'>React</span>
                    <span className='techs__box-item'>Git</span>
                    <span className='techs__box-item'>Express.js</span>
                    <span className='techs__box-item'>mongoDB</span>
                </div>
            </div>
        </section>
    );
}

export default Techs;
