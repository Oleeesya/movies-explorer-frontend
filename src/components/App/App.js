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
import { RegisterHandler, AuthorizeHandler, EditProfileHandler } from '../../utils/errorHandlers';
const { MAX_SHORT_FILM_TIME } = require('../../utils/const')

function App() {
  const history = useHistory();

  const handleClickMain = () => {
    history.push('/')
  }

  const handleClickMovies = () => {
    history.push('/movies')
    setSaved(!saved)
    setNothingFound(false)
    setShortFilm((JSON.parse(localStorage.getItem('toggle')) || false));
  }

  const handleClickSavedMovies = () => {
    history.push('/saved-movies');
    setSaved(!saved);
    setNothingFound(false);
    setShortFilm(false);
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

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);

  const [saved, setSaved] = useState(false);

  const [shortFilm, setShortFilm] = useState(
    history.location.pathname === '/movies' ? (JSON.parse(localStorage.getItem('toggle')) || false) : false);

  const [preloader, setPreloader] = useState(false);

  //ошибки при загрузке и поиске фильмов
  const [moviesSearchError, setMoviesSearchError] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [messageerror, setMessageError] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setloggedIn] = useState(JSON.parse(localStorage.getItem('userLogged')) || false);
  const [token, setToken] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo(localStorage.getItem('jwt'))
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
        })

      moviesApi.handleMovies()
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          setMoviesSearchError(true);
          console.log(err);
        })
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      //возвращает все сохранённые фильмы
      mainApi.getSavedMovies()
        .then((res) => {
          setMyMovies(res || []);
          setSavedMovies(res.filter(sortShortFilm));

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  const handleLogin = (isLogin) => {
    setloggedIn(isLogin);
  }

  useEffect(() => {
    if (token) {
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
  }, [token])

  const tokenCheck = () => {

    //проверка токена в LocalStorage
    if (localStorage.getItem('jwt')) {

      localStorage.setItem('userLogged', JSON.stringify(false));

      setToken(localStorage.getItem('jwt'));

      if (token) {
        localStorage.setItem('userLogged', JSON.stringify(true));
      }
      else {
        localStorage.setItem('userLogged', JSON.stringify(false));
      }
    }
  }

  //переключатель тумблера короткометражек
  function handleShortFilm() {
    let newStatus = !shortFilm;
    setShortFilm(newStatus);
    if (history.location.pathname === '/movies') {
      localStorage.setItem('toggle', JSON.stringify(newStatus));
    }
  }

  const sortShortFilm = (item) => {
    if (shortFilm) {
      return item.duration <= MAX_SHORT_FILM_TIME
    } else {
      return item.duration > MAX_SHORT_FILM_TIME
    }
  }

  //ищем фильмы и сохраняем в localstorage
  const handleSearchMovies = (title) => {
    setPreloader(true);
    setNothingFound(false);
    setFormDisabled(true);

    let filteredFilms = [];
    let updatedFilms = [];
    let uniq = {};
    let filterUniq = [];

    if (history.location.pathname === '/movies') {
      filteredFilms = data.filter(item => (item.nameRU.toLowerCase().includes(title.toLowerCase())));
      if (filteredFilms.length > 0) {
        updatedFilms = [...filteredFilms, ...JSON.parse(localStorage.getItem('mov')) || []];
        updatedFilms = updatedFilms.filter(sortShortFilm);
        filterUniq = updatedFilms.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
        localStorage.setItem('mov', JSON.stringify(filterUniq));
        setMovies(filterUniq);
      }
      if (filterUniq.length === 0) {
        setNothingFound(true);
      }
    }

    if (history.location.pathname === '/saved-movies') {
      filteredFilms = myMovies.filter(item => (item.nameRU.toLowerCase().includes(title.toLowerCase())));
      filteredFilms = filteredFilms.filter(sortShortFilm);
      filterUniq = filteredFilms.filter(obj => !uniq[obj._id] && (uniq[obj._id] = true));
      setSavedMovies(filterUniq);
      if (filterUniq.length === 0) {
        setNothingFound(true);
      }
    }
    setPreloader(false);
    setFormDisabled(false);

  }

  useEffect(() => {
    if (history.location.pathname === '/movies' && shortFilm) {
      let Films = [...JSON.parse(localStorage.getItem('mov')) || []].filter((item) => {
        return item.duration <= MAX_SHORT_FILM_TIME
      })
      setMovies(Films)
    }
    else if (history.location.pathname === '/movies' && !shortFilm) {
      let ShortFilms = [...JSON.parse(localStorage.getItem('mov')) || []].filter((item) => {
        return item.duration > MAX_SHORT_FILM_TIME
      })
      setMovies(ShortFilms)
    }
    else if (history.location.pathname === '/saved-movies' && shortFilm) {
      let Films = myMovies.filter((item) => {
        return item.duration <= MAX_SHORT_FILM_TIME
      })
      setSavedMovies(Films)
    }
    else if (history.location.pathname === '/saved-movies' && !shortFilm) {
      let ShortFilms = myMovies.filter((item) => {
        return item.duration > MAX_SHORT_FILM_TIME
      })
      setSavedMovies(ShortFilms)
    }
  }, [shortFilm, saved])

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

  //сохранение фильма
  const handleSaveClick = (movie) => {
    let uniq = {};
    let filterUniq = [];
    mainApi.saveMovie(movie)
      .then((res) => {
        filterUniq = [res.data, ...savedMovies]
        filterUniq = filterUniq.filter(obj => !uniq[obj._id] && (uniq[obj._id] = true));
        setMyMovies([res.data, ...myMovies])
        setSavedMovies(filterUniq);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //удаление фильма из сохраненных 
  const handleDeleteMovie = (movie) => {
    myMovies.forEach((item) => {
      if (item.nameRU === movie.nameRU) {
        movie._id = item._id
      }
    })

    mainApi.removeMovie(movie)
      .then((res) => {
        setMyMovies(myMovies.filter((film) => film._id !== res.data._id));
        setSavedMovies(savedMovies.filter((film) => film._id !== res.data._id));
      })
      .catch((err) => {
        console.log(err);
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
            dimensions={dimensions} setSavedMovies={setSavedMovies} data={data} handleSaveClick={handleSaveClick}
            saved={saved} setSaved={setSaved} myMovies={myMovies} handleDeleteMovie={handleDeleteMovie} savedMovies={savedMovies}
            formDisabled={formDisabled}
          />

          <ProtectedRoute exact path="/saved-movies" loggedIn={localStorage.getItem('userLogged')} component={SavedMovies}
            savedMovies={savedMovies} handleSearchMovies={handleSearchMovies} shortFilm={shortFilm} nothingFound={nothingFound}
            handleClickMain={handleClickMain} handleClickProfile={handleClickProfile} handleClickMovies={handleClickMovies}
            handleClickSavedMovies={handleClickSavedMovies} preloader={preloader} setSavedMovies={setSavedMovies} dimensions={dimensions}
            handleShortFilm={handleShortFilm} handleSaveClick={handleSaveClick} handleDeleteMovie={handleDeleteMovie} data={data}
            saved={saved} setSaved={setSaved} myMovies={myMovies} formDisabled={formDisabled}
          />

          <ProtectedRoute exact path="/profile" loggedIn={localStorage.getItem('userLogged')} component={Profile}
            handleClickMain={handleClickMain} handleClickMovies={handleClickMovies} setloggedIn={setloggedIn}
            handleClickSavedMovies={handleClickSavedMovies} handleEditUserInfo={handleEditUserInfo} setToken={setToken}
            messageerror={messageerror} setMessageError={setMessageError} setSavedMovies={setSavedMovies} setMovies={setMovies} setShortFilm={setShortFilm} />

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
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/saved-movies">
            {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          </Route>

        </Switch>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
