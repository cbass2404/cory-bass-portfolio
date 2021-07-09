import { SET_USER } from '../types';

export const setUser = (userData: any) => (dispatch: any) => {
  dispatch({ type: SET_USER, payload: userData });
};
