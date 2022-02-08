import MaterialUISwitch from '../components/MaterialUISwitch';
import {
    AppBar,
    Badge,
    Box,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

interface IHeaderProps {
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
];

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
];

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': { color: 'grey.500' },
    '&.active': {
        color: 'text.secondary',
    },
};

export default function Header({ handleThemeChange }: IHeaderProps) {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography
                        variant='h6'
                        component={NavLink}
                        exact
                        to='/'
                        sx={navStyles}
                    >
                        eCommerce
                    </Typography>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} />}
                        label='MUI switch'
                        sx={{ ml: 1 }}
                        onChange={handleThemeChange}
                    />
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
