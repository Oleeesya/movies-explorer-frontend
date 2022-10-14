import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

// createRoot(document.getElementById('root')).render(
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
