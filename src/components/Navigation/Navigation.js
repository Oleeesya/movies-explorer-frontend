import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation';

function Navigation() {
    return (
        <nav className='navigation'>
            <NavLink exact to='/' className='navigation__link'>О проекте</NavLink>
            <NavLink to='/movies' className='navigation__link'>Фильмы</NavLink>
            <NavLink to='/saved-movies' className='navigation__link'>Сохранённые фильмы</NavLink>
            <NavLink to='/profile' className='navigation__link'>Аккаунт</NavLink>
            <NavLink to='/signup' className='navigation__link'>Регистрация</NavLink>
            <NavLink to='/signin' className='navigation__link'>Авторизация</NavLink>
            <NavLink to='*' className='navigation__link'>Ошибка</NavLink>
        </nav>
    )
}

export default Navigation;
