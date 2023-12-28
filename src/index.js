import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
const GlobalStyles = createGlobalStyle`
*{
margin:0;
padding: 0;
font-family:"LeagueGothic-Regular";
box-sizing: border-box;
}
`
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore()
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyles />
      <Provider store={store}>
        <MantineProvider><App /></MantineProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
