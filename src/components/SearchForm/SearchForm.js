import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
    const history = useHistory();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        setValue
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const [nameMovies, setNameMovies] = useState(`${history.location.pathname === '/movies' ?
        localStorage.getItem('title-mov') || '' : ''}`)

    function handleChangeName(e) {
        setNameMovies(e.target.value);
        if (history.location.pathname === '/movies') {
            localStorage.setItem('title-mov', e.target.value);
        }
    }

    const handleSearchMovies = (e) => {
        props.handleSearchMovies(nameMovies);
        if (history.location.pathname === '/movies') {
            props.setSaved(!props.saved);
        }
    }

    return (
        <>
            <form className="searchForm" onSubmit={props.formDisabled ? () => { } : handleSubmit(handleSearchMovies)} >
                <input {...register('name', { required: true, minLength: 1, type: String })}
                    className="searchForm__input" type="text" placeholder='Фильм' value={nameMovies || ''} onInput={handleChangeName} />
                {errors.name && <p className='form__error form__error_search'>Нужно ввести ключевое слово</p>}

                <button className="searchForm__btn" type='submit' disabled={`${props.formDisabled ? 'disabled' : ''}`}>Найти</button>

            </form>

            <FilterCheckbox handleShortFilm={props.handleShortFilm} shortFilm={props.shortFilm} />
        </>
    );
}

export default SearchForm;
