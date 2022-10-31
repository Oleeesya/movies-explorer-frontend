import './Form.css';

function Form(props) {

    return (
        <div className={`${props.name === 'profile' ? 'form__container' : ''}`}>
            <form className={`${props.name === 'profile' ? 'form form_type_profile' : 'form'}`}
                onSubmit={props.onSubmit}>
                {props.children}
                <span className={`${props.messageerror ? 'form__error-message form__error-message_active' : 'form__error-message'}`}
                >{`${props.messageerror ? props.messageerror : ''}`}
                </span>

                <button type="submit" className={`${props.buttonText === 'Сохранить' && props.isValid ? 'form__submit_none' :
                    props.buttonText === 'Войти' && !props.isValid ? 'form__submit form_type_input form__submit_not-valid' :
                        props.buttonText === 'Войти' && props.messageerror && props.isValid ? 'form__submit form_type_input form__submit_not-valid' :
                            props.buttonText === 'Войти' && props.isValid ? 'form__submit form_type_input' :
                                props.buttonText === 'Сохранить' && !props.isValid ? 'form__submit_none form__submit_not-valid' :
                                    props.buttonText === 'Сохранить' && props.messageerror ? 'form__submit_none form__submit_not-valid' :
                                        !props.isValid ? 'form__submit form__submit_not-valid' :
                                            props.messageerror ? 'form__submit form__submit_not-valid' :
                                                'form__submit'}`}
                    disabled={`${props.isValid ? '' : 'desabled'}`}>{props.buttonText}
                </button>

            </form>
        </div>
    )
}

export default Form;
