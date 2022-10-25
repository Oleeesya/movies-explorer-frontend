import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useHistory } from 'react-router-dom'
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import NotFound from '../NotFound/NotFound';
import './App.css';
import ProtectedRoute from "../ProtectedRoute";
import { currentUserContext } from '../contexts/CurrentUserContext';
import { RegisterHandler, AuthorizeHandler, EditProfileHandler } from '../../utils/errorHandlers'

function App() {
  const history = useHistory();

  const handleClickMain = () => {
    history.push('/')
  }

  const handleClickMovies = () => {
    history.push('/movies')
  }

  const handleClickSavedMovies = () => {
    history.push('/saved-movies')
  }

  const handleClickRegister = () => {
    history.push('/signup')
  }

  const handleClickLogin = () => {
    history.push('/signin')
  }

  const handleClickProfile = () => {
    history.push('/profile')
  }

  const [data, setData] = useState([]);

  const [movies, setMovies] = useState([...JSON.parse(localStorage.getItem('mov' || 'short-mov') || '[]')]);

  const [savedMovies, setSavedMovies] = useState([...JSON.parse(localStorage.getItem('save-mov' || 'save-short-mov') || '[]')]);
  const [shortFilm, setShortFilm] = useState(false || JSON.parse(localStorage.getItem('toggle')));
  const [preloader, setPreloader] = useState(false);

  //ошибки при загрузке и поиске фильмов
  const [moviesSearchError, setMoviesSearchError] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [messageerror, setMessageError] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setloggedIn] = useState(false || JSON.parse(localStorage.getItem('userLogged')));
  const [token, setToken] = useState('');

  useEffect(() => {
    mainApi.getUserInfo(localStorage.getItem('jwt'))
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
      })
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  })

  const handleLogin = (isLogin) => {
    setloggedIn(isLogin);
  }

  const tokenCheck = () => {

    //проверка токена в LocalStorage
    if (localStorage.getItem('jwt')) {

      localStorage.setItem('userLogged', JSON.stringify(false));

      setToken(localStorage.getItem('jwt'));

      if (token) {
        localStorage.setItem('userLogged', JSON.stringify(true)) //
        auth.getContent(token)
          .then((res) => {
            if (res) {
              handleLogin(true);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        localStorage.setItem('userLogged', JSON.stringify(false));

      }
    }
  }

  useEffect(() => {
    setNothingFound();
  }, [movies.length, shortFilm])

  //переключатель тумблера короткометражек
  function handleShortFilm() {
    setShortFilm(!shortFilm);
    if (!shortFilm) {
      setMovies([...JSON.parse(localStorage.getItem('short-mov') || '[]')]);
      setSavedMovies([...JSON.parse(localStorage.getItem('save-short-mov') || '[]')]);
    }
    else {
      setMovies([...JSON.parse(localStorage.getItem('mov') || '[]')]);
      setSavedMovies([...JSON.parse(localStorage.getItem('save-mov') || '[]')]);
    }
  }

  function getAllMovies() {
    moviesApi.handleMovies()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setMoviesSearchError(true);
        console.log(err);
      })
  }

  //ищем фильмы и сохраняем в localstorage
  function handleSearchMovies(title) {
    setPreloader(true);
    getAllMovies()
    let filteredFilms = [];
    let updatedFilms = [];
    let uniq = {};
    let filterUniq = [];

    if (shortFilm) {
      filteredFilms = data.filter(item => (item.nameRU.includes(title)) && item.duration <= 40);
      localStorage.setItem('toggle', JSON.stringify(true));
      setShortFilm(JSON.parse(localStorage.getItem('toggle')));
    } else if (!shortFilm) {
      filteredFilms = data.filter(item => (item.nameRU.includes(title)) && item.duration > 40);
      localStorage.setItem('toggle', JSON.stringify(false));
      setShortFilm(JSON.parse(localStorage.getItem('toggle')));
    }

    if (filteredFilms.length > 0 && shortFilm) {
      updatedFilms = [...filteredFilms, ...JSON.parse(localStorage.getItem('short-mov')) || []];
      localStorage.setItem('short-mov', JSON.stringify(updatedFilms));
      filterUniq = [...JSON.parse(localStorage.getItem('short-mov'))].filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
      localStorage.setItem('short-mov', JSON.stringify(filterUniq));
      setMovies([...JSON.parse(localStorage.getItem('short-mov'))]);

    } else if (filteredFilms.length > 0 && !shortFilm) {
      updatedFilms = [...filteredFilms, ...JSON.parse(localStorage.getItem('mov')) || []];
      localStorage.setItem('mov', JSON.stringify(updatedFilms));
      filterUniq = [...JSON.parse(localStorage.getItem('mov'))].filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
      localStorage.setItem('mov', JSON.stringify(filterUniq))
      setMovies([...JSON.parse(localStorage.getItem('mov'))]);

    }

    if (movies.length === 0) {
      setNothingFound(true);
    }

    setPreloader(false);
  }

  //кнопка еще
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize);

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })
  // console.log(localStorage)
  // localStorage.removeItem('mov')
  // localStorage.removeItem('save-mov')
  // localStorage.removeItem('save-short-mov')
  // localStorage.removeItem('short-mov')
  // localStorage.removeItem('toggle')
  // localStorage.removeItem('title-mov')
  // localStorage.removeItem('save-title-mov')
  // localStorage.removeItem('jwt')
  // localStorage.removeItem('userLogged')

  const handleAuthorize = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        handleLogin(false);

        if (data.token) {
          handleLogin(true);

          history.push('/');
        }
      })
      .catch((err) => {
        setMessageError(AuthorizeHandler(err))
      });
  }

  const handleRegister = (name, email, password) => {
    auth.register(name, email, password)
      .then((res) => {
        handleAuthorize(email, password)
      })
      .catch((err) => {
        setMessageError(RegisterHandler(err))
      });
  }

  const handleEditUserInfo = (userInfo) => {
    mainApi.editUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        setMessageError(EditProfileHandler(err));
      })
  }

  return (
    <currentUserContext.Provider value={currentUser}>

      <div className='app'>
        <Switch>

          <Route exact path='/'>
            <Main loggedIn={loggedIn} handleClickMain={handleClickMain} handleClickRegister={handleClickRegister} handleClickLogin={handleClickLogin}
              handleClickProfile={handleClickProfile} handleClickSavedMovies={handleClickSavedMovies} handleClickMovies={handleClickMovies}></Main>
          </Route>

          <ProtectedRoute exact path="/movies" loggedIn={localStorage.getItem('userLogged')} component={Movies}
            movies={movies} handleSearchMovies={handleSearchMovies} handleClickMain={handleClickMain} handleClickProfile={handleClickProfile}
            handleClickMovies={handleClickMovies} handleClickSavedMovies={handleClickSavedMovies} preloader={preloader}
            handleShortFilm={handleShortFilm} shortFilm={shortFilm} nothingFound={nothingFound} moviesSearchError={moviesSearchError}
            dimensions={dimensions} setSavedMovies={setSavedMovies}
          />

          <ProtectedRoute exact path="/saved-movies" loggedIn={localStorage.getItem('userLogged')} component={SavedMovies}
            savedMovies={savedMovies} handleSearchMovies={handleSearchMovies} shortFilm={shortFilm}
            handleClickMain={handleClickMain} handleClickProfile={handleClickProfile} handleClickMovies={handleClickMovies}
            handleClickSavedMovies={handleClickSavedMovies} setSavedMovies={setSavedMovies} dimensions={dimensions}
            handleShortFilm={handleShortFilm}
          />

          <ProtectedRoute exact path="/profile" loggedIn={localStorage.getItem('userLogged')} component={Profile}
            handleClickMain={handleClickMain} handleClickMovies={handleClickMovies} setloggedIn={setloggedIn}
            handleClickSavedMovies={handleClickSavedMovies} handleEditUserInfo={handleEditUserInfo} setToken={setToken}
            messageerror={messageerror} setMessageError={setMessageError} />

          <Route exact path='/signin' >
            <Login loggedIn={localStorage.getItem('userLogged')} messageerror={messageerror} setMessageError={setMessageError} handleClickRegister={handleClickRegister} handleClickMain={handleClickMain} handleAuthorize={handleAuthorize}></Login>
          </Route>
          <Route exact path='/signup' >
            <Register loggedIn={localStorage.getItem('userLogged')} messageerror={messageerror} setMessageError={setMessageError} handleClickLogin={handleClickLogin} handleClickMain={handleClickMain} handleRegister={handleRegister}></Register>
          </Route>

          <Route path='*' >
            <NotFound handleClickMain={handleClickMain} />
          </Route>

          <Route exact path="/movies">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/profile">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
