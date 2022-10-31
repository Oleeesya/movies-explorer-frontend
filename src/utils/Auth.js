// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.domain.movies.nomoredomains.icu';

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
    })
        .then(handleResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password, email })
    })
        .then(handleResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => data)
}
