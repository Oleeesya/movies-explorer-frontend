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

const MAX_SHORT_FILM_TIME = 40;

const INIT_CARD_COUNT1 = 12;
const INIT_CARD_COUNT2 = 8;
const INIT_CARD_COUNT3 = 5;

const SCREEN_SIZE1 = 768;
const SCREEN_SIZE2 = 480;
const SCREEN_SIZE3 = 320;

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
    MAX_SHORT_FILM_TIME,
    INIT_CARD_COUNT1,
    INIT_CARD_COUNT2,
    INIT_CARD_COUNT3,
    SCREEN_SIZE1,
    SCREEN_SIZE2,
    SCREEN_SIZE3,
};
