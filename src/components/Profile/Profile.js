import React from 'react';
import Header from '../Header/Header';
import './profile.css';
import Form from '../Form/Form';
import { useState } from 'react';

function Profile(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(false);
    const [profile, setProfile] = useState(false)

    const onRegister = (e) => {
        e.preventDefault();
    }

    const handleClickMenu = () => {
        setMobile(!mobile);
    }

    const handleEditProfile = () => {
        setProfile(true)
    }

    return (
        <div className="profile">
            <Header handleClickMain={props.handleClickMain}>
                <div className={`${mobile ? 'header__layer' : ''}`}>
                    <div className={`${mobile ? 'header__container header__container_mobile' : 'header__container'}`}>
                        <div className='header__menu'>
                            <button className='header__main' onClick={props.handleClickMain}>Главная</button>
                            <button className='header__movies' onClick={props.handleClickMovies}>Фильмы</button>
                            <button className='header__saved-movies' onClick={props.handleClickSavedMovies}>Сохраненные фильмы</button>
                        </div>
                        <div className='header__profile' onClick={props.handleClickProfile}></div>
                    </div>
                </div>
                <button className={`${!mobile ? 'header__menu-mobile' : 'header__menu-mobile_status_opened'}`}
                    onClick={handleClickMenu}></button>

            </Header>
            <main className='profile__content'>
                <h2 className='header__title header__tytle_profile'>Привет, {name}!</h2>
                <Form buttonText='Сохранить' onSubmit={onRegister} name='profile' profile={profile}>
                    <div>
                        <div className='form__input-wrapper form__input_border_active'>
                            <input className="form__input form__input_type_profile" required id="name" name="name" type="name" placeholder={name}
                                value={name} onChange={({ target }) => setName(target.value)} autoComplete="off" />
                            <span className='form__placeholder form__placeholder_type_profile'>Имя</span>
                        </div>
                        <div className='form__input-wrapper'>
                            <input className="form__input form__input_type_profile" required id="email" name="email" type="text" placeholder={email}
                                value={email} onChange={({ target }) => setEmail(target.value)} autoComplete="off" />
                            <span className='form__placeholder form__placeholder_type_profile'>Почта</span>
                        </div>
                    </div>

                    <button className={`${profile ? 'profile__edit-btn_none' : 'profile__edit-btn'}`}
                        onClick={handleEditProfile} type="button">Редактировать</button>
                    <div className={`${profile ? 'profile__exite_none' : 'profile__exite'}`}>
                        <button className="profile__exite-btn" onClick={props.handleClickMain} type="button">Выйти из аккаунта
                        </button>
                    </div>
                </Form>
            </main>
        </div>
    );
}

export default Profile;
