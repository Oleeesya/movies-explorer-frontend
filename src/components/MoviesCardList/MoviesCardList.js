import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section className="moviesCardList">
            <div className='moviesCardList__wrapper'>
                {
                    props.movies.map((movie) => {
                        return (
                            <MoviesCard key={movie.movieId} link={movie.image} name={movie.nameRU} duration={movie.duration}
                                id={movie.movieId}
                            />
                        )
                    })
                }
            </div>
            {props.children}
        </section>
    );
}

export default MoviesCardList;
