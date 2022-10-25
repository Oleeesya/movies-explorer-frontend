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
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    //редактирование пользователя
    editUserInfo(userInfo) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: { ...this._header, authorization: `Bearer ${localStorage.getItem('jwt')}` },
            credentials: 'include',
            body: JSON.stringify({
                email: userInfo.email,
                name: userInfo.name
            })
        })
            .then(this._handleResponse)
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
