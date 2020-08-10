import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles, getThemeProps} from '@material-ui/styles';

const useStyles = makeStyles({
  "button": {
    backgroundColor: "#4dd0e1",
    color: "white",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256
  }
})

const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton;