const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/;

const messageConflict = 'Пользователь с таким email уже существует';
const messageRegister = 'При регистрации пользователя произошла ошибка';
const messageEditProfile = 'При обновлении профиля произошла ошибка';

const messageCentralized = '500 На сервере произошла ошибка';
const messageNotFound = '404 Страница по указанному маршруту не найдена';

const messageBadRequest = 'Вы ввели неправильный логин или пароль';
const messageUnauthorized = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
const messageForbidden = 'При авторизации произошла ошибка. Переданный токен некорректен.';
const nothingFound = 'Ничего не найдено';
const moviesSearchError = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';



module.exports = {
    emailRegex,
    messageConflict,
    messageRegister,
    messageCentralized,
    messageEditProfile,
    messageBadRequest,
    messageUnauthorized,
    messageNotFound,
    messageForbidden,
    nothingFound,
    moviesSearchError,
};
