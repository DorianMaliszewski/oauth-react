import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, createStyles, Theme, CssBaseline, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import { routes } from '../routes';
import { AUTH_TOKEN } from '../constants';
import { useHistory } from 'react-router';
import Copyright from '../components/Copyright';

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

  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Mon application
          </Typography>
          <Button color='inherit' onClick={logout}>
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
