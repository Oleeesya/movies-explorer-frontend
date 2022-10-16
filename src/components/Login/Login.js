import React from 'react';
import { useState } from 'react';

import Header from '../Header/Header';
import Form from '../Form/Form';
import './Login.css';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegister = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <Header handleClickMain={props.handleClickMain}>
                <h2 className='header__title'>Рады видеть!</h2>
            </Header>
            <main className='login__content'>
                <Form buttonText='Войти' onSubmit={onRegister}>
                    <div>
                        <span className='form__placeholder'>E-mail</span>
                        <input className="form__input" required id="email" name="email" type="text" placeholder=""
                            value={email} onChange={({ target }) => setEmail(target.value)} autoComplete="off" />
                    </div>
                    <div>
                        <span className='form__placeholder'>Пароль</span>
                        <input className="form__input" required id="password" name="password" type="password" placeholder=""
                            value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off" />
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
