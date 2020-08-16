// storeで管理しているstateを参照する関数を記述

import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], state => state.uid);

export const getUserName = createSelector([usersSelector], state => state.username);

export const getIsSignedIn = createSelector([usersSelector], state => state.isSignedIn);

export const getProductsInCart = createSelector([usersSelector], state => state.cart);

export const getOrderHistory = createSelector([usersSelector], state => state.orders);