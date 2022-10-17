import React from 'react';
import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MoviesCard(props) {
    const history = useHistory();

    const [save, setSave] = useState(false);
    const [remove, setRemove] = useState(false);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        setHour(Math.floor(props.duration / 60))
        setMinutes(props.duration % 60)
    }, [props.duration]);

    const handleSaveClick = (e) => {
        e.target.textContent = '';
        setSave(true);
    }

    const handleRemoveOver = () => {
        setRemove(true);
    }

    const handleDeleteRemoveOver = () => {
        setRemove(false);
    }

    return (
        <article className="moviesCard">
            <button className={`${save && history.location.pathname === '/movies' ? 'moviesCard__saved_active' :
                history.location.pathname === '/movies' ? 'moviesCard__saved' : 'moviesCard__saved_none'}`}
                type="button" onClick={handleSaveClick}>
                Сохранить
            </button>
            <button className={`${remove && history.location.pathname === '/saved-movies' ? 'moviesCard__remove'
                : 'moviesCard__remove_none'}`}
                type='button' onMouseOver={handleRemoveOver} onMouseOut={handleDeleteRemoveOver}></button>
            <img className={`${history.location.pathname === '/saved-movies' ? 'moviesCard__image_hover moviesCard__image' : 'moviesCard__image'}`}
                src={props.link} alt={props.name}
                onMouseOver={handleRemoveOver} onMouseOut={handleDeleteRemoveOver} />
            <div className="moviesCard__description">
                <h2 className="moviesCard__title">{props.name}</h2>
                <span className="moviesCard__duration">{`${minutes === 0 ? hour + 'ч' : hour === 0 ? minutes + ' м' :
                    hour + 'ч ' + minutes + 'м'}`}</span>
            </div>
        </article>
    )
}

export default MoviesCard;
