import React from 'react';
import { useState } from 'react';
import Header from '../Header/Header';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe'
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';
import { useHistory } from 'react-router-dom';

function Main(props) {
    const [mobile, setMobile] = useState(false);
    const history = useHistory();

    const handleClickMenu = () => {
        setMobile(!mobile);
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="main">
            {props.loggedIn ? <Header handleClickMain={props.handleClickMain}>
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
                : <Header handleClickMain={props.handleClickMain}>
                    <div>
                        <button className='header__register' onClick={props.handleClickRegister}>Регистрация</button>
                        <button className='header__login' onClick={props.handleClickLogin}>Войти</button>
                    </div>
                </Header>}
            <main className='main__content'>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe openInNewTab={openInNewTab} />
                <Portfolio />
            </main>
            <Footer openInNewTab={openInNewTab} />
        </div>
    );
}

export default Main;
