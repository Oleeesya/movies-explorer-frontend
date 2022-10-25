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
        let saveMovies = [];
        let filterUniq = [];
        let uniq = {};
        let filmToSave = [];
        if (props.shortFilm) {
            filmToSave = JSON.parse(localStorage.getItem('short-mov')).find((item) => item.nameRU === e.target.getAttribute('titlemovie'));

            saveMovies = [filmToSave, ...JSON.parse(localStorage.getItem('save-short-mov')) || []];

            localStorage.setItem('save-short-mov', JSON.stringify(saveMovies));
            filterUniq = [...JSON.parse(localStorage.getItem('save-short-mov')) || []].filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));

            localStorage.setItem('save-short-mov', JSON.stringify(filterUniq));
            props.setSavedMovies([...JSON.parse(localStorage.getItem('save-short-mov'))]);

        }
        else {
            filmToSave = JSON.parse(localStorage.getItem('mov')).find((item) => item.nameRU === e.target.getAttribute('titlemovie'));

            saveMovies = [filmToSave, ...JSON.parse(localStorage.getItem('save-mov')) || []];

            localStorage.setItem('save-mov', JSON.stringify(saveMovies));
            filterUniq = [...JSON.parse(localStorage.getItem('save-mov')) || []].filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));

            localStorage.setItem('save-mov', JSON.stringify(filterUniq));
            props.setSavedMovies([...JSON.parse(localStorage.getItem('save-mov'))]);
        }

        setSave(true);
    }

    const handleRemoveMovie = (e) => {
        let filmToRemove = [];
        let filterFilms = [];

        if (props.shortFilm) {
            filmToRemove = JSON.parse(localStorage.getItem('save-short-mov')).find((item) => item.nameRU === e.target.getAttribute('titlemovie'));
            filterFilms = [...JSON.parse(localStorage.getItem('save-short-mov')) || []].filter((obj) => obj.nameRU !== filmToRemove.nameRU);
            localStorage.setItem('save-short-mov', JSON.stringify(filterFilms));

            props.setSavedMovies(filterFilms);
        }
        else {

            filmToRemove = JSON.parse(localStorage.getItem('save-mov')).find((item) => item.nameRU === e.target.getAttribute('titlemovie'));
            filterFilms = [...JSON.parse(localStorage.getItem('save-mov')) || []].filter((obj) => obj.nameRU !== filmToRemove.nameRU);
            localStorage.setItem('save-mov', JSON.stringify(filterFilms));

            props.setSavedMovies(filterFilms);
        }

    }

    const handleRemoveOver = () => {
        setRemove(true);
    }

    const handleDeleteRemoveOver = () => {
        setRemove(false);
    }

    let savedFilms = JSON.parse(localStorage.getItem('save-mov')) || [];
    let savedShortFilms = JSON.parse(localStorage.getItem('save-short-mov')) || [];

    useEffect(() => {
        savedFilms.forEach(element => {
            if (element.nameRU === props.name) {
                setSave(true)
            }
        });
        savedShortFilms.forEach(element => {
            if (element.nameRU === props.name) {
                setSave(true)
            }
        });
    })

    return (
        <article className="moviesCard">
            <button className={`${save && history.location.pathname === '/movies' ? 'moviesCard__saved_active' :
                history.location.pathname === '/movies' ? 'moviesCard__saved' : 'moviesCard__saved_none'}`}
                type="button" onClick={handleSaveClick} titlemovie={props.name}>
                {`${save ? "" : "Сохранить"}`}
            </button>
            <button className={`${remove && history.location.pathname === '/saved-movies' ? 'moviesCard__remove'
                : 'moviesCard__remove_none'}`}
                type='button' onMouseOver={handleRemoveOver} onMouseOut={handleDeleteRemoveOver} onClick={handleRemoveMovie}
                titlemovie={props.name}></button>
            <img className={`${history.location.pathname === '/saved-movies' ? 'moviesCard__image_hover moviesCard__image' : 'moviesCard__image'}`}
                src={'https://api.nomoreparties.co/' + props.link} alt={props.name}
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
