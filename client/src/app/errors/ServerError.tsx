import { Fragment } from 'react';
import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

interface IState {
    error: { title: string; status: number; detail: string };
}

export default function ServerError() {
    const history = useHistory();
    const { state } = useLocation<IState>();

    return (
        <Container component={Paper}>
            {state.error ? (
                <Fragment>
                    <Typography variant='h3' color='error' gutterBottom>
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography>
                        {state.error.detail || 'Internal server error'}
                    </Typography>
                </Fragment>
            ) : (
                <Typography variant='h5' gutterBottom>
                    Server error
                </Typography>
            )}
            <Button onClick={() => history.push('/catalog')}>
                Go back to the store
            </Button>
        </Container>
    );
}
