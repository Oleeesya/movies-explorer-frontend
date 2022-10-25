import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {

    const [nameMovies, setNameMovies] = useState('' || localStorage.getItem('title-mov'));

    function handleChangeName(e) {
        setNameMovies(e.target.value);
        localStorage.setItem('title-mov', e.target.value);
    }

    const handleSearchMovies = (e) => {
        e.preventDefault();
        props.handleSearchMovies(nameMovies);
    }

    return (
        <>
            <form className="searchForm" onSubmit={handleSearchMovies}>
                <input className="searchForm__input" type="text" placeholder='Фильм' value={nameMovies || ''} onChange={handleChangeName}
                    required
                />
                <button className="searchForm__btn" type='submit'>Найти</button>
            </form>
            <FilterCheckbox handleShortFilm={props.handleShortFilm} shortFilm={props.shortFilm} />
        </>
    );
}

export default SearchForm;
