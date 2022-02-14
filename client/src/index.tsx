import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app/layout/App';
import { StoreProvider } from './app/context/StoreContext';

export const customHistory = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Router history={customHistory}>
            <StoreProvider>
                <App />
            </StoreProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
