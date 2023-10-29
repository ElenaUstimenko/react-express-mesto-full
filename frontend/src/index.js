import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from '../src/components/App';
import reportWebVitals from './reportWebVitals';
// импортируем BrowserRouter, чтобы пользоваться Routes
import { BrowserRouter } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <App />
    </BrowserRouter> 
  </React.StrictMode>
);

reportWebVitals();
