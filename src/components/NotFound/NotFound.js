import React from 'react';
import './NotFound.css';

function NotFound(props) {
    return (
        <div className='notFound'>
            <h1 className='notFound__title'>404</h1>
            <p className='notFound__description'>Страница не найдена</p>
            <button className='notFound__btn-back' onClick={props.handleClickMain}>Назад</button>
        </div>
    );
}

export default NotFound;
