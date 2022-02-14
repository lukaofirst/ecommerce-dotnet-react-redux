import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import {
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const paletteType = darkMode ? 'dark' : 'light';

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212',
            },
        },
    });

    const handleThemeChange = () => {
        setDarkMode((prevState) => !prevState);
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                position='bottom-right'
                hideProgressBar
                theme='colored'
            />
            <CssBaseline />
            <Header handleThemeChange={handleThemeChange} />
            <Container>
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/catalog' exact component={Catalog} />
                    <Route path='/catalog/:id' component={ProductDetails} />
                    <Route path='/about' component={AboutPage} />
                    <Route path='/contact' component={ContactPage} />
                    <Route path='/server-error' component={ServerError} />
                    <Route path='/basket' component={BasketPage} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </Container>
        </ThemeProvider>
    );
}

export default App;
