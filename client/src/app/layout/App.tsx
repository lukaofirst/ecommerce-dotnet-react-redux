import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import {
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';

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
            <CssBaseline />
            <Header handleThemeChange={handleThemeChange} />
            <Container>
                <Catalog />
            </Container>
        </ThemeProvider>
    );
}

export default App;
