import React from 'react';
import { useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
const { INIT_CARD_COUNT1, INIT_CARD_COUNT2, INIT_CARD_COUNT3, SCREEN_SIZE1, SCREEN_SIZE2 } = require('../../utils/const')

function MoviesCardList(props) {

    const [showMore, setShowMore] = useState(false);

    const getInitialCount = () => {
        if (props.dimensions.width > SCREEN_SIZE1) {
            return INIT_CARD_COUNT1
        }
        else if (props.dimensions.width > SCREEN_SIZE2) {
            return INIT_CARD_COUNT2
        }
        else {
            return INIT_CARD_COUNT3
        }
    };

    const [showMovies, setShowMovies] = useState(getInitialCount());

    const useCounter = () => {
        const [count, setCount] = useState(getInitialCount());

        const add = () => {

            if (props.dimensions.width > SCREEN_SIZE1) {
                setShowMovies(count + 3)
                setCount(count + 3)
            }
            else if (props.dimensions.width > SCREEN_SIZE2) {
                setShowMovies(count + 3)
                setCount(count + 2)
            }
            else {
                setShowMovies(count + 3)
                setCount(count + 2)
            }
        };
        return { count, add }
    };

    const { count, add } = useCounter();

    function handleShowMore() {
        setShowMore(true);
        add();
    }

    return (
        <section className="moviesCardList">
            <div className='moviesCardList__wrapper'>

                {props.movies.slice(0, count).map((movie) => {
                    return (
                        <MoviesCard key={movie.nameRU} link={movie.image.url || movie.image} name={movie.nameRU} duration={movie.duration}
                            id={movie.id} setSavedMovies={props.setSavedMovies} movies={props.movies}
                            handleSaveClick={props.handleSaveClick} shortFilm={props.shortFilm} trailerLink={movie.trailerLink}
                            data={props.data} handleDeleteMovie={props.handleDeleteMovie} saved={props.saved} myMovies={props.myMovies}
                        />
                    )
                })
                }

            </div>
            <button className={`${props.movies.length <= 3 || showMovies >= props.movies.length ? 'moviesCardList__btn-more moviesCardList__btn-more_none' : 'moviesCardList__btn-more'}`}
                type='button' onClick={handleShowMore} >Ещё</button>
        </section>
    );
}

export default MoviesCardList;
