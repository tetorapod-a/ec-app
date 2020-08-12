import React, { useState, useCallback, useMemo } from 'react';
import { TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell, makeStyles, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
    padding: 0

  }
});


const SizeTable = (props) => {
  const classes = useStyles();

  const sizes = props.sizes;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map(size => (
              <TableRow key={size.size}>  
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>在庫なし</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SizeTable;