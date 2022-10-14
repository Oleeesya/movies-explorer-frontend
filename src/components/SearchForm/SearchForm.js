import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <>
            <div className="searchForm">
                <input className="searchForm__input" type="text" placeholder='Фильм' />
                <button className="searchForm__btn">Найти</button>
            </div>
            <FilterCheckbox />
        </>
    );
}

export default SearchForm;
