import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then(() => {
      console.log('Service worker registered!');
    })
    .catch((err) => {
      console.log(err);
    });
}
