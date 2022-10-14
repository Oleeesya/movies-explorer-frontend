import './Form.css';

function Form(props) {

    return (
        <div className={`${props.name === 'profile' ? 'form__container' : ''}`}>
            <form className={`${props.name === 'profile' ? 'form form_type_profile' : 'form'}`}
                onSubmit={props.onSubmit}>
                {props.children}
                <span className='form__error-message'>{props.error}</span>
                <button type="submit" className={`${props.buttonText === 'Войти' ? 'form__submit form_type_input' :
                    props.buttonText === 'Сохранить' && props.profile ? 'form__submit form__submit_type_profile' :
                        props.buttonText === 'Сохранить' ? 'form__submit_none' : 'form__submit'}`}>{props.buttonText}
                </button>
            </form>
        </div>
    )
}

export default Form;
