import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="aboutProject" id='section1'>
            <h3 className='aboutProject__title'>О проекте</h3>
            <div className='aboutProject__wrapper'>
                <div>
                    <p className='aboutProject__wrapper-title'>Дипломный проект включал 5 этапов</p>
                    <p className='aboutProject__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <p className='aboutProject__wrapper-title'>На выполнение диплома ушло 5 недель</p>
                    <p className='aboutProject__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutProject__time'>
                <span className='aboutProject__time_type_backend'>1 неделя
                    <span className='aboutProject__time_title_backend'>Back-end</span>
                </span>
                <span className='aboutProject__time_type_frontend'>4 недели
                    <span className='aboutProject__time_title_frontend'>Front-end</span>
                </span>
            </div>
        </section>
    );
}

export default AboutProject;
