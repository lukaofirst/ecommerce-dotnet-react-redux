import MaterialUISwitch from '../components/MaterialUISwitch';
import { AppBar, FormControlLabel, Toolbar, Typography } from '@mui/material';

interface IHeaderProps {
    handleThemeChange: () => void;
}

export default function Header({ handleThemeChange }: IHeaderProps) {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant='h6'>eCommerce</Typography>
                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} />}
                    label='MUI switch'
                    sx={{ ml: 1 }}
                    onChange={handleThemeChange}
                />
            </Toolbar>
        </AppBar>
    );
}
