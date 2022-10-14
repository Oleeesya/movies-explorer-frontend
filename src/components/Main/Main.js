import React from 'react';
import Header from '../Header/Header';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe'
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';

function Main(props) {

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="main">
            <Header handleClickMain={props.handleClickMain}>
                <div>
                    <button className='header__register' onClick={props.handleClickRegister}>Регистрация</button>
                    <button className='header__login' onClick={props.handleClickLogin}>Войти</button>
                </div>
            </Header>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe openInNewTab={openInNewTab} />
            <Portfolio />
            <Footer openInNewTab={openInNewTab} />
        </div>
    );
}

export default Main;
