import React from 'react';
import Header from '../Header/Header';
import './profile.css';
import Form from '../Form/Form';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { currentUserContext } from '../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';

const { emailRegex } = require('../../utils/const')

function Profile(props) {
    let userContext = React.useContext(currentUserContext);
    const [name, setName] = useState(userContext.name || '');
    const [email, setEmail] = useState(userContext.email || '');
    const [mobile, setMobile] = useState(false);
    const [isOldName, setIsOldName] = useState(true);
    const [isOldEmail, setIsOldEmail] = useState(true);
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

    useEffect(() => {
        setName(userContext.name);
        setEmail(userContext.email);
    }, [userContext]);

    const handleClickMenu = () => {
        setMobile(!mobile);
    }

    const handleEdit = () => {
        props.setProfile(true);
        setValue('name', userContext.name);
        setValue('email', userContext.email);
        setIsOldName(true);
        setIsOldEmail(true);
        props.setStatus(false);
    }

    const handleEditProfile = () => {
        props.handleEditUserInfo({ name, email });
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userLogged');
        localStorage.removeItem('mov');
        localStorage.removeItem('title-mov');
        localStorage.removeItem('toggle');
        localStorage.removeItem('movies-from-yandex-api');
        props.setMovies([])

        props.setShortFilm(false);
        props.setToken('');
        props.setloggedIn(false);
        history.push('/');
    }

    const onInputNameHandle = (e) => {
        if (e.target.value === userContext.name) {
            setIsOldName(true);
        } else {
            setIsOldName(false);
        }
        setName(e.target.value);
        props.setMessageError("");
    }

    const onInputEmailHandle = (e) => {
        if (e.target.value === userContext.email) {
            setIsOldEmail(true);

        } else {
            setIsOldEmail(false);
        }
        setEmail(e.target.value);
        props.setMessageError("");
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
                <Form buttonText='Сохранить' name='profile' profile={props.profile} onSubmit={handleSubmit(handleEditProfile)}
                    messageerror={props.messageerror} >
                    <div>
                        <div className='form__input-wrapper form__input_border_active'>
                            <input {...register('name', { required: true, maxLength: 30, minLength: 2, type: String })}
                                className="form__input form__input_type_profile" required id="name" name="name" type="name" placeholder={name}
                                value={name || ''} onInput={onInputNameHandle} autoComplete="off"
                                disabled={`${props.profile ? '' : 'desabled'}`}
                            />
                            <span className='form__placeholder form__placeholder_type_profile'>Имя</span>
                            {errors.name && <p className='form__error form__error_profile'>Длина строки должна быть не менее 2 и не более 30 символов</p>}

                        </div>
                        <div className='form__input-wrapper'>
                            <input {...register('email', { required: true, type: String, pattern: emailRegex })}
                                className="form__input form__input_type_profile" required id="email" name="email" type="text" placeholder={email}
                                value={email || ''} onInput={onInputEmailHandle} autoComplete="off"
                                disabled={`${props.profile ? '' : 'desabled'}`}
                            />
                            <span className='form__placeholder form__placeholder_type_profile'>Почта</span>
                            {errors.email && <p className='form__error form__error_profile'>Неправильный формат почты</p>}

                        </div>
                    </div>

                    <span className={`${props.isStatus ? 'form__changed-message form__changed-message_active' : 'form__changed-message'}`}
                    >{`${props.isStatus ? 'Профиль успешно изменен!' : ''}`}
                    </span>

                    <button className={`${props.profile ? 'profile__edit-btn_none' : 'profile__edit-btn'}`}
                        onClick={handleEdit}
                        type="button">Редактировать
                    </button>

                    <button type="submit" className={`${props.profile && props.messageerror ? 'form__submit form__submit_type_profile form__submit_not-valid' :
                        props.profile && isValid && (!isOldName || !isOldEmail) ? 'form__submit form__submit_type_profile' :
                            props.profile && (!isValid || (isOldName && isOldEmail)) ? 'form__submit form__submit_type_profile form__submit_not-valid' :
                                'form__submit_none'}`}
                        disabled={`${isValid && (!isOldName || !isOldEmail) ? '' : 'desabled'}`} >Сохранить
                    </button>

                    <div className={`${props.profile ? 'profile__exite_none' : 'profile__exite'}`}>
                        <button className="profile__exite-btn" onClick={handleSignOut} type="button">Выйти из аккаунта
                        </button>
                    </div>
                </Form>
            </main>
        </div>
    );
}

export default Profile;
