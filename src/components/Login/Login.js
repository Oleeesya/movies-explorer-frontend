import React from 'react';
import { useState } from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import './Login.css';
import { useForm } from 'react-hook-form';

const { emailRegex } = require('../../utils/const')

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
    });

    const onLogin = (e) => {
        props.handleAuthorize(email, password);
        setEmail(email);
        setPassword(password);
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
        <div className="login">
            <Header handleClickMain={props.handleClickMain}>
                <h2 className='header__title'>Рады видеть!</h2>
            </Header>
            <main className='login__content'>
                <Form buttonText='Войти' onSubmit={handleSubmit(onLogin)} isValid={isValid} messageerror={props.messageerror}>
                    <div>
                        <span className='form__placeholder'>E-mail</span>
                        <input {...register('email', { required: true, type: String, pattern: emailRegex })}
                            className="form__input" required id="email" name="email" type="text" placeholder=""
                            value={email} onInput={onInputEmailHandle} autoComplete="off" />
                        {errors.email && <p className='form__error'>Неправильный формат почты</p>}
                    </div>
                    <div>
                        <span className='form__placeholder'>Пароль</span>
                        <input {...register('password', { required: true, maxLength: 30, minLength: 1 })}
                            className="form__input" required id="password" name="password" type="password" placeholder=""
                            value={password} onInput={onInputPasswordHandle} autoComplete="off" />
                    </div>
                    <div className="register-login">
                        <button className="register-login__btn" onClick={props.handleClickRegister} type="button">Ещё не зарегистрированы?
                            <span className='register-login__input'>Регистрация</span>
                        </button>
                    </div>
                </Form>
            </main>
        </div>
    );
}

export default Register;
