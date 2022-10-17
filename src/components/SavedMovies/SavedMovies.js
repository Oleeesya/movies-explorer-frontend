import React from 'react';
import { useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useHistory } from 'react-router-dom';

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
                <SearchForm />
                <Preloader />
                <MoviesCardList movies={props.movies} />
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
