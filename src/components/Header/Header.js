import React from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';

function Header(props) {

    const history = useHistory();
    return (
        <header className={`${history.location.pathname === '/signup' || history.location.pathname === '/signin' ?
            'header header_type_input' : history.location.pathname === '/movies' || history.location.pathname === '/saved-movies' ||
                history.location.pathname === '/profile' ? 'header header_type_profile' : 'header'}`}>
            <div className='header__logo' onClick={props.handleClickMain}></div>
            {props.children}
        </header>
    );
}

export default Header;
