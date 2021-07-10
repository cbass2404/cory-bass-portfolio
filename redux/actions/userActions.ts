import { SET_USER } from '../types';

interface UserData {
  _id: string;
  username: string;
  email: string;
  image: string;
  admin: boolean;
}

export const setUser = (userData: UserData) => (dispatch: any) => {
  dispatch({ type: SET_USER, payload: userData });
};
