import { AnyAction } from 'redux';

import { SET_USER } from '../types';

interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
}

const initialState: {
  authenticated: boolean;
  loading: boolean;
  user: null | User;
} = {
  authenticated: false,
  loading: false,
  user: null,
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
