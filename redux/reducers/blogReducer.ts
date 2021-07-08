import { AnyAction } from 'redux';

interface Comment {
  _id: string;
  user: string;
  body: string;
  createdAt: Date;
}

interface Blog {
  _id: string;
  title: string;
  image: string;
  date: string;
  content: string;
  tags: [string];
  comments: [Comment];
}

const initialState: {
  loading: boolean;
  blogs: null | [Blog];
  blog: null | Blog;
} = {
  loading: false,
  blogs: null,
  blog: null,
};

const blogReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default blogReducer;
