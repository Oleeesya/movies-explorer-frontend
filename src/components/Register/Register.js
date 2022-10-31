import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Header from '../Header/Header';
import Form from '../Form/Form';
import './Register.css';

const { emailRegex } = require('../../utils/const')

function Register(props) {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegister = (e) => {
        props.handleRegister(name, email, password);

    }

    const onInputNameHandle = (e) => {
        setName(e.target.value)
        props.setMessageError("")
    }

    const onInputEmailHandle = (e) => {
        setEmail(e.target.value)
        props.setMessageError("")
    }

    const onInputPasswordHandle = (e) => {
        setPassword(e.target.value)
        props.setMessageError("")
    }

    return (
        <div className="register">
            <Header handleClickMain={props.handleClickMain}>
                <h2 className='header__title'>Добро пожаловать!</h2>
            </Header>
            <main className='register__content'>
                <Form buttonText='Зарегистрироваться' onSubmit={handleSubmit(onRegister)} isValid={isValid} messageerror={props.messageerror}>

                    <div className='form__wrapper'>
                        <span className='form__placeholder'>Имя</span>
                        <input {...register('name', { required: true, maxLength: 30, minLength: 2, type: String })}
                            className={`${errors.name ? 'form__input form__input_error' : 'form__input'}`}
                            required id="name" name="name" type="text" placeholder=""
                            value={name} onInput={onInputNameHandle} autoComplete="off" />
                        {errors.name && <p className='form__error'>Длина строки должна быть не менее 2 и не более 30 символов</p>}
                    </div>

                    <div className='form__wrapper'>
                        <span className='form__placeholder'>E-mail</span>
                        <input {...register('email', {
                            required: true, type: String, pattern: emailRegex
                        })}
                            className={`${errors.email ? 'form__input form__input_error' : 'form__input'}`}
                            required id="email" name="email" type="text" placeholder=""
                            value={email} onInput={onInputEmailHandle} autoComplete="off" />
                        {errors.email && <p className='form__error'>Неправильный формат почты</p>}
                    </div>

                    <div className='form__wrapper'>
                        <span className='form__placeholder'>Пароль</span>
                        <input {...register('password', { required: true, type: String })}
                            className={`${errors.password ? 'form__input form__input_error' : 'form__input'}`}
                            required id="password" name="password" type="password" placeholder=""
                            value={password} onInput={onInputPasswordHandle} autoComplete="off" />
                        {errors.password && <p className='form__error'>Что-то пошло не так...</p>}
                    </div>


                    <div className="register-login">
                        <button className="register-login__btn" onClick={props.handleClickLogin} type="button">Уже зарегистрированы?
                            <span className='register-login__input'>Войти</span>
                        </button>
                    </div>
                </Form>
            </main>
        </div>
    );
}

export default Register;
