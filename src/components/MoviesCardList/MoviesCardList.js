import React from 'react';
import { useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    const [showMore, setShowMore] = useState(false);

    const getInitialCount = () => {
        if (props.dimensions.width > 768) {
            return 12
        }
        else if (props.dimensions.width > 480) {
            return 8
        }
        else {
            return 5
        }
    };

    const [showMovies, setShowMovies] = useState(getInitialCount());

    const useCounter = () => {
        const [count, setCount] = useState(getInitialCount());

        const add = () => {

            if (props.dimensions.width > 768) {
                setShowMovies(count + 3)
                setCount(count + 3)
            }
            else if (props.dimensions.width > 480) {
                setShowMovies(count + 3)
                setCount(count + 2)
            }
            else if (props.dimensions.width > 320) {
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
                        <MoviesCard key={movie.id} link={movie.image.url} name={movie.nameRU} duration={movie.duration}
                            id={movie.movieId} setSavedMovies={props.setSavedMovies} movies={props.movies}
                            handleSaveClick={props.handleSaveClick} shortFilm={props.shortFilm}
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
