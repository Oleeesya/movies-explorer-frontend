import React from 'react';
import './MoviesCard.css';
import { useState, useEffect } from 'react';

function MoviesCard(props) {
    const [save, setSave] = useState(false);
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

    return (
        <article className="moviesCard">
            <button className={`${save ? 'moviesCard__saved_active' : 'moviesCard__saved'}`}
                type="button" onClick={handleSaveClick}>Сохранить</button>
            <img className="moviesCard__image" src={props.link} alt={props.name} />
            <div className="moviesCard__description">
                <h2 className="moviesCard__title">{props.name}</h2>
                <span className="moviesCard__duration">{`${minutes === 0 ? hour + 'ч' : hour === 0 ? minutes + ' м' :
                    hour + 'ч ' + minutes + 'м'}`}</span>
            </div>
        </article>
    )
}

export default MoviesCard;
