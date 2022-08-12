import React from 'react'
import './index.css';
import App from "./App/App";
import {Provider} from "react-redux";
import {store} from "./App/store";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
