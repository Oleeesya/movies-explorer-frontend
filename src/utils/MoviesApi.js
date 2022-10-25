export class MoviesApi {
    constructor(oprions) {
        this._url = oprions.url;
        this._header = oprions.header;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка, ${res.status}`);
        }
    }
    //возвращает все фильмы 
    handleMovies() {
        return fetch(
            this._url,
            { header: { ...this._header } }
        )
            .then(this._handleResponse)
    }
}

const moviesApi = new MoviesApi(
    {
        url: 'https://api.nomoreparties.co/beatfilm-movies',
        header: {
            'Content-Type': 'application/json',
        },
    }
)

export default moviesApi;
