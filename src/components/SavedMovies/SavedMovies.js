import React from 'react';
import { useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useHistory } from 'react-router-dom';
const { moviesSearchError, nothingFound } = require('../../utils/const');

function SavedMovies(props) {

    const history = useHistory();

    const [mobile, setMobile] = useState(false);

    const handleClickMenu = () => {
        setMobile(!mobile);
    }
    
    return (
        <div className="savedMovies">
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
            <main className='savedMovies__content'>
                <SearchForm shortFilm={props.shortFilm} handleShortFilm={props.handleShortFilm} handleSearchMovies={props.handleSearchMovies}
                    setSaved={props.setSaved} saved={props.saved} nothingFound={props.nothingFound} formDisabled={props.formDisabled} />
                <Preloader preloader={props.preloader} />
                <div className={`${props.nothingFound || props.moviesSearchError ? 'movies-error movies-error_active' : 'movies-error'}`}>
                    {`${props.nothingFound ? nothingFound : props.moviesSearchError ? moviesSearchError : ''}`}

                </div>
                <MoviesCardList movies={props.savedMovies} setSavedMovies={props.setSavedMovies} nothingFound={props.nothingFound}
                    handleSaveClick={props.handleSaveClick} dimensions={props.dimensions} shortFilm={props.shortFilm}
                    handleDeleteMovie={props.handleDeleteMovie} saved={props.saved} loggedIn={props.loggedIn} myMovies={props.myMovies}
                    saveCard={props.saveCard} />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
