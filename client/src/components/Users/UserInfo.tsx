import React from 'react';
import useAxios from '../../hooks/useAxios';
import usePromise from '../../hooks/usePromise';
import { UserApi } from '../../api/UserApi';
import { Grid, Button } from '@material-ui/core';

interface UserInfoProps {
  user: any;
}

const UserInfo = (props: UserInfoProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        Nom d'utilisateur
      </Grid>
      <Grid item xs={12} sm={9}>
        {props.user.username}
      </Grid>
      <Grid item xs={12} sm={3}>
        Nom complet
      </Grid>
      <Grid item xs={12} sm={9}>
        {props.user.name}
      </Grid>
      <Grid item xs={12} sm={3}>
        Email
      </Grid>
      <Grid item xs={12} sm={9}>
        {props.user.email}
      </Grid>
      <Grid item xs={12} sm={3}>
        Mot de passe
      </Grid>
      <Grid item xs={12} sm={9}>
        <Button color='primary' variant='contained' onClick={e => alert('Need to develop')}>
          Changer le mot de passe
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
