import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, CircularProgress, Paper, makeStyles, Theme } from '@material-ui/core';
import UserInfo from '../components/Users/UserInfo';
import usePromise from '../hooks/usePromise';
import { UserApi } from '../api/UserApi';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const Profile = () => {
  const { response, error, isLoading } = usePromise(UserApi.findMyInformation);
  const [me, setMe] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (response) {
      setMe(response.data);
    }
  }, [response]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !me) {
    return <Container>Une erreur est survenue</Container>;
  }

  return (
    <Container>
      <Grid container spacing={3} direction='column'>
        <Grid item>
          <Typography variant='h4' component='h1' gutterBottom>
            Votre profil
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper} elevation={3}>
            <UserInfo user={me} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
