import { AnyAction } from 'redux';

interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  description: string;
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
    default:
      return state;
  }
};

export default userReducer;
