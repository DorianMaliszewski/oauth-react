import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, createStyles, Theme, CssBaseline, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/styles';
import { routes } from '../routes';
import { AUTH_TOKEN } from '../constants';
import { useHistory } from 'react-router';
import Copyright from '../components/Copyright';
import { Link } from 'react-router-dom';
import ButtonLink from '../components/Buttons/ButtonLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    content: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(5, 2, 5)
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6)
    }
  })
);

const MainLayout = (props: any) => {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    history.push(routes.LOGIN.path);
  };

  const currentRoute = Object.values(routes).find((route: any) => route.path === history.location.pathname);

  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {currentRoute ? currentRoute.title : 'Mon application'}
          </Typography>
          <ButtonLink color='inherit' startIcon={<PersonIcon />} to={routes.PROFILE.path}>
            Mon Compte
          </ButtonLink>
          <Divider orientation='vertical' variant='middle' />
          <Button color='secondary' onClick={logout} variant='contained'>
            Se déconnecter
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{props.children}</main>
      <footer className={classes.footer}>
        <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
          Made with lot of love
        </Typography>
        <Copyright />
      </footer>
    </>
  );
};

export default MainLayout;
