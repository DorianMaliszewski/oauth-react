import React from 'react';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import { routes } from '../routes';
import { Typography, Grid, Paper, makeStyles, Theme } from '@material-ui/core';
import UsersList from '../components/UsersList';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

function Home() {
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem('CURRENT_USER');
    history.push(routes.LOGIN.path);
  };

  const user = sessionStorage.getItem('CURRENT_USER');

  return (
    <>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        Bienvenue {user}
      </Typography>
      <div className={classes.grid}>
        <Grid container spacing={5} direction='row' justify='center' alignItems='center'>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} elevation={5}>
              <Typography variant='h5' component='h3'>
                Liste des utilisateurs
              </Typography>
              <UsersList />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
