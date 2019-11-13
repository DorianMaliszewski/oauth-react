import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { UserApiConfig } from '../../api/UserApi';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { AUTH_TOKEN } from '../../constants';

const UsersList = (props: any) => {
  const { response, isLoading, error } = useAxios(UserApiConfig.findAllConfig, true, localStorage.getItem(AUTH_TOKEN));

  if (isLoading) return <div>Chargement en cours...</div>;

  if (error) return <div>{error}</div>;

  return (
    <List>
      {response &&
        response.map((user: any) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} secondary={user.name} />
          </ListItem>
        ))}
    </List>
  );
};

export default UsersList;
