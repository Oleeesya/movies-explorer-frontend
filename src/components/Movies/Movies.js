import React from 'react';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useHistory } from 'react-router-dom';
const { moviesSearchError, nothingFound } = require('../../utils/const')

function Movies(props) {
    const [mobile, setMobile] = useState(false);

    const history = useHistory();

    const handleClickMenu = () => {
        setMobile(!mobile);
    }

    return (
        <div className="movies">
            <Header handleClickMain={props.handleClickMain}>
                <div className={`${mobile ? 'header__layer' : ''}`}>
                    <div className={`${mobile ? 'header__container header__container_mobile' : 'header__container'}`}>
                        <div className='header__menu'>
                            <button className='header__main' onClick={props.handleClickMain}>Главная</button>
                            <button className=
                                {`${history.location.pathname === '/movies' ? 'header_page_active header__movies' : 'header__movies'}`}
                                onClick={props.handleClickMovies}>Фильмы</button>
                            <button className=
                                {`${history.location.pathname === '/saved-movies' ? 'header_page_active header__saved-movies' : 'header__saved-movies'}`}
                                onClick={props.handleClickSavedMovies}>Сохраненные фильмы</button>
                        </div>
                        <div className='header__profile' onClick={props.handleClickProfile}></div>
                    </div>
                </div>
                <button className={`${!mobile ? 'header__menu-mobile' : 'header__menu-mobile_status_opened'}`}
                    onClick={handleClickMenu}></button>
            </Header>
            <main className='movies__content'>
                <SearchForm handleSearchMovies={props.handleSearchMovies} handleShortFilm={props.handleShortFilm}
                    shortFilm={props.shortFilm} />
                <Preloader preloader={props.preloader} />
                <div className={`${props.nothingFound || props.moviesSearchError ? 'movies-error movies-error_active' : 'movies-error'}`}>
                    {`${props.nothingFound ? nothingFound : props.moviesSearchError ? moviesSearchError : ''}`}

                </div>
                <MoviesCardList movies={props.movies} dimensions={props.dimensions} setSavedMovies={props.setSavedMovies}
                    shortFilm={props.shortFilm}>
                </MoviesCardList>
            </main>
            <Footer />
        </div>
    );
}

export default Movies;
