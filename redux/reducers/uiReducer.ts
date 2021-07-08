import { AnyAction } from 'redux';

const initialState: { loading: boolean; errors: null | {} } = {
  loading: false,
  errors: null,
};

const uiReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default uiReducer;
