export class MainApi {
    constructor(oprions) {
        this._url = oprions.url;
        this._header = oprions.header;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(res.status);
        }
    }

    //загрузка информации о пользователе
    getUserInfo(token) {
        return fetch(this._url + '/users/me', {
            headers: { ...this._header, authorization: `Bearer ${token}` },
        })
            .then(this._handleResponse)
    }

    //редактирование пользователя
    editUserInfo(userInfo) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: { ...this._header, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            body: JSON.stringify({
                email: userInfo.email,
                name: userInfo.name
            })
        })
            .then(this._handleResponse)
    }

    //создаёт фильм
    saveMovie(movie) {
        return fetch(this._url + '/movies', {
            method: 'POST',
            headers: { authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._header },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: 'https://api.nomoreparties.co/' + movie.image.url,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
                trailerLink: movie.trailerLink,
                movieId: movie.id,
            }
            )
        })
            .then(this._handleResponse)
    }

    //удаляет сохранённый фильм по id
    removeMovie(movieInfo) {
        return fetch(this._url + '/movies/' + movieInfo._id, {
            method: 'DELETE',
            headers: { ...this._header, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            credentials: 'include',

        })
            .then(this._handleResponse)
    }

    //возвращает все сохранённые текущим  пользователем фильмы
    getSavedMovies() {
        return fetch(this._url + '/movies', {
            headers: { ...this._header, authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((this._handleResponse))
    }
}

const mainApi = new MainApi(
    {
        url: 'https://api.domain.movies.nomoredomains.icu',
        // url: 'http://localhost:3000',

        header: {
            'Content-Type': 'application/json',
        },
    }
)

export default mainApi;
