import React from 'react';
import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MoviesCard(props) {

    const history = useHistory();

    const isSave = () => {
        for (let i = 0; i < props.myMovies.length; i++) {
            if (props.myMovies[i].nameRU === props.name) {
                return true
            }
        }
        return false
    }

    const [save, setSave] = useState(isSave());
    const [remove, setRemove] = useState(false);

    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        setHour(Math.floor(props.duration / 60))
        setMinutes(props.duration % 60)
    }, [props.duration]);

    const handleSaveClick = (e) => {
        let allFilms = JSON.parse(localStorage.getItem('movies-from-yandex-api'));
        let film = {};
        film = allFilms.find((item) => item.nameRU === e.target.getAttribute('titlemovie'));
        let promise = props.handleSaveClick(film);
        promise
            .then(() => {
                setSave(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setSave(isSave())
    }, [props.myMovies])

    const handleDeleteMovie = (e) => {
        let film = {};
        film = props.movies.find((item) => item.nameRU === e.target.getAttribute('titlemovie'));
        props.handleDeleteMovie(film)
        setSave(false);
    }

    const handleRemoveOver = () => {
        setRemove(true);
    }

    const handleDeleteRemoveOver = () => {
        setRemove(false);
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <article className="moviesCard">
            <button className={`${save && history.location.pathname === '/movies' ? 'moviesCard__saved_active' :
                history.location.pathname === '/movies' ? 'moviesCard__saved' : 'moviesCard__saved_none'}`}
                type="button" onClick={save ? handleDeleteMovie : handleSaveClick} titlemovie={props.name}
            >
                {`${save ? "" : "Сохранить"}`}
            </button>
            <button className={`${remove && history.location.pathname === '/saved-movies' ? 'moviesCard__remove moviesCard__remove_mobile'
                : history.location.pathname === '/saved-movies' ? 'moviesCard__remove_none moviesCard__remove_mobile' : 'moviesCard__remove_none'}`}
                type='button' onMouseOver={handleRemoveOver} onMouseOut={handleDeleteRemoveOver} onClick={handleDeleteMovie}
                titlemovie={props.name}></button>
            <img className='moviesCard__image_hover moviesCard__image'
                src={`${props.link.startsWith('http') ? props.link : 'https://api.nomoreparties.co/' + props.link}`} alt={props.name}
                onMouseOver={handleRemoveOver} onMouseOut={handleDeleteRemoveOver}
                onClick={() => openInNewTab(props.trailerLink)}
            />
            <div className="moviesCard__description">
                <h2 className="moviesCard__title">{props.name}</h2>
                <span className="moviesCard__duration">{`${minutes === 0 ? hour + 'ч' : hour === 0 ? minutes + ' м' :
                    hour + 'ч ' + minutes + 'м'}`}</span>
            </div>
        </article>
    )
}

export default MoviesCard;
