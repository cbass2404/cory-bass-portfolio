import { AnyAction } from 'redux';

interface Project {
  _id: string;
  title: string;
  image: string;
  thumbnail: string;
  url: string;
  githubUrl: string;
  description: string;
  tags: [string];
}

const initialState: {
  loading: boolean;
  projects: null | [Project];
  project: null | Project;
} = {
  loading: false,
  projects: null,
  project: null,
};

const projectReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default projectReducer;
