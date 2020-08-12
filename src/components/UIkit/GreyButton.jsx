import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles, getThemeProps} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  "button": {
    backgroundColor: theme.palette.grey["300"],
    color: "white",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256
  }
}))

const GreyButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default GreyButton;