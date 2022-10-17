import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <>
            <form className="searchForm">
                <input className="searchForm__input" type="text" placeholder='Фильм' required/>
                <button className="searchForm__btn">Найти</button>
            </form>
            <FilterCheckbox />
        </>
    );
}

export default SearchForm;
