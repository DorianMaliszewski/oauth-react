import React, { useState, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import { AUTH_TOKEN } from '../constants';
import { useHistory } from 'react-router';
import { routes } from '../routes';
import OAuthApi from '../api/OAuthApi';
import usePromise from '../hooks/usePromise';
import { isConnected } from '../utils/auth';
import Copyright from '../components/Copyright';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorText: {
    backgroundColor: red[400],
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 30
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props: any) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, race, error } = usePromise();
  const history = useHistory();

  if (isConnected()) {
    history.push(routes.HOME.path);
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    race(OAuthApi.loginAction(email, password), (res: any) => {
      if (res.data && res.data.access_token) {
        localStorage.setItem(AUTH_TOKEN, res.data.access_token);
        sessionStorage.setItem('CURRENT_USER', res.data.user.name);
        if (history.location.state && history.location.state.from) {
          history.push(history.location.state.from);
        } else {
          history.push(routes.HOME.path);
        }
      }
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Se connecter
        </Typography>
        {error && (
          <Typography className={classes.errorText} component='p' variant='body1'>
            {error}
          </Typography>
        )}
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Adresse email'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Mot de passe'
            type='password'
            id='password'
            autoComplete='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Se souvenir de moi' /> */}
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} disabled={isLoading}>
            Se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link href={routes.SIGNUP.path} variant='body2'>
                {"Pas de compte ? S'enregistrer"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
