import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ButtonLink = (props: any) => {
  const history = useHistory();
  return (
    <Button {...props} onClick={e => history.push(props.to)}>
      {props.children}
    </Button>
  );
};

export default ButtonLink;
