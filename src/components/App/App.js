import React from 'react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { initialMovies } from '../../utils/initial';
import { useHistory } from 'react-router-dom';

import NotFound from '../NotFound/NotFound';

import './App.css';

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

  const [movies, setMovies] = useState(initialMovies);
  const [savedMovies, setSavedMovies] = useState(initialMovies);

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Main handleClickMain={handleClickMain} handleClickRegister={handleClickRegister} handleClickLogin={handleClickLogin}></Main>
        </Route>
        <Route path='/movies'>
          <Movies movies={movies} handleClickMain={handleClickMain} handleClickProfile={handleClickProfile} handleClickMovies={handleClickMovies} handleClickSavedMovies={handleClickSavedMovies}></Movies>
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies movies={savedMovies} handleClickMain={handleClickMain} handleClickProfile={handleClickProfile} handleClickMovies={handleClickMovies} handleClickSavedMovies={handleClickSavedMovies}></SavedMovies>
        </Route>
        <Route path='/profile'>
          <Profile handleClickMain={handleClickMain} handleClickMovies={handleClickMovies} handleClickSavedMovies={handleClickSavedMovies}></Profile>
        </Route>
        <Route path='/signin' >
          <Login handleClickRegister={handleClickRegister} handleClickMain={handleClickMain}></Login>
        </Route>
        <Route path='/signup' >
          <Register handleClickLogin={handleClickLogin} handleClickMain={handleClickMain}></Register>
          {/* <Error handleClickMain={handleClickMain}/> */}
        </Route>
        <Route path='*' >
          <NotFound handleClickMain={handleClickMain} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
